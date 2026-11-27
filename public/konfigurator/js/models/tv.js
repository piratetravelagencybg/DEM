// 3D модели: tv. Всеки модел е отделна функция; build() избира според f.model.
import * as THREE from "three";
import {isWood} from "../catalog.js";
import {frontMaterial, carcassMaterial, metalMaterial, topMaterial, shared, quality} from "../materials.js";
import {T, CLOTHES, BOOKS, seed, rnd, pick, metres, group, rbox, ledStrip, lamp, shell, legs, tallTop, interior, rail, geoCache, cachedGeo, silhouette, GARMENTS, garment, hanger, clothes, folded, boxes, SHOES, shoe, shoes, COAT_FRONT, hangingItem, books, slats, vanityTray, decor, slidingDoors, openRun, lowDrawers, tableLamp, shadeMat, lampShade, chair, softShadow, mesh, box, cylinder, front, glow, props, plinth, crown, CROWN_H} from "../parts.js";

// ТВ стена: висящ шкаф, панел зад телевизора, рафтове или висок шкаф отстрани.
function tv(k, f, H) {
  const W = metres(f.width, 1.6, 5.5), g = group(k);
  const sideW = f.side === "none" ? 0 : Math.min(.9, W*.26);
  const cw = W - sideW - (sideW ? .08 : 0), cx = cw/2;
  const ph = Math.min(H - .02, 2.6);
  if (f.panel === "slats") slats(k, g, 0, cw, 0, ph);
  else if (f.panel === "stone") {
    const sw = Math.min(cw*.6, 2.4);
    box(g, cx - sw/2, 0, 0, sw, ph, .03, topMaterial(k.s.top));
  }
  const z0 = f.panel === "none" ? 0 : .035, cy = .24, ch = .42, cd = .42;
  const cab = group(k, 0, z0);
  box(cab, 0, cy, 0, cw, ch, cd - T - .002, k.mats.mainFlat);
  const n = Math.max(2, Math.round(cw/.6));
  for (let i = 0; i < n; i++) front(k, cab, i*cw/n, cy, cw/n, ch, k.mats.main, "drawer", {depth:cd});
  box(cab, -.005, cy + ch, -.005, cw + .01, .02, cd + .01, k.mats.accentFlat);
  if (f.led) glow(k, cab, .05, cw - .05, cd - .25);
  // Телевизор.
  const tw = Math.min(1.65, cw*.82), th = tw*.5625, ty = cy + ch + .36;
  box(g, cx - tw/2, ty, z0 + .03, tw, th, .028, shared.darkMetal(), {uv:false});
  box(g, cx - tw/2 + .006, ty + .006, z0 + .059, tw - .012, th - .012, .002, shared.screen(), {uv:false});
  if (f.led) { ledStrip(k, g, cx - tw/2 + .05, ty + th - .02, z0 + .02, tw - .1); lamp(k, g, cx, ty + th*.6, z0 + .15, 1.5); }
  props.vase(k, cw*.78, cy + ch + .02, z0 + cd/2);
  books(cab, cw*.14, cy + ch + .02, .1, .28);
  // Отстрани.
  if (sideW) {
    const sx = W - sideW, sg = group(k, sx);
    if (f.side === "shelves") {
      for (const [i, y] of [1.0, 1.38, 1.76, 2.14].entries()) {
        if (y > ph - .1) continue;
        box(sg, 0, y, 0, sideW, .035, .26, k.mats.accentFlat);
        if (i % 2 === 0) books(sg, .05, y + .035, .05, sideW*.55);
        else props.vase(k, sx + sideW*.6, y + .035, .13);
      }
      box(sg, 0, cy, 0, sideW, ch, .4 - T - .002, k.mats.mainFlat);
      front(k, sg, 0, cy, sideW, ch, k.mats.main, "doorL", {depth:.4});
    } else {
      const th2 = Math.min(H - .004, 2.3);
      box(sg, 0, 0, 0, sideW, th2, .42 - T - .002, k.mats.mainFlat);
      front(k, sg, 0, .06, sideW, th2*.45, k.mats.main, "doorL", {depth:.42});
      front(k, sg, 0, .06 + th2*.45, sideW, th2 - .06 - th2*.45, k.mats.main, "doorL", {depth:.42, zone:"wardrobe"});
    }
  }
  k.size = {A:W, depth:.6, H};
}

// ---------- Общи помощници за ТВ моделите ----------
const noShadow = m => { m.castShadow = false; return m; };
const tvH = w => w*.5625;

// Тънък черен телевизор с лице на екрана.
function screenAt(g, cx, y, w, z = .03) {
  const h = tvH(w);
  box(g, cx - w/2, y, z, w, h, .028, shared.darkMetal(), {uv:false});
  box(g, cx - w/2 + .006, y + .006, z + .0275, w - .012, h - .012, .002, shared.screen(), {uv:false});
  return h;
}

// Ниска ваза/кашпа за рафт (без високи стъбла).
export function pot(g, x, y, z, s = 1) {
  cylinder(g, .045*s, .17*s, shared.ceramic(), x, y + .085*s, z, "y", 20);
  cylinder(g, .022*s, .06*s, shared.ceramic(), x, y + .2*s, z, "y", 16);
  const leaf = mesh(g, cachedGeo("potLeaf", () => new THREE.SphereGeometry(1, 10, 6)), shared.fabric("#6f8a5a"), x, y + .3*s, z);
  leaf.scale.set(.07*s, .08*s, .07*s);
}

// Ниско тяло с чекмеджета/врати: на крачета/цокъл или висящо.
export function lowUnit(k, g, x, w, h, d, o = {}) {
  const yb = o.float ? .15 : .1, fh = h - yb - .02;
  box(g, x, yb, 0, w, fh, d - T - .002, k.mats.mainFlat);
  const n = Math.max(1, Math.round(w/(o.cell || .6))), cw = w/n;
  const rows = fh > .38 ? 2 : 1;
  for (let i = 0; i < n; i++) {
    const isDoor = o.kind === "door" || (o.kind === "mixed" && n >= 3 && (i === 0 || i === n - 1));
    if (isDoor) front(k, g, x + i*cw, yb, cw, fh, k.mats.main, i < n/2 ? "doorL" : "doorR", {depth:d});
    else for (let r = 0; r < rows; r++) front(k, g, x + i*cw, yb + r*fh/rows, cw, fh/rows, k.mats.main, "drawer", {depth:d});
  }
  box(g, x - .004, yb + fh, 0, w + .008, .02, d + .006, k.mats.accentFlat);
  if (o.float) {
    if (o.led) { ledStrip(k, g, x + .04, yb - .008, d - .1, w - .08); glow(k, g, x + .05, x + w - .05, d - .25); }
  } else plinth(k, g, x, w, d);
}

// Висок шкаф: долна врата и (по желание) стъклена витрина горе с книги и LED.
function tallCab(k, x, w, h, d, hinge, led, o = {}) {
  const tg = group(k, x, 0);
  shell(k, tg, w, h, d);
  if (k.s.crown && !o.noCrown) crown(tg, 0, w, h, d, k.mats.mainFlat);
  if (o.glass) {
    const gy = Math.max(1.0, h*.68), gh = h - T - gy, m = k.mats.metal;
    front(k, tg, 0, .08, w, gy - .08, k.mats.main, hinge, {depth:d, zone:"wardrobe"});
    box(tg, T, gy - .009, .012, w - 2*T, .018, d - .03, k.mats.carcass, {uv:false});
    box(tg, T, gy + gh/2, .012, w - 2*T, .018, d - .03, k.mats.carcass, {uv:false});
    books(tg, T + .03, gy + .009, .07, w - .12);
    books(tg, T + .03, gy + gh/2 + .018, .07, w - .12);
    noShadow(box(tg, .004, gy, d - .014, w - .008, gh, .006, shared.glass(), {uv:false}));
    for (const [fx, fy, fw, fh] of [[.004, gy, w - .008, .014], [.004, h - T - .014, w - .008, .014], [.004, gy, .014, gh], [w - .018, gy, .014, gh]]) box(tg, fx, fy, d - .016, fw, fh, .01, m, {uv:false});
    if (led) ledStrip(k, tg, T + .02, h - T - .008, d - .12, w - 2*T - .04);
  } else {
    const split = Math.min(1.3, h*.58);
    front(k, tg, 0, .08, w, split - .08, k.mats.main, hinge, {depth:d, zone:"tall"});
    front(k, tg, 0, split, w, h - .004 - split, k.mats.main, hinge, {depth:d, zone:"upper"});
  }
  return tg;
}

// Килим в зоната за сядане (украса, не влиза в рамката).
function rug(k, cx, w, dd, color = "#d8d0c2", z = 1.35) {
  rbox(decor(k), cx, .006, z, w, .012, dd, .005, shared.fabric(color));
}

// Книжни секции: колони с рафтове и книги/вази. Ползва се и от офиса.
export function bookBays(k, g, x0, w, y0, y1, d, o = {}) {
  const ncol = Math.max(1, Math.round(w/(o.col || .7))), cw = w/ncol;
  const rows = Math.max(1, Math.round((y1 - y0)/(o.step || .35))), step = (y1 - y0)/rows;
  const boardMat = o.boardMat || k.mats.accentFlat;
  for (let i = 0; i <= ncol; i++) box(g, Math.min(x0 + w - T, x0 + i*cw), y0, .012, T, y1 - y0, d - .012, k.mats.mainFlat);
  const ledRows = o.ledRows || [];
  for (let j = o.base ? 0 : 1; j <= rows; j++) {
    const by = y0 + j*step - (j === rows ? T : 0);
    box(g, x0, by, .012, w, T, d - .012, boardMat);
    if (ledRows.includes(j)) for (let i = 0; i < ncol; i++) ledStrip(k, g, x0 + i*cw + T + .02, by - .008, .2, cw - 2*T - .04);
  }
  for (let j = 0; j < rows; j++) {
    const top = y0 + j*step + (j || o.base ? T : 0);
    for (let i = 0; i < ncol; i++) {
      const cx = x0 + i*cw + T, aw = cw - T, r = rnd();
      if (r < .42) books(g, cx + .02, top, .06, aw - .06);
      else if (r < .72) { books(g, cx + .02, top, .06, aw*.5); pot(g, cx + aw*.78, top, .13, .72); }
      else if (r < .88) { books(g, cx + aw*.5, top, .06, aw*.42); rbox(g, cx + aw*.25, top + .04, .16, .26, .05, .2, .008, shared.linen(pick(CLOTHES))); }
      else pot(g, cx + aw*.5, top, .13, .75);
    }
  }
}

// ---------- Модели ----------

// С високи шкафове: две колони по краищата, ниско тяло и дълъг рафт над телевизора.
function towers(k, f, H) {
  const W = metres(f.width, 1.6, 5.5), g = group(k);
  const tw = Math.min(.6, Math.max(.4, W*.15)), d = .45, mid = W - 2*tw;
  const h = tallTop(k, H, Math.min(H - .004, 2.2));
  tallCab(k, 0, tw, h, d, "doorL", f.led, {glass:true});
  tallCab(k, W - tw, tw, h, d, "doorR", f.led, {glass:true});
  const float = !k.legs && !k.s.crown;
  lowUnit(k, g, tw + .004, mid - .008, .5, .42, {float, kind:"mixed", led:f.led});
  box(g, tw, .5, 0, mid, 1.3, .02, k.mats.accentFlat);
  screenAt(g, W/2, .5 + .13, Math.min(1.45, mid*.82), .03);
  box(g, tw, 1.8, 0, mid, .04, .3, k.mats.accentFlat);
  if (f.led) ledStrip(k, g, tw + .03, 1.792, .2, mid - .06);
  books(g, tw + .15, 1.84, .06, Math.min(.6, mid*.25));
  books(g, W - tw - .15 - Math.min(.5, mid*.2), 1.84, .06, Math.min(.5, mid*.2));
  pot(g, W/2, 1.84, .15, 1.1);
  if (mid > 1.4) props.vase(k, tw + .22, .52, .2);
  if (mid > 1.6) props.bowl(k, W - tw - .3, .52, .2);
  if (f.led) lamp(k, g, W/2, 1.7, .35, 1.6);
  rug(k, W/2, Math.min(W - .4, 2.8), 1.8);
  softShadow(k.root, W/2, .0015, .4, W + .2, .9, .25);
  k.size = {A:W, depth:.6, H};
}

// Стена от шкафове: колони отстрани, мост над нишата, чекмеджета под нея.
function wall(k, f, H) {
  const W = metres(f.width, 1.6, 5.5), g = group(k);
  const sw = Math.min(.6, Math.max(.45, W*.16)), d = .45, mid = W - 2*sw;
  const h = tallTop(k, H, H - .004);
  tallCab(k, 0, sw, h, d, "doorL", false, {noCrown:true});
  tallCab(k, W - sw, sw, h, d, "doorR", false, {noCrown:true});
  if (k.s.crown) crown(g, 0, W, h, d, k.mats.mainFlat);
  const by = Math.min(1.75, h - .5), lowH = .45;
  box(g, sw, by, 0, mid, h - by, .38 - T - .002, k.mats.mainFlat);
  const n = Math.max(1, Math.round(mid/.75));
  for (let i = 0; i < n; i++) front(k, g, sw + i*mid/n, by, mid/n, h - by, k.mats.main, "drawer", {slide:false, lift:true, depth:.38, zone:"upper"});
  lowUnit(k, g, sw + .004, mid - .008, lowH, .42, {kind:"drawer", float:!k.legs && !k.s.crown, led:f.led, cell:.75});
  const wood = isWood(k.s.fAccent);
  if (wood) slats(k, g, sw, mid, lowH, by - lowH, 0);
  else box(g, sw, lowH, 0, mid, by - lowH, .02, k.mats.accentFlat);
  const sc = Math.min(1.45, mid*.82), sh = tvH(sc);
  screenAt(g, W/2, lowH + (by - lowH - sh)/2, sc, wood ? .05 : .035);
  if (f.led) {
    ledStrip(k, g, sw + .03, by - .008, .25, mid - .06);
    for (const lx of [sw + .012, W - sw - .02]) k.leds.push(box(g, lx, lowH + .02, .035, .008, by - lowH - .05, .012, shared.led(), {uv:false}));
    lamp(k, g, W/2, 1.3, .3, 1.5);
  }
  props.vase(k, sw + .3, lowH + .02, .2);
  books(g, W - sw - .6, lowH + .02, .1, .35);
  rug(k, W/2, Math.min(W - .5, 2.6), 1.7, "#cdc5b6");
  softShadow(k.root, W/2, .0015, .4, W + .2, .9, .25);
  k.size = {A:W, depth:.6, H};
}

function openBox(k, g, x, y, w, h, d) {
  const m = k.mats.accentFlat;
  box(g, x, y, 0, w, T, d, m); box(g, x, y + h - T, 0, w, T, d, m);
  box(g, x, y, 0, T, h, d, m); box(g, x + w - T, y, 0, T, h, d, m);
  box(g, x + T, y + T, 0, w - 2*T, h - 2*T, .01, k.mats.carcass, {uv:false});
}

// Асиметрична: дълъг нисък шкаф, висока колона вдясно и кутии на стената.
function asym(k, f, H) {
  const W = metres(f.width, 1.6, 5.5), g = group(k);
  const tw = .45, d = .42, lw = Math.min(W*.75, W - tw - .1);
  lowUnit(k, g, 0, lw, .4, d, {float:true, kind:"drawer", led:f.led, cell:.7});
  const sc = Math.min(1.45, lw*.62);
  screenAt(g, lw/2, .4 + .35, sc, .03);
  const h = tallTop(k, H, Math.min(H - .004, 2.0)), tg = group(k, W - tw, 0), split = 1.05;
  shell(k, tg, tw, h, d);
  if (k.s.crown) crown(tg, 0, tw, h, d, k.mats.mainFlat);
  front(k, tg, 0, .08, tw, split - .08, k.mats.main, "doorL", {depth:d, zone:"tall"});
  [split, split + (h - split)/3, split + 2*(h - split)/3].forEach((y, i) => {
    box(tg, T, y, .012, tw - 2*T, T, d - .03, k.mats.accentFlat);
    if (i === 0) books(tg, T + .03, y + T, .08, tw - .1);
    else if (i === 1) pot(tg, tw/2, y + T, .18, .7);
    else { books(tg, T + .03, y + T, .08, tw*.5); pot(tg, tw*.78, y + T, .18, .6); }
  });
  if (f.led) ledStrip(k, tg, T + .02, h - T - .008, d - .14, tw - 2*T - .04);
  const space = lw/2 - sc/2 - .12;
  if (space > .28) {
    const bw = Math.min(.55, space - .05), bh = .3, bd = .25;
    [[.06, 1.0], [.02 + Math.min(.1, space - bw - .06), 1.42], [.06, 1.84]].forEach(([bx, by], i) => {
      if (by + bh > H - .15) return;
      openBox(k, g, bx, by, bw, bh, bd);
      if (i === 0) books(g, bx + T + .02, by + T, .05, bw - .1);
      else if (i === 1) pot(g, bx + bw/2, by + T, .12, .85);
      else props.bowl(k, bx + bw/2, by + T, .12);
    });
  }
  if (f.led) lamp(k, g, lw/2, 1.3, .3, 1.5);
  rug(k, lw/2 + .2, Math.min(W - .3, 2.6), 1.6, "#d3cbbd");
  softShadow(k.root, W/2, .0015, .4, W + .2, .9, .25);
  k.size = {A:W, depth:.6, H};
}

const FLAME = new THREE.MeshBasicMaterial({color:"#ff8a1f"});
const FLAME2 = new THREE.MeshBasicMaterial({color:"#ffd25a"});
const LOG = new THREE.MeshStandardMaterial({color:"#3a2a20", roughness:.9});

// С камина: каменен панел, камина под телевизора, шкафове и рафтове отстрани.
function fireplace(k, f, H) {
  const W = metres(f.width, 1.6, 5.5), g = group(k), stone = topMaterial(k.s.top);
  const sw = Math.min(2.0, Math.max(1.0, W*.55)), sx = (W - sw)/2, ph = Math.min(H - .01, 2.4), P = .06;
  const fw = Math.min(1.0, sw*.7), fx = W/2 - fw/2, fy = .3, fh = .38;
  box(g, sx, 0, 0, sw, fy, P, stone);
  box(g, sx, fy + fh, 0, sw, ph - fy - fh, P, stone);
  box(g, sx, fy, 0, fx - sx, fh, P, stone);
  box(g, fx + fw, fy, 0, sx + sw - fx - fw, fh, P, stone);
  box(g, fx, fy, 0, fw, fh, .012, shared.blackGlass(), {uv:false});
  const dm = shared.darkMetal();
  for (const [bx, by, bw, bh] of [[fx - .02, fy - .02, fw + .04, .02], [fx - .02, fy + fh, fw + .04, .02], [fx - .02, fy, .02, fh], [fx + fw, fy, .02, fh]]) box(g, bx, by, 0, bw, bh, P + .012, dm, {uv:false});
  for (let i = 0; i < 3; i++) cylinder(g, .026, fw*.7, LOG, W/2, fy + .04 + (i === 1 ? .045 : 0), .05 + (i - 1)*.012, "x", 10);
  box(g, fx + .1, fy + .025, .03, fw - .2, .03, .02, FLAME, {uv:false});
  const nf = Math.max(4, Math.round(fw/.1));
  for (let i = 0; i < nf; i++) {
    const fl = .06 + rnd()*.1, bx = fx + .1 + i*(fw - .2)/nf + .01;
    const cone = mesh(g, cachedGeo("flameCone", () => new THREE.ConeGeometry(.5, 1, 6)), i % 2 ? FLAME2 : FLAME, bx + (fw - .2)/nf/2, fy + .06 + fl/2, .04);
    cone.scale.set((fw - .2)/nf*.9, fl*1.2, .02);
    cone.castShadow = false;
  }
  lamp(k, g, W/2, fy + .2, .22, 1.8);
  screenAt(g, W/2, fy + fh + .22, Math.min(1.45, sw*.72), P + .02);
  [0, sx + sw].forEach((x, i) => {
    const w = sx;
    if (w < .2) return;
    lowUnit(k, g, x, w, .5, .42, {kind:"door", cell:.55});
    [1.1, 1.55].forEach((y, j) => {
      if (y > H - .45) return;
      const bw = w - .08, bx = x + .04;
      box(g, bx, y, 0, bw, .035, .26, k.mats.accentFlat);
      if ((i + j) % 2) { books(g, bx + .03, y + .035, .05, bw*.55); pot(g, bx + bw*.82, y + .035, .12, .8); }
      else { pot(g, bx + bw*.25, y + .035, .12, 1); books(g, bx + bw*.42, y + .035, .05, bw*.5); }
    });
  });
  props.vase(k, Math.max(.2, sx*.5), .52, .2);
  rug(k, W/2, Math.min(W - .4, 2.4), 1.7, "#cfc5b4");
  softShadow(k.root, W/2, .0015, .4, W + .2, .9, .25);
  k.size = {A:W, depth:.6, H};
}

// Библиотека: рафтове от пода до тавана, долни шкафове и ниша за ТВ.
function library(k, f, H) {
  const W = metres(f.width, 1.6, 5.5), g = group(k);
  const h = tallTop(k, H, H - .004), d = .36;
  const nw = Math.min(1.7, W*.5), nx = (W - nw)/2, side = nx;
  const ny0 = .65, ny1 = 1.6, cabH = .6;
  box(g, 0, 0, 0, W, h, .012, k.mats.carcass, {uv:false});
  if (k.s.crown) crown(g, 0, W, h, d, k.mats.mainFlat);
  lowUnit(k, g, 0, W, cabH, .4, {kind:"door", cell:.55});
  if (side > .25) {
    bookBays(k, g, 0, side, cabH, h, d, {ledRows:f.led ? [2] : []});
    bookBays(k, g, nx + nw, side, cabH, h, d, {ledRows:f.led ? [2] : []});
  }
  box(g, nx, cabH + .02, .012, nw, ny1 - cabH - .02, .01, k.mats.accentFlat);
  box(g, nx, ny0 - .03, .012, nw, .03, d - .012, k.mats.accentFlat);
  box(g, nx, cabH, .012, T, h - cabH, d - .012, k.mats.mainFlat);
  box(g, nx + nw - T, cabH, .012, T, h - cabH, d - .012, k.mats.mainFlat);
  bookBays(k, g, nx, nw, ny1, h, d, {base:true, ledRows:f.led ? [0] : [], col:.85});
  const sc = Math.min(1.45, nw*.85), sh = tvH(sc);
  screenAt(g, W/2, ny0 + (ny1 - ny0 - sh)/2, sc, .04);
  if (f.led) lamp(k, g, W/2, 1.3, .35, 1.5);
  rug(k, W/2, Math.min(W - .4, 2.6), 1.7, "#d0c8b9");
  softShadow(k.root, W/2, .0015, .4, W + .2, .9, .25);
  k.size = {A:W, depth:.6, H};
}

const BUILDERS = {floating:tv, towers, wall, asym, fireplace, library};
export function build(k, f, H) {
  return (BUILDERS[f.model] || tv)(k, f, H);
}
