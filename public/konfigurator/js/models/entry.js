// 3D модели: entry. Всеки модел е отделна функция; build() избира според f.model.
import * as THREE from "three";
import {frontMaterial, carcassMaterial, metalMaterial, topMaterial, shared, quality} from "../materials.js";
import {isWood} from "../catalog.js";
import {T, CLOTHES, BOOKS, seed, rnd, pick, metres, group, rbox, ledStrip, lamp, shell, legs, tallTop, interior, rail, geoCache, cachedGeo, silhouette, GARMENTS, garment, hanger, clothes, folded, boxes, SHOES, shoe, shoes, COAT_FRONT, hangingItem, books, slats, vanityTray, decor, slidingDoors, openRun, lowDrawers, tableLamp, shadeMat, lampShade, chair, softShadow, mesh, box, cylinder, front, glow, props, plinth, crown, CROWN_H} from "../parts.js";

// Антре: висок шкаф, пейка с обувки, закачалки и огледало.
function entry(k, f, H) {
  const W = metres(f.width, 1.2, 4), D = .4, g = group(k);
  let x = 0;
  if (f.closet) {
    const cw = Math.min(.9, Math.max(.6, W*.36)), h = tallTop(k, H, Math.min(H - .004, 2.5));
    const cg = group(k, 0);
    shell(k, cg, cw, h, D + .2);
    if (k.s.crown) crown(cg, 0, cw, h, D + .2, k.mats.mainFlat);
    interior(k, cg, T, cw - 2*T, h, D + .2 - T - .02, "long", f.led);
    const n = cw > .65 ? 2 : 1;
    for (let i = 0; i < n; i++) front(k, cg, i*cw/n, .08, cw/n, h - .08, k.mats.main, i % 2 ? "doorR" : "doorL", {zone:"wardrobe", depth:D + .2});
    x = cw + .04;
  }
  const mirrorW = f.mirror ? .5 : 0;
  const bw = Math.max(.6, W - x - (mirrorW ? mirrorW + .06 : 0));
  // Закачалки на панел.
  const pg = group(k, x);
  box(pg, 0, .95, 0, bw, 1.05, .02, k.mats.accentFlat);
  const hooks = Math.max(2, Math.floor(bw/.42));
  for (let i = 0; i < hooks; i++) {
    const hx = (i + .5)*bw/hooks, kind = ["coat", "scarf", "longcoat", "bag"][i % 4];
    cylinder(pg, .008, .07, k.mats.metal, hx, 1.75, .055, "z", 10);
    const color = {coat:pick(["#8e857a", "#3e4347", "#c8b9a2"]), longcoat:pick(["#6e5b4b", "#2f3336", "#b7a58c"]), scarf:pick(["#b5654a", "#d9c4a6", "#7d8a74"]), bag:pick(["#8a6a4e", "#c9b79c", "#3a3532"])}[kind];
    hangingItem(k, pg, kind, hx, 1.75, color);
  }
  box(pg, 0, 2.0, 0, bw, .03, .3, k.mats.accentFlat);
  if (f.bench) {
    box(pg, 0, 0, 0, bw, .06, D - .05, shared.shadowGap(), {uv:false});
    box(pg, 0, .06, 0, bw, .38, D - T - .002, k.mats.mainFlat);
    const n = Math.max(1, Math.round(bw/.6));
    for (let i = 0; i < n; i++) front(k, pg, i*bw/n, .06, bw/n, .38, k.mats.main, "doorL", {depth:D, zone:"upper"});
    rbox(pg, bw/2, .47, D/2, bw - .02, .06, D - .02, .025, shared.boucle());
    shoes(pg, .1, Math.min(.6, bw*.4), 0, D + .25);
  }
  if (f.led) { ledStrip(k, pg, .04, 1.99, .2, bw - .08); glow(k, pg, .05, bw - .05, D - .1); }
  if (mirrorW) {
    const mx = W - mirrorW, mg = group(k, mx);
    box(mg, 0, .3, 0, mirrorW, 1.75, .012, k.mats.accentFlat);
    rbox(mg, mirrorW/2, 1.175, .016, mirrorW - .04, 1.71, .006, .002, shared.silverMirror());
  }
  softShadow(k.root, W/2, .0015, D/2 + .05, W + .3, D + .35, .28);
  rbox(decor(k), W/2, .006, D + .62, Math.min(2.2, W*.75), .012, .78, .005, shared.linen("#d9cfc0"));
  k.size = {A:W, depth:D + .3, H};
}

// ---- Общи помощници за новите модели на антрето ----
const isWoodAccent = k => isWood(k.s.fAccent);

function finish(k, W, D, H, o = {}) {
  softShadow(k.root, o.sx ?? W/2, .0015, D/2 + .05, o.sw ?? W + .3, D + .35, o.shadow ?? .28);
  const rw = Math.min(o.rugW ?? 2.2, W*.8);
  rbox(decor(k), W/2, .006, D + (o.rugZ ?? .62), rw, .012, o.rugD ?? .78, .005, shared.linen(o.rugColor || "#d9cfc0"));
  k.size = {A:W, depth:D + .3, H};
}

// Блок високи шкафове (плитки, без закачалки вътре – дрехите висят отвън): секции с врати.
function closetBlock(k, g, x, w, D, h, kinds, flip = 0) {
  const cg = group(k, x);
  shell(k, cg, w, h, D);
  const n = Math.max(1, Math.round(w/.95)), sw = (w - 2*T)/n;
  for (let i = 0; i < n; i++) {
    interior(k, cg, T + i*sw, sw, h, D - T - .02, kinds[(i + flip) % kinds.length], false);
    if (i) box(cg, T + i*sw - T/2, .08, .012, T, h - .08 - T, D - .03, k.mats.mainFlat);
  }
  const nd = Math.max(1, Math.round(w/.52)), dw = w/nd, split = h > 2.5 ? 2.2 : 0;
  for (let i = 0; i < nd; i++) {
    const mode = i % 2 ? "doorR" : "doorL";
    if (split) {
      front(k, cg, i*dw, .08, dw, split - .08, k.mats.main, mode, {zone:"wardrobe", depth:D});
      front(k, cg, i*dw, split, dw, h - split, k.mats.main, mode, {zone:"upper", depth:D});
    } else front(k, cg, i*dw, .08, dw, h - .08, k.mats.main, mode, {zone:"wardrobe", depth:D});
  }
  return cg;
}

// Шкаф с ниша: шкафове по цялата ширина с една отворена ниша (пейка, обувки, закачалки, рафт).
function niche(k, f, H) {
  const W = metres(f.width, 1.2, 4), D = .4, g = group(k), h = tallTop(k, H, H - .004), wood = isWoodAccent(k);
  const nw = Math.min(1.2, Math.max(.6, W*.45)), rest = W - nw;
  const lw = rest >= 1.6 ? rest/2 : 0, rw = rest - lw;
  const kinds = ["shoes", "shelves", "drawers", "shelves"];
  if (lw) closetBlock(k, g, 0, lw, D, h, kinds);
  closetBlock(k, g, lw + nw, rw, D, h, kinds, 1);
  const nx = lw + (lw ? 0 : T), niw = nw - (lw ? 0 : T);
  if (!lw) box(g, 0, 0, 0, T, h, D - .004, k.mats.mainFlat);
  // Гръб и таван на нишата.
  box(g, nx, 0, 0, niw, h, .012, k.mats.carcass, {uv:false});
  const topY = Math.min(2.1, h - .12);
  box(g, nx, topY, 0, niw, h - topY, D - .004, k.mats.mainFlat);
  front(k, g, nx, topY, niw, h - topY, k.mats.main, "none", {zone:"tall", depth:D});
  if (wood) slats(k, g, nx, niw, .0, topY, .012);
  else box(g, nx, 0, .012, niw, topY, .014, k.mats.accentFlat);
  const bz = .05;
  // Пейка на .45 м: дървен плот и мека възглавница; отдолу отворена лавица за обувки.
  box(g, nx, .4, bz, niw, .05, .33, k.mats.accentFlat);
  rbox(g, nx + niw/2, .475, bz + .165, niw - .06, .05, .3, .02, shared.boucle());
  box(g, nx, .2, bz, niw, .015, .33, k.mats.accentFlat);
  shoes(g, nx + .04, niw - .08, .005, D);
  shoes(g, nx + .04, niw - .08, .215, D);
  // Три закачалки и рафт с LED.
  const hy = 1.55;
  const hooksList = niw < .8 ? [["coat", "#8e857a"], ["scarf", "#b5654a"]] : [["coat", "#8e857a"], ["bag", "#8a6a4e"], ["scarf", "#b5654a"]];
  hooksList.forEach(([kind, color], i) => {
    const hx = nx + niw*(hooksList.length === 2 ? .3 + i*.42 : .2 + i*.3);
    cylinder(g, .008, .07, k.mats.metal, hx, hy, .085, "z", 10);
    hangingItem(k, g, kind, hx, hy, color);
  });
  const sy = 1.8;
  box(g, nx, sy, .012, niw, .03, .26, k.mats.accentFlat);
  books(g, nx + .06, sy + .03, .04, Math.min(.35, niw*.35));
  props.vase(k, nx + niw*.78, sy + .03, .15);
  if (f.led) { ledStrip(k, g, nx + .03, sy - .008, .24, niw - .06); glow(k, g, nx + .05, nx + niw - .05, D - .1); lamp(k, g, nx + niw/2, 1.7, .3, 1.5); }
  if (k.s.crown) crown(g, 0, W, h, D, k.mats.mainFlat);
  finish(k, W, D, H);
}

// Обувки и огледало: висящ шкаф, голямо огледало, стенен рафт с закачалки.
function shoeMirror(k, f, H) {
  const W = metres(f.width, 1.2, 4), D = .3, g = group(k);
  const sw = Math.min(2.8, Math.max(.5, Math.min(W*.7, W - .55)));
  const cy = .15, ch = .9;
  const cg = group(k, 0);
  box(cg, 0, cy, 0, sw, ch, D - T - .002, k.mats.mainFlat);
  const n = Math.max(2, Math.round(sw/.46));
  for (let i = 0; i < n; i++) front(k, cg, i*sw/n, cy, sw/n, ch, k.mats.main, i % 2 ? "doorR" : "doorL", {zone:"tall", depth:D});
  box(cg, -.01, cy + ch, -.0, sw + .02, .03, D + .02, k.mats.accentFlat);
  const top = cy + ch + .03;
  // Предмети върху плота.
  rbox(cg, sw*.2, top + .007, D*.5, .24, .014, .16, .005, shared.wood());
  mesh(cg, new THREE.CylinderGeometry(.03, .026, .09, 20), shared.ceramic(), sw*.2 - .04, top + .059, D*.5);
  props.vase(k, sw*.55, top, D*.5);
  if (sw > 1) tableLamp(k, cg, sw*.86, top, D*.5);
  // Огледало над шкафа.
  const mw = Math.min(sw - .1, Math.max(.9, Math.min(1.3, .9 + (sw - 1.7)*.4))), mh = 1.0, my = Math.min(1.25, H - mh - .08), mx = (sw - mw)/2;
  box(g, mx, my, 0, mw, mh, .026, k.mats.metal, {uv:false});
  box(g, mx + .018, my + .018, .026, mw - .036, mh - .036, .004, shared.silverMirror(), {uv:false});
  // Стенен рафт със закачалки и едно палто.
  const hx0 = sw + .08, rwid = W - hx0 - .02;
  if (rwid > .4) {
    box(g, hx0, 1.58, 0, rwid, .09, .02, k.mats.accentFlat);
    box(g, hx0, 1.75, 0, rwid, .03, .16, k.mats.accentFlat);
    const xs = [hx0 + .27];
    for (let x = xs[0] + .3; x < hx0 + rwid - .05 && xs.length < 4; x += .13) xs.push(x);
    if (xs.length < 2 && rwid > .5) xs.push(hx0 + rwid - .06);
    xs.forEach((x, i) => {
      cylinder(g, .008, .07, k.mats.metal, x, 1.62, .06, "z", 10);
      if (i === 0) hangingItem(k, g, "coat", x, 1.62, "#3e4347");
      else if (i === 1) hangingItem(k, g, "scarf", x, 1.62, "#d9c4a6");
    });
    books(g, hx0 + .05, 1.78, .03, Math.min(.3, rwid*.4));
  }
  if (f.led) { ledStrip(k, cg, .04, cy - .005, D - .06, sw - .08); glow(k, cg, .05, sw - .05, D - .12); lamp(k, g, mx + mw/2, 1.2, .3, 1.5); }
  softShadow(k.root, sw/2, .0015, D/2 + .08, sw + .3, D + .3, .2);
  rbox(decor(k), W/2, .006, D + .55, Math.min(2.6, W*.8), .012, .6, .005, shared.linen("#cfc3b0"));
  k.size = {A:W, depth:D + .3, H};
}

// Отворена система: панел със закачалки, рафт, пейка с кошници и обувки.
function open(k, f, H) {
  const W = metres(f.width, 1.2, 4), D = .4, g = group(k), wood = isWoodAccent(k);
  const pw = W*.8, x0 = (W - pw)/2, py = .45, ph = 1.45;
  if (wood) slats(k, g, x0, pw, py, ph, 0);
  else box(g, x0, py, 0, pw, ph, .02, k.mats.accentFlat);
  const nh = Math.max(3, Math.min(5, Math.floor(pw/.42))), sp = pw/nh;
  const seq = sp >= .45 ? ["coat", "scarf", "longcoat", "bag", "coat"] : ["scarf", "bag", "scarf", "bag", "scarf"];
  const cols = {coat:["#8e857a", "#3e4347"], longcoat:["#6e5b4b"], scarf:["#b5654a", "#7d8a74"], bag:["#8a6a4e", "#3a3532"]};
  for (let i = 0; i < nh; i++) {
    const hx = x0 + (i + .5)*sp, kind = seq[i % seq.length], hy = 1.72;
    cylinder(g, .008, .07, k.mats.metal, hx, hy, .08, "z", 10);
    hangingItem(k, g, kind, hx, hy, cols[kind][i % cols[kind].length]);
  }
  // Горен рафт със сгънати неща.
  const sy = 1.95, sd = .34;
  box(g, x0, sy, 0, pw, .03, sd, k.mats.accentFlat);
  const fw = pw*.55;
  folded(g, x0 + .03, fw, sy + .03, .4);
  boxes(g, x0 + fw + .08, pw - fw - .14, sy + .03, Math.max(.16, Math.min(.3, H - sy - .15)), .4);
  // Пейка: дървена седалка на тънка рамка, кошници и обувки.
  const bw = pw, bd = .36, bz = .04;
  box(g, x0, .41, bz, bw, .04, bd, k.mats.accentFlat);
  rbox(g, x0 + bw/2, .475, bz + bd/2, bw - .04, .05, bd - .06, .02, shared.boucle());
  for (const lx of [x0 + .05, x0 + bw - .05]) for (const lz of [bz + .04, bz + bd - .04]) box(g, lx - .012, 0, lz - .012, .024, .41, .024, k.mats.metal, {uv:false});
  box(g, x0 + .05, .19, bz + .03, bw - .1, .02, bd - .06, k.mats.accentFlat);
  const nb = Math.max(2, Math.min(5, Math.floor(bw/.5))), bs = (bw - .1)/nb;
  const lin = ["#d9cfc0", "#b7a58c", "#9aa48f", "#cbbfad", "#8e857a"];
  for (let i = 0; i < nb; i++) {
    const cx = x0 + .05 + (i + .5)*bs;
    rbox(g, cx, .21 + .095, bz + bd/2, Math.min(.42, bs - .05), .19, bd - .1, .05, shared.linen(lin[i % lin.length]));
  }
  shoes(g, x0 + .06, bw - .12, .004, D);
  if (f.led) { ledStrip(k, g, x0 + .03, sy - .008, .24, pw - .06); glow(k, g, x0 + .05, x0 + pw - .05, D - .1); lamp(k, g, x0 + pw/2, 1.7, .3, 1.5); }
  finish(k, W, D, H, {sw:pw + .5, rugW:Math.min(2.4, pw)});
}

// Гардероб с огледала: огледални врати по цялата ширина, LED отгоре, пуф отпред.
function mirrorCloset(k, f, H) {
  const W = metres(f.width, 1.2, 4), D = .45, g = group(k), h = tallTop(k, H, H - .004);
  const cg = group(k, 0);
  shell(k, cg, W, h, D);
  const ns = Math.max(1, Math.round(W/.95)), sw = (W - 2*T)/ns, kinds = ["shelves", "shoes", "shelves", "drawers"];
  for (let i = 0; i < ns; i++) {
    interior(k, cg, T + i*sw, sw, h, D - T - .02, kinds[i % kinds.length], false);
    if (i) box(cg, T + i*sw - T/2, .08, .012, T, h - .08 - T, D - .03, k.mats.mainFlat);
  }
  const nd = Math.max(2, Math.round(W/.55)), dw = W/nd;
  for (let i = 0; i < nd; i++) {
    const mode = i % 2 ? "doorR" : "doorL";
    front(k, cg, i*dw, .08, dw, h - .08, k.mats.main, mode, {zone:"wardrobe", depth:D});
    const pivot = k.openers[k.openers.length - 1].obj;
    const pw = dw - .004, lx = mode === "doorR" ? -(pw - .05) : .05;
    box(pivot, lx, .14, 0, pw - .1, h - .2, .004, shared.silverMirror(), {uv:false});
  }
  if (k.s.crown) crown(cg, 0, W, h, D, k.mats.mainFlat);
  if (f.led) { ledStrip(k, cg, .05, h - .03, D + .002, W - .1); glow(k, cg, .05, W - .05, D - .1); lamp(k, g, W/2, 1.5, D + .5, 1.6); }
  const px = Math.min(W - .4, W*.72);
  rbox(decor(k), px, .2, D + .5, .42, .4, .42, .14, shared.boucle());
  finish(k, W, D, H, {rugZ:.75, rugD:.9, rugW:Math.min(2, W*.7), rugColor:"#cfc6b6"});
}

// Тесен коридор: плитки вградени шкафове, осветена ниша и една напълно отворена колона.
function slim(k, f, H) {
  const W = metres(f.width, 1.2, 4), D = .3, g = group(k), h = tallTop(k, H, H - .004);
  const ow = W < 1.7 ? .45 : .55, cw = W - ow;
  const sg = group(k, 0);
  shell(k, sg, cw, h, D);
  const lowTop = .93, bandTop = 1.3, wood = isWoodAccent(k);
  const nd = Math.max(1, Math.round(cw/.5)), dw = cw/nd;
  for (let i = 0; i < nd; i++) {
    const mode = i % 2 ? "doorR" : "doorL";
    front(k, sg, i*dw, .08, dw, lowTop - .08, k.mats.main, mode, {zone:"base", depth:D});
    front(k, sg, i*dw, bandTop + .02, dw, h - bandTop - .02, k.mats.main, mode, {zone:"upper", depth:D});
  }
  // Долна палуба и ниша между .95 и 1.3 м.
  box(sg, T, lowTop, 0, cw - 2*T, .02, D - .004, k.mats.mainFlat);
  box(sg, T, bandTop, 0, cw - 2*T, .02, D - .004, k.mats.mainFlat);
  if (wood) slats(k, sg, T, cw - 2*T, lowTop + .02, bandTop - lowTop - .02, .012);
  else box(sg, T, lowTop + .02, .012, cw - 2*T, bandTop - lowTop - .02, .014, k.mats.accentFlat);
  rbox(sg, cw*.28, lowTop + .027, D*.55, .24, .014, .17, .005, shared.wood());
  box(sg, cw*.28 - .05, lowTop + .034, D*.55 - .03, .035, .012, .06, k.mats.metal, {uv:false});
  const bx = cw*.6;
  for (let i = 0; i < 3; i++) {
    cylinder(sg, .006, .04, k.mats.metal, bx + i*.07, 1.2, .045, "z", 8);
    box(sg, bx + i*.07 - .012, 1.14 - (i % 2)*.02, .035, .024, .06, .005, k.mats.metal, {uv:false});
  }
  books(sg, cw*.72, lowTop + .02, .05, Math.min(.3, cw*.2));
  props.bowl(k, cw*.46, lowTop + .02, D*.5);
  // Отворена колона.
  const cg = group(k, cw);
  box(cg, 0, 0, 0, ow, h, .012, k.mats.carcass, {uv:false});
  box(cg, ow - T, k.legs ? .08 : 0, 0, T, h - (k.legs ? .08 : 0), D - .004, k.mats.mainFlat);
  box(cg, 0, h - T, 0, ow, T, D - .004, k.mats.carcass, {uv:false});
  if (k.legs) legs(k, cg, ow, D, .08);
  else box(cg, 0, 0, D - .08, ow, .078, .018, shared.shadowGap(), {uv:false});
  for (const y of [.08, .36]) {
    box(cg, 0, y, .012, ow - T, T, D - .03, k.mats.carcass, {uv:false});
    shoes(cg, .02, ow - T - .04, y + T, .35);
  }
  const hy = 1.55;
  cylinder(cg, .008, .07, k.mats.metal, ow/2 - T/2, hy, .06, "z", 10);
  hangingItem(k, cg, "coat", ow/2 - T/2, hy, "#8e857a");
  box(cg, 0, 1.85, .012, ow - T, .02, D - .03, k.mats.accentFlat);
  boxes(cg, .03, ow - T - .06, 1.87, Math.max(.14, Math.min(.3, h - 1.87 - .1)), .3);
  if (f.led) { ledStrip(k, sg, T + .02, bandTop - .008, D - .06, cw - 2*T - .04); glow(k, sg, .05, W - .05, D - .08); lamp(k, g, cw*.5, 1.25, .2, 1.4); }
  if (k.s.crown) crown(g, 0, W, h, D, k.mats.mainFlat);
  finish(k, W, D, H, {rugW:Math.min(2.4, W*.85), rugD:.6, rugZ:.55});
}

const BUILDERS = {entry, closetBench:entry, niche, shoeMirror, open, mirrorCloset, slim};
export function build(k, f, H) {
  return (BUILDERS[f.model] || entry)(k, f, H);
}
