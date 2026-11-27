// 3D модели: walkin. Всеки модел е отделна функция; build() избира според f.model.
import * as THREE from "three";
import {frontMaterial, carcassMaterial, metalMaterial, topMaterial, shared, quality} from "../materials.js";
import {T, CLOTHES, BOOKS, seed, rnd, pick, metres, group, rbox, ledStrip, lamp, shell, legs, tallTop, interior, rail, geoCache, cachedGeo, silhouette, GARMENTS, garment, hanger, clothes, folded, boxes, SHOES, shoe, shoes, COAT_FRONT, hangingItem, books, slats, vanityTray, decor, slidingDoors, openRun, lowDrawers, tableLamp, shadeMat, lampShade, chair, softShadow, mesh, box, cylinder, front, glow, props, plinth, crown, CROWN_H} from "../parts.js";

// Гардеробна: отворена система по една, две или три стени, остров с чекмеджета.
function walkin(k, f, H) {
  const A = metres(f.A, 1.5, 6), B = f.shape === "I" ? 0 : metres(f.B, 1.2, 4.5), D = .5;
  const h = Math.min(2.4, H - .08);
  const back = group(k);
  openRun(k, back, A, h, D, f.led, 0);
  if (f.shape !== "I") {
    // Ляво рамо: ниски чекмеджета под прозореца, плот отгоре.
    const len = Math.max(.6, B - D);
    const arm = group(k, 0, B, Math.PI/2);
    lowDrawers(k, arm, len, .9, D);
    vanityTray(k, D/2, .93, B - len*.3);
  }
  if (f.shape === "U") {
    const len = Math.max(.6, B - D);
    const arm = group(k, A, D, -Math.PI/2);
    openRun(k, arm, len, h, D, f.led, 2);
  }
  let depth = Math.max(D, B);
  if (f.island && A >= 2) {
    const iw = Math.min(1.6, A*.45), z = Math.max(D + 1.05, B ? Math.min(B*.55, D + 1.2) : D + 1.05);
    const isle = group(k, A/2 - iw/2, z);
    box(isle, 0, 0, 0, iw, .06, .6, shared.shadowGap(), {uv:false});
    box(isle, 0, .06, 0, iw, .82, .6 - T, k.mats.mainFlat);
    const cols = Math.max(2, Math.round(iw/.5));
    for (let c = 0; c < cols; c++) for (let r = 0; r < 3; r++) front(k, isle, c*iw/cols, .06 + r*.27, iw/cols, .27, k.mats.main, "drawer", {depth:.6});
    box(isle, -.02, .88, -.02, iw + .04, .03, .64, k.mats.accentFlat);
    props.vase(k, A/2 - iw*.25, .91, z + .3);
    softShadow(k.root, A/2, .0015, z + .3, iw + .4, 1, .3);
    depth = Math.max(depth, z + .9);
  }
  softShadow(k.root, A/2, .0015, D/2 + .05, A + .3, D + .35, .28);
  k.roomShape = f.shape === "I" ? "I" : f.shape;
  k.roomB = Math.max(B, 1.2);
  k.size = {A, depth, H};
}

// ---- Общи помощници за новите модели на гардеробната ----
// Остров с чекмеджета (същият като в основния модел).
function island(k, A, B, D) {
  const iw = Math.min(1.6, A*.45), z = Math.max(D + 1.05, B ? Math.min(B*.55, D + 1.2) : D + 1.05);
  const isle = group(k, A/2 - iw/2, z);
  box(isle, 0, 0, 0, iw, .06, .6, shared.shadowGap(), {uv:false});
  box(isle, 0, .06, 0, iw, .82, .6 - T, k.mats.mainFlat);
  const cols = Math.max(2, Math.round(iw/.5));
  for (let c = 0; c < cols; c++) for (let r = 0; r < 3; r++) front(k, isle, c*iw/cols, .06 + r*.27, iw/cols, .27, k.mats.main, "drawer", {depth:.6});
  box(isle, -.02, .88, -.02, iw + .04, .03, .64, k.mats.accentFlat);
  props.vase(k, A/2 - iw*.25, .91, z + .3);
  softShadow(k.root, A/2, .0015, z + .3, iw + .4, 1, .3);
  return z + .9;
}

// Врата със стъклен панел и тънка метална рамка; панта отляво (L) или отдясно (R).
function glassDoor(k, g, x, w, y0, y1, D, side) {
  const gap = .003, pw = w - 2*gap, ph = y1 - y0, fb = .028, fd = .02;
  const piv = new THREE.Group();
  piv.position.set(side === "L" ? x + gap : x + w - gap, 0, D);
  g.add(piv);
  const x0 = side === "L" ? 0 : -pw, m = k.mats.metal;
  box(piv, x0, y0, -fd, fb, ph, fd, m, {uv:false});
  box(piv, x0 + pw - fb, y0, -fd, fb, ph, fd, m, {uv:false});
  box(piv, x0 + fb, y0, -fd, pw - 2*fb, fb, fd, m, {uv:false});
  box(piv, x0 + fb, y1 - fb, -fd, pw - 2*fb, fb, fd, m, {uv:false});
  box(piv, x0 + fb - .002, y0 + fb - .002, -fd/2 - .002, pw - 2*fb + .004, ph - 2*fb + .004, .004, shared.bronzeGlass(), {uv:false});
  const hx = side === "L" ? x0 + pw - .055 : x0 + .055;
  cylinder(piv, .007, .32, m, hx, y0 + ph*.46, .018, "y", 10);
  for (const dy of [-.12, .12]) cylinder(piv, .004, .016, m, hx, y0 + ph*.46 + dy, .008, "z", 8);
  k.openers.push({obj:piv, type:"rotY", to:side === "L" ? -1.75 : 1.75});
}

// Със стъклени витрини: главната стена е със затворени шкафове със стъклени врати и LED.
function glass(k, f, H) {
  const A = metres(f.A, 1.5, 6), B = metres(f.B, 1.2, 4.5), D = .5;
  const h = Math.min(2.4, H - .08);
  const back = group(k);
  const n = Math.max(2, Math.round(A/.8)), sw = A/n;
  const kinds = ["long", "shelves", "double", "shoes", "shelves"];
  for (let i = 0; i < n; i++) {
    const sg = group(k, i*sw);
    shell(k, sg, sw, h, D);
    interior(k, sg, T, sw - 2*T, h, D - .04, kinds[i % kinds.length], false);
    glassDoor(k, sg, 0, sw, .08, h - .004, D, i % 2 ? "R" : "L");
    if (f.led) k.leds.push(box(sg, i % 2 ? sw - T - .012 : T + .004, .15, D - .07, .008, h - .3, .01, shared.led(), {uv:false}));
  }
  if (f.led) { lamp(k, back, A*.28, 1.3, D*.6, 1.8); lamp(k, back, A*.72, 1.3, D*.6, 1.8); }
  // Странична стена: ниски чекмеджета под прозореца и поднос отгоре.
  const len = Math.max(.6, B - D);
  const arm = group(k, 0, B, Math.PI/2);
  lowDrawers(k, arm, len, .9, D);
  vanityTray(k, D/2, .93, B - len*.3);
  let depth = Math.max(D, B);
  if (f.island && A >= 2) depth = Math.max(depth, island(k, A, B, D));
  softShadow(k.root, A/2, .0015, D/2 + .05, A + .3, D + .35, .28);
  k.roomShape = "L";
  k.roomB = Math.max(B, 1.2);
  k.size = {A, depth, H};
}

// С тоалетка: отворена система на главната стена и тоалетка с огледало и пейка на страничната.
function vanity(k, f, H) {
  const A = metres(f.A, 1.5, 6), B = metres(f.B, 1.2, 4.5), D = .5;
  const h = Math.min(2.4, H - .08);
  const back = group(k);
  openRun(k, back, A, h, D, f.led, 0);
  const len = Math.max(.6, B - D);
  const arm = group(k, 0, B, Math.PI/2);
  const vw = Math.max(.55, Math.min(1.2, len - .25)), x0 = B >= 1.7 ? Math.max(0, Math.min(len - vw, B/2 - vw/2)) : (len - vw)/2, td = .46;
  // Маса: дървен плот на .75 м, чекмеджета под него и тънки крака.
  box(arm, x0, .72, 0, vw, .03, td, k.mats.accentFlat);
  box(arm, x0 + .03, .58, 0, vw - .06, .14, td - .06, k.mats.mainFlat);
  const dn = vw > .8 ? 2 : 1;
  for (let i = 0; i < dn; i++) front(k, arm, x0 + .03 + i*(vw - .06)/dn, .58, (vw - .06)/dn, .14, k.mats.main, "drawer", {depth:td - .06});
  for (const lx of [x0 + .035, x0 + vw - .035]) for (const lz of [.04, td - .04]) cylinder(arm, .014, .72, k.mats.metal, lx, .36, lz, "y", 12);
  // Голямо огледало с LED рамка.
  const mw = Math.min(1.0, vw - .1), mh = 1.15, my = Math.min(.98, H - mh - .1), mx = x0 + (vw - mw)/2;
  box(arm, mx, my, 0, mw, mh, .03, k.mats.metal, {uv:false});
  box(arm, mx + .03, my + .03, .03, mw - .06, mh - .06, .004, shared.silverMirror(), {uv:false});
  if (f.led) {
    ledStrip(k, arm, mx + .012, my + mh - .026, .03, mw - .024);
    ledStrip(k, arm, mx + .012, my + .02, .03, mw - .024);
    for (const vx of [mx + .012, mx + mw - .018]) k.leds.push(box(arm, vx, my + .03, .03, .006, mh - .06, .008, shared.led(), {uv:false}));
    lamp(k, arm, mx + mw/2, my + mh*.5, .4, 1.8);
    glow(k, arm, x0 + .05, x0 + vw - .05, td - .1);
  }
  // Предмети: поднос с парфюми и ваза (световите координати: arm е завъртян).
  const wz = lx => B - lx;
  vanityTray(k, td*.5, .75, wz(x0 + vw*.3));
  props.vase(k, td*.45, .75, wz(x0 + vw*.8));
  // Тапицирана табуретка и килим.
  const dc = decor(k), sx = td + .16, sz = wz(x0 + vw/2);
  cylinder(dc, .19, .1, shared.boucle(), sx, .41, sz, "y", 32);
  for (const [dx, dz] of [[-.12, -.12], [.12, -.12], [-.12, .12], [.12, .12]]) cylinder(dc, .011, .36, k.mats.metal, sx + dx, .18, sz + dz, "y", 8);
  let depth = Math.max(D, B);
  if (B >= 1.9) rbox(dc, Math.min(A*.5, 1.6), .006, D + (B - D)*.5, Math.min(2.2, A*.6), .012, .9, .005, shared.linen("#d9cfc0"));
  softShadow(k.root, A/2, .0015, D/2 + .05, A + .3, D + .35, .28);
  k.roomShape = "L";
  k.roomB = Math.max(B, 1.2);
  k.size = {A, depth, H};
}

const BUILDERS = {walkin, Lisland:walkin, one:walkin, L:walkin, U:walkin, glass, vanity};
export function build(k, f, H) {
  return (BUILDERS[f.model] || walkin)(k, f, H);
}
