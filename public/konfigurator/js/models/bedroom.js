// 3D модели: bedroom. Всеки модел е отделна функция; build() избира според f.model.
import * as THREE from "three";
import {frontMaterial, carcassMaterial, metalMaterial, topMaterial, shared, quality} from "../materials.js";
import {isWood, FRONTS} from "../catalog.js";
import {T, CLOTHES, BOOKS, seed, rnd, pick, metres, group, rbox, ledStrip, lamp, shell, legs, tallTop, interior, rail, geoCache, cachedGeo, silhouette, GARMENTS, garment, hanger, clothes, folded, boxes, SHOES, shoe, shoes, COAT_FRONT, hangingItem, books, slats, vanityTray, decor, slidingDoors, openRun, lowDrawers, tableLamp, shadeMat, lampShade, chair, softShadow, mesh, box, cylinder, front, glow, props, plinth, crown, CROWN_H} from "../parts.js";

// Спалня: легло с табла или стенен панел, нощни шкафчета, лампи, спално бельо.
function bedroom(k, f, H) {
  const W = metres(f.width, 2.6, 5.5), bw = Number(f.bed || 160)/100, bl = 2.04;
  const cx = W/2, g = group(k);
  let headZ = .06;
  if (f.head === "panel") {
    slats(k, g, 0, W, 0, Math.min(H - .02, 2.6));
    headZ = .04;
    if (f.led) { ledStrip(k, g, .05, Math.min(H - .02, 2.6) - .02, .04, W - .1); }
  } else if (f.head === "upholstered") {
    const hw = bw + .3, n = Math.max(5, Math.round(hw/.16));
    for (let i = 0; i < n; i++) rbox(g, cx - hw/2 + (i + .5)*hw/n, .78, .045, hw/n - .006, 1.1, .085, .035, soft("#cdbfad"));
    headZ = .09;
  } else {
    const hw = bw + 1.5;
    box(g, cx - hw/2, .25, 0, hw, 1.05, .03, k.mats.accentFlat);
    box(g, cx - hw/2, 1.3, 0, hw, .025, .16, k.mats.accentFlat);
    headZ = .035;
  }
  // Рамка, матрак, завивка, възглавници и одеяло в долния край.
  const fh = f.storage ? .4 : .3;
  const frameMat = f.head === "upholstered" ? soft("#cdbfad") : k.mats.accentFlat;
  box(g, cx - bw/2 + .06, 0, headZ + .12, bw - .12, .06, bl - .24, shared.shadowGap(), {uv:false});
  rbox(g, cx, .06 + (fh - .06)/2, headZ + (bl + .04)/2, bw + .08, fh - .06, bl + .04, .012, frameMat);
  const mTop = fh + .2;
  rbox(g, cx, fh + .1, headZ + .02 + bl/2, bw, .2, bl - .02, .05, shared.linen("#f6f3ee"));
  const dz0 = headZ + .62, dz1 = headZ + bl + .04, duvet = shared.linen("#eeeae2");
  rbox(g, cx, mTop + .035, (dz0 + dz1)/2, bw + .08, .07, dz1 - dz0, .03, duvet);
  for (const sx of [-1, 1]) rbox(g, cx + sx*(bw/2 + .045), mTop - .1, (dz0 + dz1)/2, .03, .3, dz1 - dz0, .012, duvet);
  rbox(g, cx, mTop - .1, dz1 + .015, bw + .12, .3, .03, .012, duvet);
  const throwMat = shared.linen(pick(["#b9a68c", "#8f8f80", "#c9b8a0"]));
  rbox(g, cx, mTop + .085, dz1 - .3, bw + .14, .03, .55, .012, throwMat);
  for (const sx of [-1, 1]) rbox(g, cx + sx*(bw/2 + .075), mTop - .05, dz1 - .3, .025, .27, .55, .01, throwMat);
  const pillows = bw >= 1.8 ? 3 : 2;
  for (let i = 0; i < pillows; i++) {
    const p = rbox(g, cx - bw/2 + (i + .5)*bw/pillows, mTop + .14, headZ + .22, bw/pillows - .06, .16, .44, .07, shared.linen("#f8f6f2"));
    p.rotation.x = -.38;
  }
  rbox(g, cx, mTop + .12, headZ + .4, .45, .14, .3, .06, soft(pick(["#9c8a72", "#7f8a74", "#b89f86"]))).rotation.x = -.25;
  // Нощни шкафчета и лампи.
  if (f.stands !== "none") {
    const nw = .5, nd = .4;
    for (const side of [-1, 1]) {
      const x = side < 0 ? cx - bw/2 - .1 - nw : cx + bw/2 + .1;
      const sg = group(k, x, headZ);
      const floating = f.stands === "floating";
      const y = floating ? .36 : 0, h = floating ? .24 : .52;
      box(sg, 0, y, 0, nw, h, nd - T - .002, k.mats.mainFlat);
      if (floating) front(k, sg, 0, y, nw, h, k.mats.main, "drawer", {depth:nd});
      else { front(k, sg, 0, .04, nw, (h - .04)/2, k.mats.main, "drawer", {depth:nd}); front(k, sg, 0, .04 + (h - .04)/2, nw, (h - .04)/2, k.mats.main, "drawer", {depth:nd}); box(sg, .02, 0, .02, nw - .04, .04, nd - .08, shared.shadowGap(), {uv:false}); }
      box(sg, -.005, y + h, -.005, nw + .01, .02, nd + .01, k.mats.accentFlat);
      tableLamp(k, sg, nw/2, y + h + .02, nd/2);
      if (floating && f.led) glow(k, sg, 0, nw, nd - .2);
    }
  }
  // Килим под леглото.
  rbox(k.root, cx, .006, headZ + bl*.62, bw + 1.4, .012, 2.3, .005, shared.linen("#e4dccf"));
  softShadow(k.root, cx, .014, headZ + bl/2, bw + .5, bl + .4, .32);
  k.size = {A:W, depth:headZ + bl + .5, H};
}

// ---- Общи помощници за новите модели ----
// Мека кадифена тапицерия в светъл тон (текстурата velvet е червена, затова собствен материал).
const softCache = new Map();
function soft(color) {
  if (!softCache.has(color)) softCache.set(color, new THREE.MeshPhysicalMaterial({color, roughness:.88, sheen:1, sheenRoughness:.5, sheenColor:"#ffffff", normalMap:shared.linen("#ffffff").normalMap, normalScale:new THREE.Vector2(.5, .5)}));
  return softCache.get(color);
}
let mirrorM = null;
const mirrorMat = () => mirrorM || (mirrorM = new THREE.MeshStandardMaterial({color:"#e9eff1", metalness:.35, roughness:.05}));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const BL = 2.04;
// Мек тон за тапицерията: акцентът, ако не е дърво, иначе топъл бежов.
const softTone = k => { const id = k.s.fAccent; return !id || isWood(id) ? "#cbbfad" : (FRONTS[id]?.hex || "#cbbfad"); };
const bedW = f => Number(f.bed || 160)/100;

// Легло: рамка, матрак, завивка, възглавници. Връща височината на рамката.
function dressBed(k, g, f, cx, headZ, frameMat) {
  const bw = bedW(f), bl = BL, fh = f.storage ? .4 : .3;
  box(g, cx - bw/2 + .06, 0, headZ + .12, bw - .12, .06, bl - .24, shared.shadowGap(), {uv:false});
  rbox(g, cx, .06 + (fh - .06)/2, headZ + (bl + .04)/2, bw + .08, fh - .06, bl + .04, .012, frameMat);
  const mTop = fh + .2;
  rbox(g, cx, fh + .1, headZ + .02 + bl/2, bw, .2, bl - .02, .05, shared.linen("#f6f3ee"));
  const dz0 = headZ + .62, dz1 = headZ + bl + .04, duvet = shared.linen("#eeeae2");
  rbox(g, cx, mTop + .035, (dz0 + dz1)/2, bw + .08, .07, dz1 - dz0, .03, duvet);
  for (const sx of [-1, 1]) rbox(g, cx + sx*(bw/2 + .045), mTop - .1, (dz0 + dz1)/2, .03, .3, dz1 - dz0, .012, duvet);
  rbox(g, cx, mTop - .1, dz1 + .015, bw + .12, .3, .03, .012, duvet);
  rbox(g, cx, mTop + .085, dz1 - .3, bw + .14, .03, .55, .012, shared.linen(pick(["#b9a68c", "#8f8f80", "#c9b8a0"])));
  const pillows = bw >= 1.8 ? 3 : 2;
  for (let i = 0; i < pillows; i++) rbox(g, cx - bw/2 + (i + .5)*bw/pillows, mTop + .14, headZ + .22, bw/pillows - .06, .16, .44, .07, shared.linen("#f8f6f2")).rotation.x = -.38;
  rbox(g, cx, mTop + .12, headZ + .4, .45, .14, .3, .06, soft(pick(["#9c8a72", "#7f8a74", "#b89f86"]))).rotation.x = -.25;
  return fh;
}

// Нощно шкафче (висящо с 1 чекмедже или стоящо с 2) с лампа.
function nightstand(k, g, f, x, z, nw, nd, o = {}) {
  const fl = o.floating !== false, sg = group(k, x, z);
  let y, h;
  if (fl) {
    y = .34; h = .24;
    box(sg, 0, y, 0, nw, h, nd - T - .002, k.mats.mainFlat);
    front(k, sg, 0, y, nw, h, k.mats.main, "drawer", {depth:nd});
    if (f.led && o.glow !== false) glow(k, sg, 0, nw, nd - .2);
  } else {
    const base = k.legs ? .14 : .05;
    y = base; h = .5 - base;
    box(sg, 0, y, 0, nw, h, nd - T - .002, k.mats.mainFlat);
    for (let i = 0; i < 2; i++) front(k, sg, 0, y + i*h/2, nw, h/2, k.mats.main, "drawer", {depth:nd});
    if (k.legs) for (const [lx, lz] of [[.04, .04], [nw - .04, .04], [.04, nd - .06], [nw - .04, nd - .06]]) cylinder(sg, .014, base, k.mats.metal, lx, base/2, lz, "y", 12);
    else box(sg, .02, 0, .02, nw - .04, base, nd - .08, shared.shadowGap(), {uv:false});
  }
  box(sg, -.005, y + h, -.005, nw + .01, .02, nd + .01, k.mats.accentFlat);
  if (o.lamp !== false) tableLamp(k, sg, nw/2, y + h + .02, nd/2);
  return sg;
}

function rugAndShadow(k, cx, headZ, bw, W) {
  rbox(decor(k), cx, .006, headZ + BL*.62, Math.min(bw + 1.4, W - .08), .012, 2.3, .005, shared.linen("#e4dccf"));
  softShadow(k.root, cx, .014, headZ + BL/2, bw + .5, BL + .4, .32);
}

// Облицовка на стената зад леглото според f.head. Връща дълбочината ѝ.
function wallFill(k, g, f, x0, w, y0, h, tone) {
  if (f.head === "panel") { slats(k, g, x0, w, y0, h, 0); return .034; }
  const n = Math.max(2, Math.round(w/.52)), pw = w/n;
  const mat = f.head === "wood" ? k.mats.accentFlat : soft(tone);
  for (let i = 0; i < n; i++) rbox(g, x0 + (i + .5)*pw, y0 + h/2, .03, pw - .008, h, .06, .025, mat);
  return .06;
}

function sconce(k, g, x, y, z0) {
  box(g, x - .025, y - .025, z0, .05, .05, .012, k.mats.metal, {uv:false});
  box(g, x - .008, y - .008, z0, .016, .016, .12, k.mats.metal, {uv:false});
  mesh(g, cachedGeo("sconceShade", () => new THREE.CylinderGeometry(.05, .065, .17, 24, 1, true)), lampShade(), x, y + .02, z0 + .13).castShadow = false;
  mesh(g, cachedGeo("sconceBulb", () => new THREE.SphereGeometry(.024, 12, 8)), shared.bulb(), x, y + .02, z0 + .13).castShadow = false;
  lamp(k, g, x, y, z0 + .15, 1.5);
}

// Висок шкаф (корпус + вътрешност + врати на панти). hinge: "L" / "R" за единична врата.
function tower(k, f, g, x, w, h, D, hinge, off = 0) {
  const sg = group(k, x, 0);
  shell(k, sg, w, h, D);
  const n = Math.max(1, Math.round(w/.55)), sw = (w - 2*T)/n;
  const kinds = ["long", "shelves", "double", "drawers"];
  for (let i = 0; i < n; i++) {
    const xi = T + i*sw;
    if (i) box(sg, xi - .009, .08 + T, .015, .018, h - .08 - 2*T, D - T - .04, k.mats.carcass, {uv:false});
    interior(k, sg, xi, sw, h, D - T - .02, kinds[(i + off) % kinds.length], f.led);
  }
  for (let i = 0; i < n; i++) front(k, sg, i*w/n, .08, w/n, h - .08, k.mats.main, n === 1 ? (hinge === "R" ? "doorR" : "doorL") : (i % 2 ? "doorR" : "doorL"), {zone:"wardrobe", depth:D});
  return sg;
}

// ---- Тапицирана стена ----
function upholstered(k, f, H) {
  const W = metres(f.width, 2.6, 5.5), bw = bedW(f), cx = W/2, g = group(k), tone = softTone(k);
  const pw = Math.min(W - .1, W*.9), x0 = cx - pw/2;
  const dep = wallFill(k, g, f, x0, pw, 0, 1.4, tone);
  box(g, x0, 1.4, 0, pw, .04, .12, k.mats.accentFlat);
  if (f.led) { ledStrip(k, g, x0 + .05, 1.394, .075, pw - .1); lamp(k, g, cx, 1.3, .14, 2); }
  const headZ = dep + .01;
  dressBed(k, g, f, cx, headZ, f.head === "upholstered" ? soft(tone) : k.mats.accentFlat);
  const nw = clamp((W - bw)/2 - .1, .25, .5);
  for (const side of [-1, 1]) {
    const x = side < 0 ? cx - bw/2 - .06 - nw : cx + bw/2 + .06;
    nightstand(k, g, f, x, dep, nw, .4, {lamp:false});
    sconce(k, g, x + nw/2, 1.12, dep);
  }
  rugAndShadow(k, cx, headZ, bw, W);
  softShadow(k.root, cx, .014, headZ + BL/2, bw + .5, BL + .4, .2);
  k.size = {A:W, depth:headZ + BL + .5, H};
}

// ---- Шкафове над леглото ----
function bridge(k, f, H) {
  const W = metres(f.width, 2.6, 5.5), bw = bedW(f), cx = W/2, g = group(k), D = .6, tone = softTone(k);
  const top = tallTop(k, H, Math.min(H - .02, 2.4));
  const side = (W - bw - .1)/2;
  let tw = clamp(side - .25, 0, 1.8);
  if (tw < .45) tw = Math.max(.3, Math.min(.45, side - .04));
  const cols = tw > .7 ? Math.round(tw/.6) : 1, cw = tw/cols;
  for (let i = 0; i < cols; i++) {
    tower(k, f, g, i*cw, cw, top, D, "L", i);
    tower(k, f, g, W - tw + i*cw, cw, top, D, "R", i + 1);
  }
  if (k.s.crown) crown(g, 0, W, top, D, k.mats.mainFlat);
  // Мост от горни шкафове с подемни врати.
  const bh = clamp(top - 1.78, .4, .6), by = top - bh, bd = .35, bx = tw, bl = W - 2*tw;
  const n = Math.max(2, Math.round(bl/.72));
  box(g, bx, by, 0, bl, T, bd - T - .002, k.mats.mainFlat);
  box(g, bx, top - T, 0, bl, T, bd - T - .002, k.mats.mainFlat);
  box(g, bx, by, 0, bl, bh, .012, k.mats.carcass, {uv:false});
  for (let i = 0; i <= n; i++) box(g, i === n ? bx + bl - T : bx + i*bl/n - (i ? T/2 : 0), by + T, 0, T, bh - 2*T, bd - T - .002, k.mats.mainFlat);
  for (let i = 0; i < n; i++) front(k, g, bx + i*bl/n, by, bl/n, bh, k.mats.main, "drawer", {zone:"upper", slide:false, lift:true, depth:bd});
  if (f.led) { ledStrip(k, g, bx + .05, by - .006, bd - .09, bl - .1); lamp(k, g, cx, by - .08, bd - .1, 2.2); }
  // Табла в нишата.
  const dep = wallFill(k, g, f, tw, bl, 0, 1.1, tone);
  const headZ = dep + .01;
  dressBed(k, g, f, cx, headZ, f.head === "upholstered" ? soft(tone) : k.mats.accentFlat);
  const ns = Math.min(.45, side - tw - .02);
  if (ns >= .2) {
    nightstand(k, g, f, tw, dep, ns, .36, {lamp:ns >= .3});
    nightstand(k, g, f, W - tw - ns, dep, ns, .36, {lamp:ns >= .3});
  }
  rugAndShadow(k, cx, headZ, bw, W);
  k.size = {A:W, depth:headZ + BL + .5, H};
}

// ---- Табла с ниша и LED ----
function niche(k, f, H) {
  const W = metres(f.width, 2.6, 5.5), bw = bedW(f), cx = W/2, g = group(k), tone = softTone(k);
  const pw = Math.min(W - .06, bw + 1.4), x0 = cx - pw/2, pd = .12, A = k.mats.accentFlat;
  box(g, x0, .28, 0, pw, 1.25, .03, A);
  box(g, x0, .28, .03, pw, .72, pd - .03, A);
  box(g, x0, 1.18, .03, pw, .35, pd - .03, A);
  for (const ex of [x0, x0 + pw - .03]) box(g, ex, 1.0, .03, .03, .18, pd - .03, A);
  let headZ = pd + .02;
  if (f.head === "panel") { slats(k, g, x0 + .03, pw - .06, .28, .72, pd); headZ = pd + .05; }
  else if (f.head === "upholstered") { rbox(g, cx, .66, pd + .02, bw + .1, .6, .05, .03, soft(tone)); headZ = pd + .06; }
  if (f.led) { ledStrip(k, g, x0 + .05, 1.174, .05, pw - .1); lamp(k, g, cx, 1.1, .1, 1.7); }
  // Предмети в нишата.
  const ny = 1.0, nz = .075;
  for (const [dx, r, hh, c] of [[-.34, .03, .13, "#e7e0d4"], [-.27, .022, .09, "#9aa48f"], [.3, .035, .12, "#cbbfad"]]) mesh(g, cachedGeo(`nv${r}${hh}`, () => new THREE.CylinderGeometry(r*.8, r, hh, 18)), shared.ceramic(), cx + dx*Math.min(1, pw/2.6), ny + hh/2, nz);
  box(g, cx + .05, ny, nz - .035, .18, .03, .07, shared.paper("#ddd3c4"), {uv:false});
  box(g, cx + .06, ny + .03, nz - .033, .14, .025, .065, shared.paper("#7e6b59"), {uv:false});
  const bedMat = f.head === "upholstered" ? soft(tone) : A;
  dressBed(k, g, f, cx, headZ, bedMat);
  // Вградени конзолни нощни шкафчета.
  const nw = clamp((pw - bw - .1)/2 - .02, .22, .5);
  for (const side of [-1, 1]) nightstand(k, g, f, side < 0 ? cx - bw/2 - .06 - nw : cx + bw/2 + .06, pd, nw, .32);
  // Пуф в долния край.
  rbox(decor(k), cx, .2, headZ + BL + .3, Math.min(bw*.62, 1.1), .4, .36, .12, shared.boucle());
  rugAndShadow(k, cx, headZ, bw, W);
  k.size = {A:W, depth:headZ + BL + .5, H};
}

// ---- Стена от гардероби ----
function wardrobeWall(k, f, H) {
  const W = metres(f.width, 2.6, 5.5), bw = bedW(f), g = group(k), D = .6, tone = softTone(k);
  const top = tallTop(k, H, Math.min(H - .02, 2.6));
  let rw = bw + .9, side = (W - rw)/2;
  if (side < .45) { rw = bw + .35; side = (W - rw)/2; }
  let wL = Math.min(1.5, side), wR = wL, cx = W/2;
  if (side < .45) {
    wL = 0; wR = Math.min(1.5, W - bw - .2);
    if (wR < .45) wR = 0;
    cx = (W - wR)/2;
  }
  rw = W - wL - wR;
  const x0 = wL, rcx = x0 + rw/2;
  if (wL > 0) { tower(k, f, g, 0, wL, top, D, "L", 0); if (k.s.crown) crown(g, 0, wL, top, D, k.mats.mainFlat); }
  if (wR > 0) { tower(k, f, g, W - wR, wR, top, D, "R", 1); if (k.s.crown) crown(g, W - wR, W, top, D, k.mats.mainFlat); }
  // Ниша: облицовка до тавана, корнизна LED линия, плаващи рафтове.
  const dep = wallFill(k, g, f, x0, rw, 0, top, tone);
  box(g, x0, top - .05, 0, rw, .05, .2, k.mats.accentFlat);
  if (f.led) { ledStrip(k, g, x0 + .04, top - .056, .17, rw - .08); lamp(k, g, rcx, top - .25, .2, 2.2); }
  const headZ = dep + .01;
  dressBed(k, g, f, rcx, headZ, f.head === "upholstered" ? soft(tone) : k.mats.accentFlat);
  const ns = (rw - bw - .08)/2 - .02;
  if (ns >= .18) for (const side2 of [-1, 1]) {
    const sx = side2 < 0 ? rcx - bw/2 - .06 - ns : rcx + bw/2 + .06;
    box(g, sx, .5, dep, ns, .035, .32, k.mats.accentFlat);
    if (f.led) glow(k, g, sx, sx + ns, dep + .1);
    if (ns >= .28) tableLamp(k, g, sx + ns/2, .535, dep + .16);
    else box(g, sx + .03, .535, dep + .08, ns - .06, .05, .12, shared.paper("#7e6b59"), {uv:false});
  }
  rugAndShadow(k, rcx, headZ, bw, W);
  k.size = {A:W, depth:Math.max(D + .1, headZ + BL + .5), H};
}

// ---- С тоалетка ----
function vanity(k, f, H) {
  const W = metres(f.width, 2.6, 5.5), bw = bedW(f), g = group(k), tone = softTone(k);
  const room = W - bw - .08 - .1;
  let ns = .45, vw = Math.min(1.2, room - .63);
  if (vw < .85) { ns = 0; vw = Math.min(1.2, room - .18); }
  vw = Math.max(vw, .5);
  const total = (ns ? ns + .06 : 0) + bw + .08 + .12 + vw;
  const x0 = Math.max(.03, (W - total)/2);
  const bx = x0 + (ns ? ns + .06 : 0), cx = bx + (bw + .08)/2;
  // Висока мека табла с крила.
  const hw = bw + .3, headZ = .12;
  if (f.head === "panel") slats(k, g, cx - hw/2 - .05, hw + .1, .1, 1.3, 0);
  else if (f.head === "wood") { box(g, cx - hw/2, .1, 0, hw, 1.2, .05, k.mats.accentFlat); box(g, cx - hw/2 - .03, 1.3, 0, hw + .06, .03, .08, k.mats.accentFlat); }
  else {
    const m = soft(tone);
    rbox(g, cx, .72, .06, hw, 1.24, .1, .04, m);
    for (const sx of [-1, 1]) rbox(g, cx + sx*(hw/2 + .03), .66, .15, .1, 1.12, .24, .04, m);
  }
  dressBed(k, g, f, cx, headZ, f.head === "upholstered" ? soft(tone) : k.mats.accentFlat);
  if (ns) {
    nightstand(k, g, f, x0, 0, ns, .4, {floating:false});
    rbox(g, x0 + ns/2, 1.45, .012, .5, .65, .024, .006, k.mats.accentFlat);
    rbox(g, x0 + ns/2, 1.45, .026, .44, .59, .004, .002, shared.paper("#e9e1d3"));
    box(g, x0 + ns/2 - .14, 1.3, .03, .28, .16, .002, shared.paper("#b8a48c"), {uv:false});
  }
  // Тоалетка с огледало.
  const vx = bx + bw + .08 + .12, vd = .45;
  box(g, vx, .48, 0, vw, .25, vd - T - .002, k.mats.mainFlat);
  for (let i = 0; i < 2; i++) front(k, g, vx + i*vw/2, .48, vw/2, .25, k.mats.main, "drawer", {depth:vd});
  box(g, vx - .01, .73, 0, vw + .02, .02, vd + .01, k.mats.accentFlat);
  if (k.legs) for (const lx of [vx + .03, vx + vw - .03]) cylinder(g, .014, .73, k.mats.metal, lx, .365, vd - .05, "y", 12);
  const r = Math.min(.34, vw/2 - .04), my = 1.42, mx = vx + vw/2;
  mesh(g, cachedGeo("mirrorDisc", () => new THREE.CircleGeometry(1, 48)), mirrorMat(), mx, my, .018).scale.set(r, r, 1);
  mesh(g, cachedGeo("mirrorRing", () => new THREE.TorusGeometry(1, .011, 8, 56)), k.mats.metal, mx, my, .02).scale.set(r, r, 1);
  tableLamp(k, g, vx + .15, .75, .17);
  vanityTray(k, vx + vw*.64, .75, .2);
  // Табуретка.
  const d = decor(k), sx2 = mx, sz = vd + .3;
  rbox(d, sx2, .4, sz, .4, .08, .34, .04, soft(tone));
  for (const [dx, dz] of [[-.15, -.12], [.15, -.12], [-.15, .12], [.15, .12]]) cylinder(d, .012, .36, k.mats.metal, sx2 + dx, .18, sz + dz, "y", 10);
  rugAndShadow(k, cx, headZ, bw, W);
  k.size = {A:W, depth:headZ + BL + .5, H};
}

const BUILDERS = {slats:bedroom, upholstered, bridge, niche, wardrobeWall, vanity};
export function build(k, f, H) {
  return (BUILDERS[f.model] || bedroom)(k, f, H);
}
