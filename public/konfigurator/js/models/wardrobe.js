// 3D модели: wardrobe. Всеки модел е отделна функция; build() избира според f.model.
import * as THREE from "three";
import {frontMaterial, carcassMaterial, metalMaterial, topMaterial, shared, quality} from "../materials.js";
import {T, CLOTHES, BOOKS, seed, rnd, pick, metres, group, rbox, ledStrip, lamp, shell, legs, tallTop, interior, rail, geoCache, cachedGeo, silhouette, GARMENTS, garment, hanger, clothes, folded, boxes, SHOES, shoe, shoes, COAT_FRONT, hangingItem, books, slats, vanityTray, decor, slidingDoors, openRun, lowDrawers, tableLamp, shadeMat, lampShade, chair, softShadow, mesh, box, cylinder, front, glow, props, plinth, crown, CROWN_H} from "../parts.js";

// Гардероб: врати на панти, плъзгащи се или с огледало; вътрешността се вижда с „Отвори“.
function wardrobe(k, f, H) {
  const W = metres(f.width, 1, 6), D = .62;
  const h = tallTop(k, H, f.ceiling ? H - .004 : Math.min(2.4, H - .05));
  const g = group(k);
  shell(k, g, W, h, D);
  if (k.s.crown) crown(g, 0, W, h, D, k.mats.mainFlat);
  const n = Math.max(2, Math.round(W/.55));
  const sw = (W - 2*T)/n;
  const kinds = n === 2 ? ["long", "shelves"] : ["long", "shelves", "double", "drawers", "shelves"];
  for (let i = 0; i < n; i++) {
    const x = T + i*sw;
    if (i) box(g, x - .009, .08 + T, .015, .018, h - .08 - 2*T, D - T - .04, k.mats.carcass, {uv:false});
    interior(k, g, x, sw, h, D - T - .02, kinds[i % kinds.length], f.led);
  }
  if (f.doors === "hinged") {
    for (let i = 0; i < n; i++) front(k, g, i*W/n, .08, W/n, h - .08, k.mats.main, i % 2 ? "doorR" : "doorL", {zone:"wardrobe", depth:D});
  } else slidingDoors(k, g, W, h, D, f.doors === "mirror");
  softShadow(k.root, W/2, .0015, D/2 + .08, W + .3, D + .4, .3);
  // Обстановка: килим и табуретка с одеяло – стаята не е празна.
  const d = decor(k);
  rbox(d, W/2, .006, D + 1.0, Math.min(2.6, W*.85), .012, 1.6, .005, shared.linen("#e4dccf"));
  rbox(d, W*.7, .2, D + .85, .46, .4, .46, .1, shared.boucle());
  rbox(d, W*.7, .41, D + .85, .3, .028, .38, .012, shared.linen(pick(["#cbbfad", "#9aa48f", "#8e857a"])));
  k.size = {A:W, depth:D + .1, H};
}

// ---- Общи помощници ----
let mirrorM = null;
const mirrorMat = () => mirrorM || (mirrorM = new THREE.MeshStandardMaterial({color:"#e9eff1", metalness:.35, roughness:.05}));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function staging(k, W, D) {
  const d = decor(k);
  rbox(d, W/2, .006, D + 1.0, Math.min(2.6, W*.85), .012, 1.6, .005, shared.linen("#e4dccf"));
  rbox(d, W*.7, .2, D + .85, .46, .4, .46, .1, shared.boucle());
  rbox(d, W*.7, .41, D + .85, .3, .028, .38, .012, shared.linen(pick(["#cbbfad", "#9aa48f", "#8e857a"])));
}

// Корпус с отделна дясна страна (за краен панел) и крачета/цокъл по стила.
function carcass(k, g, W, h, D, rightMat, base = .08) {
  const d = D - T - .002, y0 = k.legs ? base : 0;
  box(g, 0, y0, 0, W, h - y0, .012, k.mats.carcass, {uv:false});
  box(g, 0, y0, 0, T, h - y0, d, k.mats.mainFlat);
  box(g, W - T, y0, 0, T, h - y0, d, rightMat);
  box(g, T, h - T, 0, W - 2*T, T, d, k.mats.carcass, {uv:false});
  box(g, T, base, 0, W - 2*T, T, d, k.mats.carcass, {uv:false});
  if (k.legs) legs(k, g, W, D, base);
  else box(g, T, 0, D - .09, W - 2*T, base - .002, .018, shared.shadowGap(), {uv:false});
}

// Секции с вътрешност и врати на панти в група на x. Връща броя секции.
function hingedBlock(k, f, g, x, w, h, D, off = 0, hinge = "L") {
  const sg = group(k, x, 0);
  shell(k, sg, w, h, D);
  const n = Math.max(1, Math.round(w/.55)), sw = (w - 2*T)/n;
  const kinds = ["long", "shelves", "double", "drawers", "shelves"];
  for (let i = 0; i < n; i++) {
    const xi = T + i*sw;
    if (i) box(sg, xi - .009, .08 + T, .015, .018, h - .08 - 2*T, D - T - .04, k.mats.carcass, {uv:false});
    interior(k, sg, xi, sw, h, D - T - .02, kinds[(i + off) % kinds.length], f.led);
  }
  for (let i = 0; i < n; i++) front(k, sg, i*w/n, .08, w/n, h - .08, k.mats.main, n === 1 ? (hinge === "R" ? "doorR" : "doorL") : (i % 2 ? "doorR" : "doorL"), {zone:"wardrobe", depth:D});
  return sg;
}

// ---- Стъклени врати с LED ----
function glassDoor(k, g, hx, w, h, D, hingeLeft) {
  const pivot = new THREE.Group();
  pivot.position.set(hx, 0, D);
  g.add(pivot);
  const s = hingeLeft ? 1 : -1, y0 = .08, fw = .02, M = k.mats.metal;
  const px = a => hingeLeft ? a : -a - 0;      // локална x за ляв ръб a (при дясна панта се огледалят)
  const bar = (a, y, bw, bh, bz = .02, z = -.02) => box(pivot, hingeLeft ? a : -a - bw, y, z, bw, bh, bz, M, {uv:false});
  bar(0, y0, fw, h, .02); bar(w - fw, y0, fw, h, .02);
  bar(fw, y0, w - 2*fw, fw); bar(fw, y0 + h - fw, w - 2*fw, fw);
  box(pivot, hingeLeft ? fw : -w + fw, y0 + fw, -.013, w - 2*fw, h - 2*fw, .006, shared.bronzeGlass(), {uv:false});
  box(pivot, hingeLeft ? w - .06 : -w + .05, y0 + h*.42, 0, .012, .55, .018, M, {uv:false});
  k.openers.push({obj:pivot, type:"rotY", to:hingeLeft ? -1.75 : 1.75});
}

function glass(k, f, H) {
  const W = metres(f.width, 1, 6), D = .62;
  const h = tallTop(k, H, f.ceiling ? H - .004 : Math.min(2.4, H - .05));
  const g = group(k);
  shell(k, g, W, h, D);
  if (k.s.crown) crown(g, 0, W, h, D, k.mats.mainFlat);
  const n = Math.max(2, Math.round(W/.55)), sw = (W - 2*T)/n, dw = W/n;
  const kinds = ["long", "shelves", "double", "drawers", "shoes"];
  for (let i = 0; i < n; i++) {
    const x = T + i*sw;
    if (i) box(g, x - .009, .08 + T, .015, .018, h - .08 - 2*T, D - T - .04, k.mats.carcass, {uv:false});
    interior(k, g, x, sw, h, D - T - .02, kinds[i % kinds.length], f.led);
  }
  for (let i = 0; i < n; i++) glassDoor(k, g, i % 2 ? (i + 1)*dw - .002 : i*dw + .002, dw - .004, h - .08, D, i % 2 === 0);
  if (f.led) {
    for (let i = 0; i <= n; i++) {
      const x = clamp(i*dw, T + .004, W - T - .01) - .003;
      k.leds.push(box(g, x, .14, D - .075, .006, h - .3, .008, shared.led(), {uv:false}));
    }
    lamp(k, g, W*.3, h*.55, D*.55, 2.0);
    if (W > 2.4) lamp(k, g, W*.7, h*.55, D*.55, 2.0);
  }
  softShadow(k.root, W/2, .0015, D/2 + .08, W + .3, D + .4, .3);
  staging(k, W, D);
  k.size = {A:W, depth:D + .1, H};
}

// ---- С отворен край ----
function openEnd(k, f, H) {
  const W = metres(f.width, 1, 6), D = .62;
  const h = tallTop(k, H, f.ceiling ? H - .004 : Math.min(2.4, H - .05));
  const g = group(k);
  const ow = W < 1.5 ? Math.max(.3, W*.28) : clamp(W*.2, .45, .6), cw = W - ow;
  carcass(k, g, W, h, D, k.mats.accentFlat);
  if (k.s.crown) crown(g, 0, W, h, D, k.mats.mainFlat);
  const n = Math.max(1, Math.round(cw/.55)), sw = (cw - T)/n;
  const kinds = ["long", "shelves", "double", "drawers", "shelves"];
  for (let i = 0; i < n; i++) {
    const x = T + i*sw;
    if (i) box(g, x - .009, .08 + T, .015, .018, h - .08 - 2*T, D - T - .04, k.mats.carcass, {uv:false});
    interior(k, g, x, sw, h, D - T - .02, kinds[i % kinds.length], f.led);
  }
  for (let i = 0; i < n; i++) front(k, g, i*cw/n, .08, cw/n, h - .08, k.mats.main, i % 2 ? "doorR" : "doorL", {zone:"wardrobe", depth:D});
  // Отворена секция с рафтове, предмети и светлина.
  const ox = cw, ix = ox + T/2, iw = ow - T - T/2;
  box(g, ox - T/2, .08 + T, .012, T, h - .08 - 2*T, D - T - .02, k.mats.accentFlat);
  const top = Math.min(h - .3, 2.3), step = .37;
  let i = 0;
  for (let y = .45; y < top; y += step, i++) {
    box(g, ix, y, .012, iw, .022, D - T - .02, k.mats.accentFlat);
    if (f.led) ledStrip(k, g, ix + .03, y - .006, D - .12, iw - .06);
    const yy = y + .022, kind = i % 4;
    if (kind === 0) books(g, ix + .03, yy, .3, iw - .06);
    else if (kind === 1) { folded(g, ix, iw, yy, D - .05); }
    else if (kind === 2) {
      books(g, ix + .03, yy, .3, iw*.5);
      mesh(g, cachedGeo("oeVase", () => new THREE.CylinderGeometry(.03, .045, .2, 20)), shared.ceramic(), ix + iw*.78, yy + .1, .4);
    } else {
      rbox(g, ix + iw/2, yy + .045, .36, Math.min(.3, iw - .06), .09, .26, .02, shared.linen(pick(["#cbbfad", "#9aa48f", "#d9c4a6"])));
      mesh(g, cachedGeo("oeBowl", () => new THREE.CylinderGeometry(.06, .035, .05, 22)), shared.ceramic(), ix + iw/2, yy + .115, .36);
    }
  }
  if (f.led) lamp(k, g, ix + iw/2, 1.3, D - .15, 1.8);
  softShadow(k.root, W/2, .0015, D/2 + .08, W + .3, D + .4, .3);
  staging(k, W, D);
  k.size = {A:W, depth:D + .1, H};
}

// ---- С тоалетка ----
function vanity(k, f, H) {
  const W = metres(f.width, 1.2, 6), D = .62;
  const h = tallTop(k, H, f.ceiling ? H - .004 : Math.min(2.4, H - .05));
  const g = group(k);
  const nw = W < 2 ? clamp(W - .9, .5, .9) : clamp(W*.22, .9, 1.2), side = (W - nw)/2, mx = side;
  hingedBlock(k, f, g, 0, side, h, D, 0, "L");
  hingedBlock(k, f, g, W - side, side, h, D, 1, "R");
  if (k.s.crown) crown(g, 0, W, h, D, k.mats.mainFlat);
  // Ниша: гръб, горен шкаф, плот с чекмеджета, огледало с LED рамка.
  box(g, mx, 0, 0, nw, h, .012, k.mats.carcass, {uv:false});
  const cy = Math.min(1.6, h - .45);
  box(g, mx, cy, 0, nw, h - cy, .36 - T - .002, k.mats.mainFlat);
  for (let i = 0; i < 2; i++) front(k, g, mx + i*nw/2, cy, nw/2, h - cy, k.mats.main, i ? "doorR" : "doorL", {zone:"upper", depth:.36});
  box(g, mx, .5, 0, nw, .23, .45 - T - .002, k.mats.mainFlat);
  for (let i = 0; i < 2; i++) front(k, g, mx + i*nw/2, .5, nw/2, .23, k.mats.main, "drawer", {depth:.45});
  box(g, mx, .73, 0, nw, .02, .5, k.mats.accentFlat);
  const my = .86, mh = cy - .08 - my, mxi = mx + .06, mw = nw - .12;
  box(g, mxi, my, .012, mw, mh, .008, mirrorMat(), {uv:false});
  if (f.led) {
    const s = .012;
    k.leds.push(box(g, mxi - s, my - s, .014, mw + 2*s, s, .012, shared.led(), {uv:false}));
    k.leds.push(box(g, mxi - s, my + mh, .014, mw + 2*s, s, .012, shared.led(), {uv:false}));
    for (const ex of [mxi - s, mxi + mw]) k.leds.push(box(g, ex, my, .014, s, mh, .012, shared.led(), {uv:false}));
    lamp(k, g, mx + nw/2, my + mh/2, .25, 2.2);
  }
  tableLamp(k, g, mx + .14, .75, .2);
  vanityTray(k, mx + nw*.62, .75, .22);
  // Табуретка.
  const d = decor(k), sx = mx + nw/2, sz = D + .15;
  rbox(d, sx, .42, sz, .4, .08, .34, .04, shared.linen(pick(["#cbbfad", "#9aa48f", "#8e857a"])));
  for (const [dx, dz] of [[-.15, -.12], [.15, -.12], [-.15, .12], [.15, .12]]) cylinder(d, .012, .38, k.mats.metal, sx + dx, .19, sz + dz, "y", 10);
  softShadow(k.root, W/2, .0015, D/2 + .08, W + .3, D + .4, .3);
  rbox(d, W/2, .006, D + 1.0, Math.min(2.6, W*.85), .012, 1.6, .005, shared.linen("#e4dccf"));
  k.size = {A:W, depth:D + .1, H};
}

const BUILDERS = {hinged:wardrobe, sliding:wardrobe, mirror:wardrobe, glass, openEnd, vanity};
export function build(k, f, H) {
  return (BUILDERS[f.model] || wardrobe)(k, f, H);
}
