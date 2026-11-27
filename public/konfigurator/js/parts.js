// Общи части за мебелите извън кухнята: корпуси, вътрешност, дрехи, обувки, книги, лампи, столове.
// Координатите са като при кухнята: x по задната стена, z от стената към стаята, y нагоре (метри).
import * as THREE from "three";
import {RoundedBoxGeometry} from "three/addons/geometries/RoundedBoxGeometry.js";
import {frontMaterial, carcassMaterial, metalMaterial, topMaterial, shared, quality} from "./materials.js";
import {softShadow, mesh, box, cylinder, front, glow, props, plinth, crown, CROWN_H} from "./kitchen.js";

export function reseed(n = 7) { seed = n; }
export const T = .019;

export const CLOTHES = ["#ebe6dc", "#cbbfad", "#8e857a", "#3e4347", "#aab5c0", "#d9c4a6", "#6e5b4b", "#f3f0e9", "#9aa48f"];

export const BOOKS = ["#ddd3c4", "#9aa293", "#c4a47e", "#4b4f54", "#ebe5d9", "#7e6b59", "#b8a48c"];


export let seed = 7;

export const rnd = () => (seed = (seed*9301 + 49297) % 233280)/233280;

export const pick = list => list[Math.floor(rnd()*list.length)];

export const metres = (cm, min, max) => Math.min(max, Math.max(min, (Number(cm) || 0)/100));


// Помощни части.
export function group(k, x = 0, z = 0, rotY = 0) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  k.root.add(g);
  return g;
}

export function rbox(parent, cx, cy, cz, w, h, d, r, material) {
  const radius = Math.min(r, w/2 - 1e-3, h/2 - 1e-3, d/2 - 1e-3);
  return mesh(parent, new RoundedBoxGeometry(w, h, d, 3, Math.max(.001, radius)), material, cx, cy, cz);
}

export function ledStrip(k, g, x, y, z, w) {
  k.leds.push(box(g, x, y, z, w, .006, .012, shared.led(), {uv:false}));
}

export function lamp(k, g, x, y, z, night = 2.2) {
  if (quality.lite) return;
  const light = new THREE.PointLight("#ffd29a", 0, 3, 2);
  light.position.set(x, y, z);
  g.add(light);
  k.lights.push({light, day:0, night});
}

// Корпус на висок шкаф: гръб, страни, таван, дъно и цокъл.
export function shell(k, g, W, h, D, base = .08) {
  const d = D - T - .002, y0 = k.legs ? base : 0;
  box(g, 0, y0, 0, W, h - y0, .012, k.mats.carcass, {uv:false});
  box(g, 0, y0, 0, T, h - y0, d, k.mats.mainFlat);
  box(g, W - T, y0, 0, T, h - y0, d, k.mats.mainFlat);
  box(g, T, h - T, 0, W - 2*T, T, d, k.mats.carcass, {uv:false});
  box(g, T, base, 0, W - 2*T, T, d, k.mats.carcass, {uv:false});
  if (k.legs) legs(k, g, W, D, base);
  else box(g, T, 0, D - .09, W - 2*T, base - .002, .018, shared.shadowGap(), {uv:false});
}

export function legs(k, g, W, D, h) {
  const xs = W > 1.2 ? Array.from({length:Math.round(W/.9) + 1}, (_, i, a) => .05 + i*(W - .1)/(a.length - 1)) : [.05, W - .05];
  for (const x of xs) cylinder(g, .014, h, k.mats.metal, x, h/2, D - .08, "y", 12);
}

// Корниз на висок шкаф (класически стил): ако шкафът е до тавана, корпусът се скъсява под корниза.
export const tallTop = (k, H, wanted) => k.s.crown ? Math.min(wanted, H - CROWN_H - .012) : wanted;

// Вътрешност на секция: закачалка, рафтове, чекмеджета, обувки, кутии горе.
export function interior(k, g, x, w, h, d, kind, led) {
  const top = h - T;
  const shelf = y => box(g, x + .003, y, .015, w - .006, .018, d - .02, k.mats.carcass, {uv:false});
  const hat = Math.min(top - .38, 2.02);
  if (top - hat > .2) { shelf(hat); boxes(g, x, w, hat + .018, Math.min(.3, top - hat - .06), d); }
  if (kind === "long") {
    rail(k, g, x, w, hat - .07, d);
    clothes(g, x, w, hat - .1, Math.min(1.25, hat - .45), d);
  } else if (kind === "double") {
    const mid = Math.max(.95, hat/2 + .05);
    rail(k, g, x, w, hat - .07, d);
    clothes(g, x, w, hat - .1, Math.min(.85, hat - mid - .2), d);
    shelf(mid);
    rail(k, g, x, w, mid - .07, d);
    clothes(g, x, w, mid - .1, Math.min(.8, mid - .25), d);
  } else if (kind === "shoes") {
    for (let y = .2, i = 0; y < hat - .2 && i < 6; y += .27, i++) { shelf(y); shoes(g, x, w, y + .018, d); }
  } else {
    let start = .45;
    if (kind === "drawers") {
      for (let i = 0; i < 3; i++) rbox(g, x + w/2, .2 + i*.19, d - .07, w - .05, .17, .05, .004, k.mats.main);
      start = .72;
    }
    for (let y = start; y < hat - .22; y += .36) { shelf(y); folded(g, x, w, y + .018, d); }
  }
  if (led) ledStrip(k, g, x + .03, hat - .01, d - .06, w - .06);
}

export function rail(k, g, x, w, y, d) {
  cylinder(g, .011, w - .012, k.mats.metal, x + w/2, y, d/2 + .02, "x", 12);
}

// Дрехи, обувки и кутии: меки силуети вместо правоъгълни блокчета.
// Основните форми се правят веднъж и се преизползват (размерът идва от мащаба на обекта).
export const geoCache = new Map();

export const cachedGeo = (key, make) => { if (!geoCache.has(key)) geoCache.set(key, make()); return geoCache.get(key); };

export function silhouette(points, depth, bevel) {
  const shape = new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)));
  const geo = new THREE.ExtrudeGeometry(shape, {depth, bevelEnabled:true, bevelThickness:bevel, bevelSize:bevel*.8, bevelSegments:2, curveSegments:1});
  geo.translate(0, 0, -depth/2);
  return geo;
}

// Силуети отстрани (ширина по z, височина 1 = дължината на дрехата).
export const GARMENTS = {
  shirt:{len:[.7, .85], depth:.018, pts:[[-.03, 0], [-.16, -.035], [-.2, -.09], [-.19, -1], [.19, -1], [.2, -.09], [.16, -.035], [.03, 0]]},
  jacket:{len:[.72, .82], depth:.04, pts:[[-.04, 0], [-.19, -.04], [-.225, -.1], [-.215, -1], [.215, -1], [.225, -.1], [.19, -.04], [.04, 0]]},
  dress:{len:[1, 1.2], depth:.02, pts:[[-.03, 0], [-.15, -.03], [-.17, -.08], [-.15, -.32], [-.25, -1], [.25, -1], [.15, -.32], [.17, -.08], [.15, -.03], [.03, 0]]},
  coat:{len:[1, 1.15], depth:.05, pts:[[-.045, 0], [-.2, -.035], [-.235, -.08], [-.235, -1], [.235, -1], [.235, -.08], [.2, -.035], [.045, 0]]},
  trousers:{len:[.5, .6], depth:.022, pts:[[-.17, 0], [-.17, -1], [.17, -1], [.17, 0]]},
};

export function garment(g, type, cx, top, z, len, color) {
  const t = GARMENTS[type];
  const geo = cachedGeo(`garment|${type}`, () => silhouette(t.pts, t.depth, .012));
  const m = mesh(g, geo, shared.linen(color), cx, top, z);
  m.rotation.y = Math.PI/2 + (rnd() - .5)*.14;
  m.scale.set(1, len, 1);
  return t.depth + .024;
}

export function hanger(g, cx, top, railY, z) {
  const hook = mesh(g, cachedGeo("hook", () => new THREE.TorusGeometry(.016, .0022, 4, 8, Math.PI)), shared.darkMetal(), cx, railY, z);
  hook.rotation.y = Math.PI/2;
  mesh(g, cachedGeo("hangerBar", () => new THREE.BoxGeometry(.006, .012, .4)), shared.wood(), cx, top + .004, z);
  cylinder(g, .0018, railY - top, shared.darkMetal(), cx, (railY + top)/2, z, "y", 4);
}

export function clothes(g, x, w, top, len, d) {
  const railY = top + .03, z = d/2 + .02;
  const mix = len > .95 ? ["coat", "dress", "shirt", "jacket", "dress", "shirt"] : ["shirt", "jacket", "shirt", "trousers", "shirt", "jacket"];
  let at = x + .04;
  while (at < x + w - .05) {
    const type = pick(mix), t = GARMENTS[type];
    const gl = Math.min(len, t.len[0] + rnd()*(t.len[1] - t.len[0]));
    const half = (t.depth + .024)/2;
    if (at + 2*half > x + w - .03) break;
    hanger(g, at + half, top, railY, z);
    garment(g, type, at + half, top, z, gl, pick(CLOTHES));
    at += 2*half + .012 + rnd()*.02;
  }
}

// Сгънати пуловери и хавлии: меки, леко разместени купчини.
export function folded(g, x, w, y, d) {
  const stacks = Math.max(1, Math.floor((w - .04)/.33));
  for (let i = 0; i < stacks; i++) {
    let h = y;
    const layers = 2 + Math.floor(rnd()*3), color = pick(CLOTHES);
    for (let j = 0; j < layers; j++) {
      const t = .035 + rnd()*.02, fw = .27 + rnd()*.05, fd = .24 + rnd()*.04;
      const item = rbox(g, x + .02 + (i + .5)*(w - .04)/stacks + (rnd() - .5)*.02, h + t/2, d - .2 + (rnd() - .5)*.02, fw, t, fd, t*.45, shared.linen(j && rnd() < .6 ? color : pick(CLOTHES)));
      item.rotation.y = (rnd() - .5)*.08;
      h += t - .002;
    }
  }
}

// Горният рафт: чанта, сгънати одеяла и навити хавлии (без кашони и кутии).
export function boxes(g, x, w, y, h, d) {
  const n = Math.max(1, Math.floor(w/.36));
  for (let i = 0; i < n; i++) {
    const cx = x + (i + .5)*w/n, sw = Math.min(.34, w/n - .05), kind = i % 3;
    if (kind === 0 && h > .2) {
      const bh = Math.min(h - .06, .2), bw = Math.min(sw, .3);
      rbox(g, cx, y + bh/2, d/2, bw, bh, .12, .03, shared.fabric(pick(["#8a6a4e", "#c9b79c", "#3a3532"])));
      const handle = mesh(g, cachedGeo("bagHandle", () => new THREE.TorusGeometry(.09, .007, 8, 20, Math.PI)), shared.fabric("#5a3d2b"), cx, y + bh - .01, d/2);
      handle.scale.set(Math.min(1, bw/.24), .7, 1);
    } else if (kind === 1 || kind === 0) {
      let yy = y;
      for (const c of [pick(CLOTHES), "#e7e0d4", pick(CLOTHES)]) { const t = .05; rbox(g, cx, yy + t/2, d/2, sw, t, d - .18, t*.45, shared.linen(c)); yy += t - .004; }
    } else {
      const r = Math.min(.05, h/4), color = pick(["#e7e0d4", "#cbbfad", "#9aa48f", "#aab5c0"]);
      for (const [dx, dy] of [[-r*1.02, r], [r*1.02, r], [0, r*2.7]]) cylinder(g, r, Math.min(d - .14, .3), shared.linen(color), cx + dx, y + dy, d/2, "z", 20);
    }
  }
}

// Обувки: странично очертание (маратонка, боти, мокасина) с подметка.
export const SHOES = {
  sneaker:[[0, .012], [0, .075], [.04, .086], [.09, .075], [.16, .062], [.22, .046], [.26, .026], [.255, .004], [.01, .004]],
  boot:[[0, .012], [0, .17], [.075, .17], [.088, .09], [.16, .064], [.22, .05], [.26, .028], [.255, .004], [.01, .004]],
  loafer:[[0, .012], [0, .052], [.05, .054], [.11, .05], [.17, .046], [.23, .036], [.26, .02], [.255, .004], [.01, .004]],
};

export function shoe(g, cx, y, z, kind, color, angle) {
  const s = new THREE.Group();
  s.position.set(cx, y, z);
  s.rotation.y = angle;
  g.add(s);
  const upper = mesh(s, cachedGeo(`shoe|${kind}`, () => silhouette(SHOES[kind], .058, .011)), shared.fabric(color), 0, 0, 0);
  upper.rotation.y = -Math.PI/2;
  upper.position.z = -.13;
  box(s, -.04, 0, -.135, .08, .012, .272, shared.fabric(kind === "sneaker" ? "#f1ede6" : "#2a2522"), {uv:false});
}

export function shoes(g, x, w, y, d) {
  const pairs = Math.max(1, Math.floor((w - .04)/.2));
  for (let i = 0; i < pairs; i++) {
    const kind = pick(["sneaker", "sneaker", "boot", "loafer"]);
    const color = kind === "sneaker" ? pick(["#ece8e1", "#2f2c2a", "#c9b79c", "#4b4f54"]) : pick(["#2f2c2a", "#6e4a33", "#8a6a4e", "#3a3532"]);
    const cx = x + .02 + (i + .5)*(w - .04)/pairs, cz = d - .19;
    shoe(g, cx - .048, y, cz, kind, color, (rnd() - .5)*.12);
    shoe(g, cx + .048, y, cz + (rnd() - .5)*.03, kind, color, (rnd() - .5)*.12);
  }
}

// Закачалка в антрето: палто, шал и чанта – погледнати отпред.
export const COAT_FRONT = [[-.045, 0], [-.1, -.03], [-.2, -.075], [-.23, -.15], [-.22, -1], [.22, -1], [.23, -.15], [.2, -.075], [.1, -.03], [.045, 0]];

export function hangingItem(k, g, kind, hx, hookY, color) {
  if (kind === "coat" || kind === "longcoat") {
    const len = kind === "coat" ? .82 : 1.05, top = hookY - .015, z = .1;
    const body = mesh(g, cachedGeo("coatFront", () => silhouette(COAT_FRONT, .05, .02)), shared.linen(color), hx, top, z);
    body.scale.set(1, len, 1);
    for (const side of [-1, 1]) {
      const sleeve = rbox(g, hx + side*.2, top - .08 - len*.3, z + .03, .075, len*.58, .06, .03, shared.linen(color));
      sleeve.rotation.z = side*.05;
    }
    box(g, hx - .006, top - len + .02, z + .042, .012, len - .1, .006, shared.linen(color === "#3e4347" ? "#2f3336" : "#5d5148"), {uv:false});
    for (let b = 0; b < 3; b++) cylinder(g, .009, .006, shared.darkMetal(), hx + .02, top - .22 - b*.16, z + .048, "z", 10);
    rbox(g, hx, top - .05, z + .035, .16, .09, .03, .02, shared.linen(color));
  } else if (kind === "bag") {
    const handle = mesh(g, cachedGeo("bagHandle", () => new THREE.TorusGeometry(.09, .007, 8, 20, Math.PI)), shared.fabric("#5a3d2b"), hx, hookY - .1, .08);
    handle.rotation.z = Math.PI;
    handle.position.y = hookY - .005;
    rbox(g, hx, hookY - .27, .08, .34, .3, .1, .025, shared.fabric(color));
  } else if (kind === "scarf") {
    for (const [dx, len, dz] of [[-.035, .62, .085], [.04, .52, .1]]) {
      const strip = rbox(g, hx + dx, hookY - .02 - len/2, dz, .12, len, .016, .007, shared.linen(color));
      strip.rotation.z = dx > 0 ? -.04 : .05;
    }
  }
}

export function books(g, x, y, z, w) {
  let at = x;
  while (at < x + w - .03) {
    const bw = .018 + rnd()*.025, bh = .17 + rnd()*.09;
    box(g, at, y, z, bw, bh, .15 + rnd()*.05, shared.paper(pick(BOOKS)), {uv:false});
    at += bw + .002;
  }
}

// Стенен панел с вертикални ламели.
export function slats(k, g, x, w, y, h, z = 0) {
  box(g, x, y, z, w, h, .012, shared.shadowGap(), {uv:false});
  const n = Math.floor(w/.056);
  const step = w/n;
  for (let i = 0; i < n; i++) box(g, x + i*step + .007, y, z + .012, step - .014, h, .022, k.mats.accentFlat);
}

// Поднос с парфюми и бижута върху ниските чекмеджета.
export function vanityTray(k, x, y, z) {
  rbox(k.root, x, y + .008, z, .26, .016, .36, .006, shared.wood());
  mesh(k.root, new THREE.CylinderGeometry(.03, .03, .1, 20), shared.glass(), x - .04, y + .066, z - .08).castShadow = false;
  mesh(k.root, new THREE.CylinderGeometry(.012, .016, .03, 14), shared.darkMetal(), x - .04, y + .13, z - .08);
  rbox(k.root, x + .05, y + .06, z - .02, .055, .09, .04, .008, shared.glass()).castShadow = false;
  mesh(k.root, new THREE.CylinderGeometry(.016, .016, .02, 14), shared.wood(), x + .05, y + .115, z - .02);
  mesh(k.root, new THREE.TorusGeometry(.03, .004, 8, 24), shared.darkMetal(), x - .02, y + .02, z + .1).rotation.x = Math.PI/2;
}

// Декорация около мебелта: не влиза в рамката на камерата.
export function decor(k) {
  const d = group(k);
  d.userData.decor = true;
  return d;
}

export function slidingDoors(k, g, W, h, D, mirror) {
  const m = W > 3.2 ? 3 : 2, pw = W/m + .015;
  box(g, 0, h - .045, D, W, .045, .07, k.mats.metal, {uv:false});
  box(g, 0, .06, D, W, .02, .07, k.mats.metal, {uv:false});
  for (let i = 0; i < m; i++) {
    const x = Math.min(W - pw, i*W/m), z = i % 2 ? D + .002 : D + .036;
    const panel = new THREE.Group();
    panel.position.x = x;
    g.add(panel);
    const ph = h - .14;
    box(panel, 0, .08, z, pw, ph, T, k.mats.main);
    if (mirror && i % 2 === 0) box(panel, .05, .14, z + T, pw - .1, ph - .12, .004, shared.silverMirror(), {uv:false});
    for (const ex of [0, pw - .022]) box(panel, ex, .08, z - .002, .022, ph, T + .008, k.mats.metal, {uv:false});
    if (i === 0) k.openers.push({obj:panel, type:"slideX", from:x, to:pw*.94});
  }
}

export function openRun(k, g, len, h, D, led, offset) {
  box(g, 0, 0, 0, len, h, .012, k.mats.accentFlat);
  const n = Math.max(1, Math.round(len/.8)), sw = len/n;
  const kinds = ["long", "shelves", "double", "shoes", "drawers"];
  for (let i = 0; i <= n; i++) box(g, Math.min(len - T, i*sw - (i ? T/2 : 0)), 0, .012, T, h, D - .012, k.mats.accentFlat);
  box(g, 0, h - T, .012, len, T, D - .012, k.mats.accentFlat);
  box(g, 0, 0, .012, len, .06, D - .02, k.mats.accentFlat);
  for (let i = 0; i < n; i++) {
    const x = i*sw + T/2, w = sw - T;
    const kind = kinds[(i + offset) % kinds.length];
    if (kind === "drawers") {
      for (let r = 0; r < 3; r++) front(k, g, x, .06 + r*.2, w, .2, k.mats.main, "drawer", {depth:D});
      for (let y = .9; y < h - .3; y += .36) { box(g, x, y, .012, w, .018, D - .03, k.mats.accentFlat); folded(g, x, w, y + .018, D - .02); }
      box(g, x, .66, .012, w, .018, D - .03, k.mats.accentFlat);
    } else interior(k, g, x, w, h, D - .02, kind, led);
  }
}

export function lowDrawers(k, g, len, h, D) {
  box(g, 0, 0, 0, len, .06, D - .05, shared.shadowGap(), {uv:false});
  box(g, 0, .06, 0, len, h - .06, D - T - .002, k.mats.mainFlat);
  const n = Math.max(1, Math.round(len/.6));
  for (let c = 0; c < n; c++) for (let r = 0; r < 3; r++) front(k, g, c*len/n, .06 + r*(h - .06)/3, len/n, (h - .06)/3, k.mats.main, "drawer", {depth:D});
  box(g, 0, h, 0, len, .03, D + .01, k.mats.accentFlat);
}

export function tableLamp(k, g, x, y, z) {
  const base = [[0, 0], [.06, 0], [.085, .06], [.075, .16], [.03, .24], [.012, .26], [0, .26]].map(([a, b]) => new THREE.Vector2(a, b));
  mesh(g, new THREE.LatheGeometry(base, 28), shared.ceramic(), x, y, z);
  const shade = mesh(g, new THREE.CylinderGeometry(.11, .14, .19, 32, 1, true), lampShade(), x, y + .33, z);
  shade.castShadow = false;
  const bulb = mesh(g, new THREE.SphereGeometry(.03, 12, 8), shared.bulb(), x, y + .3, z);
  bulb.castShadow = false;
  lamp(k, g, x, y + .3, z + .05, 1.8);
}

export let shadeMat = null;

export const lampShade = () => shadeMat || (shadeMat = new THREE.MeshStandardMaterial({color:"#f2ebdf", roughness:.9, side:THREE.DoubleSide}));

export function chair(k, x, z) {
  const g = group(k, x, z), dark = shared.darkMetal(), seat = shared.fabric("#3f4144");
  rbox(g, 0, .47, 0, .5, .08, .48, .03, seat);
  const back = rbox(g, 0, .82, .25, .46, .52, .06, .03, seat);
  back.rotation.x = -.12;
  cylinder(g, .025, .36, dark, 0, .27, 0);
  for (let i = 0; i < 5; i++) {
    const a = i*Math.PI*2/5;
    const leg = box(g, -.015, .05, -.015, .03, .025, .3, dark, {uv:false});
    leg.position.set(Math.sin(a)*.15, .06, Math.cos(a)*.15);
    leg.rotation.y = a;
    mesh(g, new THREE.SphereGeometry(.025, 10, 8), dark, Math.sin(a)*.29, .025, Math.cos(a)*.29);
  }
}

export {softShadow, mesh, box, cylinder, front, glow, props, plinth, crown, CROWN_H};
