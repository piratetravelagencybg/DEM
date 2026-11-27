// 3D модели: office. Всеки модел е отделна функция; build() избира според f.model.
import * as THREE from "three";
import {isWood} from "../catalog.js";
import {bookBays, lowUnit, pot} from "./tv.js";
import {frontMaterial, carcassMaterial, metalMaterial, topMaterial, shared, quality} from "../materials.js";
import {T, CLOTHES, BOOKS, seed, rnd, pick, metres, group, rbox, ledStrip, lamp, shell, legs, tallTop, interior, rail, geoCache, cachedGeo, silhouette, GARMENTS, garment, hanger, clothes, folded, boxes, SHOES, shoe, shoes, COAT_FRONT, hangingItem, books, slats, vanityTray, decor, slidingDoors, openRun, lowDrawers, tableLamp, shadeMat, lampShade, chair, softShadow, mesh, box, cylinder, front, glow, props, plinth, crown, CROWN_H} from "../parts.js";

// Домашен офис: бюро с чекмеджета, рафтове или шкафове над него, висок шкаф, стол.
function office(k, f, H) {
  const W = metres(f.width, 1.2, 4.5), g = group(k);
  const tallW = f.tall && W >= 1.6 ? .6 : 0;
  if (tallW) {
    const h = tallTop(k, H, Math.min(H - .004, 2.3)), D = .45, tg = group(k);
    shell(k, tg, tallW, h, D);
    if (k.s.crown) crown(tg, 0, tallW, h, D, k.mats.mainFlat);
    interior(k, tg, T, tallW - 2*T, h, D - T - .02, "shelves", false);
    front(k, tg, 0, .08, tallW, .78, k.mats.main, "doorL", {depth:D});
    for (let y = 1.0; y < h - .3; y += .38) books(tg, .05, y + .02, .1, tallW - .1);
    for (let y = .98; y < h - .3; y += .38) box(tg, T, y, .015, tallW - 2*T, .02, D - .05, k.mats.carcass, {uv:false});
  }
  const dx = tallW ? tallW + .04 : 0, dw = W - dx, dd = .65, dy = .75;
  const dg = group(k, dx);
  box(dg, 0, dy - .03, 0, dw, .03, dd, k.mats.accentFlat);
  box(dg, .02, 0, .05, .03, dy - .03, dd - .1, k.mats.accentFlat);
  const uw = Math.min(.45, dw*.3);
  box(dg, dw - uw, 0, .02, uw, dy - .04, dd - .1 - T, k.mats.mainFlat);
  for (let r = 0; r < 3; r++) front(k, dg, dw - uw, r*(dy - .04)/3, uw, (dy - .04)/3, k.mats.main, "drawer", {depth:dd - .08});
  // Монитор, клавиатура, лампа.
  const mx = (dw - uw)/2 + .1;
  box(dg, mx - .12, dy, .12, .24, .012, .18, shared.darkMetal(), {uv:false});
  box(dg, mx - .02, dy, .16, .04, .26, .02, shared.darkMetal(), {uv:false});
  box(dg, mx - .33, dy + .12, .17, .66, .39, .02, shared.darkMetal(), {uv:false});
  box(dg, mx - .325, dy + .125, .191, .65, .38, .002, shared.screen(), {uv:false});
  rbox(dg, mx, dy + .008, .42, .44, .014, .14, .004, shared.fabric("#e7e3dc"));
  tableLamp(k, dg, dw - uw/2, dy, .2);
  // Над бюрото.
  if (f.upper === "open") {
    for (const [i, y] of [1.25, 1.6, 1.95].entries()) {
      box(dg, .1, y, 0, dw - .2, .03, .28, k.mats.accentFlat);
      books(dg, .2 + i*.3, y + .03, .06, Math.min(.5, dw*.3));
      if (i === 1) props.vase(k, dx + dw - .35, y + .03, .14);
    }
    if (f.led) ledStrip(k, dg, .15, 1.245, .2, dw - .3);
  } else {
    const n = Math.max(1, Math.round(dw/.6));
    box(dg, 0, 1.4, 0, dw, .7, .35 - T - .002, k.mats.mainFlat);
    for (let i = 0; i < n; i++) front(k, dg, i*dw/n, 1.4, dw/n, .7, k.mats.main, i % 2 ? "doorR" : "doorL", {depth:.35, zone:"upper"});
    if (f.led) ledStrip(k, dg, .04, 1.394, .25, dw - .08);
  }
  if (f.led) lamp(k, dg, dw/2, 1.2, .4, 1.5);
  chair(k, dx + mx, .95);
  softShadow(k.root, W/2, .0015, .5, W + .3, 1.2, .25);
  k.size = {A:W, depth:1.5, H};
}
// ---------- Нови модели ----------
const noShadow = m => { m.castShadow = false; return m; };

// Монитор, клавиатура и подложка върху бюро. dy = повърхност на бюрото, z0 = задният ръб на плота.
function workset(k, g, mx, dy, z0 = 0) {
  box(g, mx - .12, dy, z0 + .12, .24, .012, .18, shared.darkMetal(), {uv:false});
  box(g, mx - .02, dy, z0 + .16, .04, .26, .02, shared.darkMetal(), {uv:false});
  box(g, mx - .33, dy + .12, z0 + .17, .66, .39, .02, shared.darkMetal(), {uv:false});
  box(g, mx - .325, dy + .125, z0 + .191, .65, .38, .002, shared.screen(), {uv:false});
  rbox(g, mx, dy + .008, z0 + .42, .44, .014, .14, .004, shared.fabric("#e7e3dc"));
}

function deskTop(k, g, x, y, w, d, t = .03) { return box(g, x, y, 0, w, t, d, k.mats.accentFlat); }

// Висок шкаф с врати (долна и горна).
function tallDoor(k, x, w, h, d, hinge, o = {}) {
  const tg = group(k, x, 0);
  shell(k, tg, w, h, d);
  if (k.s.crown && !o.noCrown) crown(tg, 0, w, h, d, k.mats.mainFlat);
  const split = Math.min(1.3, h*.58);
  front(k, tg, 0, .08, w, split - .08, k.mats.main, hinge, {depth:d, zone:"tall"});
  front(k, tg, 0, split, w, h - .004 - split, k.mats.main, hinge, {depth:d, zone:"upper"});
  return tg;
}

function shadowAndSize(k, W, H, depth = 1.5) {
  softShadow(k.root, W/2, .0015, .5, W + .3, 1.2, .25);
  k.size = {A:W, depth, H};
}

function rugOffice(k, cx, w, z = 1.0, color = "#d4ccbd") {
  rbox(decor(k), cx, .006, z, w, .012, 1.6, .005, shared.fabric(color));
}

// Бюро в библиотека: стена от рафтове с вградено бюро в средата.
function libraryDesk(k, f, H) {
  const W = metres(f.width, 1.2, 4.5), g = group(k);
  const h = tallTop(k, H, H - .004), d = .35;
  const deskW = Math.min(1.4, Math.max(.8, W*.5)), sideW = (W - deskW)/2, sx = sideW;
  box(g, 0, 0, 0, W, h, .012, k.mats.carcass, {uv:false});
  if (k.s.crown) crown(g, 0, W, h, d, k.mats.mainFlat);
  // Страни: долни шкафове и рафтове до тавана.
  for (const x of [0, sx + deskW]) {
    lowUnit(k, g, x, sideW, .7, .4, {kind:"door", cell:.5});
    bookBays(k, g, x, sideW, .7, h, d, {col:.65});
  }
  // Бюро.
  deskTop(k, g, sx, .72, deskW, .6);
  box(g, sx + .02, 0, .1, .03, .72, .45, k.mats.accentFlat);
  box(g, sx + deskW - .05, 0, .1, .03, .72, .45, k.mats.accentFlat);
  box(g, sx + .05, .38, .53, deskW - .1, .34, .018, k.mats.accentFlat);
  // Рафтове над бюрото.
  box(g, sx, .75, .012, deskW, .45, .012, k.mats.accentFlat);
  box(g, sx, .75, 0, T, h - .75, d, k.mats.mainFlat);
  box(g, sx + deskW - T, .75, 0, T, h - .75, d, k.mats.mainFlat);
  bookBays(k, g, sx + T, deskW - 2*T, 1.2, h, d, {base:true, ledRows:f.led ? [0] : [], col:.8});
  const mx = sx + deskW/2;
  workset(k, g, mx, .75, .0);
  tableLamp(k, g, sx + deskW - .16, .75, .22);
  if (deskW > 1.1) props.bowl(k, sx + .22, .75, .22);
  if (f.led) lamp(k, g, mx, 1.15, .4, 1.5);
  chair(k, mx, .95);
  rugOffice(k, W/2, Math.min(W, 2.4), .95);
  shadowAndSize(k, W, H);
}

// Ъглово бюро: Г-образен плот, шкафове отгоре.
function cornerDesk(k, f, H) {
  const W = metres(f.width, 1.2, 4.5), g = group(k);
  k.roomShape = "L"; k.roomB = 2.0;
  const dd = .6, dy = .72, side = 1.4;
  deskTop(k, g, 0, dy, W, dd);
  box(g, 0, dy, dd, dd, .03, side - dd, k.mats.accentFlat);
  // Чекмеджета под десния край.
  const uw = Math.min(.5, W*.3);
  box(g, W - uw, 0, .02, uw, dy - .01, dd - .1 - T, k.mats.mainFlat);
  for (let r = 0; r < 3; r++) front(k, g, W - uw, r*(dy - .01)/3, uw, (dy - .01)/3, k.mats.main, "drawer", {depth:dd - .08});
  // Панел по средата на дългата страна и крачета/панели при ъгъла.
  box(g, dd - .05, 0, dd, .03, dy, side - dd - .05, k.mats.accentFlat);
  box(g, .02, 0, side - .05, dd - .06, dy, .03, k.mats.accentFlat);
  if (W - uw > 1.5) box(g, W - uw - .05, 0, .05, .03, dy, dd - .1, k.mats.accentFlat);
  // Монитор.
  const mx = Math.max(.95, (W - uw)/2 + .15);
  workset(k, g, Math.min(mx, W - uw - .35), dy + .03 - .0, 0);
  // Горни шкафове над дългата стена.
  const cw = Math.max(.6, W - .05), n = Math.max(1, Math.round(cw/.6));
  box(g, 0, 1.5, 0, W, .6, .35 - T - .002, k.mats.mainFlat);
  for (let i = 0; i < n; i++) front(k, g, i*W/n, 1.5, W/n, .6, k.mats.main, i % 2 ? "doorR" : "doorL", {depth:.35, zone:"upper"});
  // Рафт на страничната стена.
  box(g, 0, 1.5, .4, .25, .03, .95, k.mats.accentFlat);
  pot(g, .12, 1.53, .75, .9);
  if (f.led) { ledStrip(k, g, .04, 1.494, .25, W - .08); lamp(k, g, W/2, 1.3, .4, 1.5); }
  tableLamp(k, g, .3, dy + .03, 1.1);
  books(g, W - uw + .05, dy + .03, .1, Math.min(.35, uw - .08));
  chair(k, Math.max(.95, Math.min(mx, W - uw - .35)), .98);
  rugOffice(k, W/2 + .2, Math.min(W, 2.2), 1.1);
  softShadow(k.root, W/2, .0015, .6, W + .3, 1.4, .25);
  k.size = {A:W, depth:1.5, H};
}

// Бюро между колони: два високи шкафа, бюро и мост над него.
function bridgeDesk(k, f, H) {
  const W = metres(f.width, 1.2, 4.5), g = group(k);
  const tw = Math.min(.5, Math.max(.3, (W - 1.0)/2)), mid = W - 2*tw, d = .45;
  const h = tallTop(k, H, H - .004);
  tallDoor(k, 0, tw, h, d, "doorL");
  tallDoor(k, W - tw, tw, h, d, "doorR");
  deskTop(k, g, tw, .72, mid, .6);
  // Чекмеджета (2) под бюрото, отдясно; отляво – панел.
  const uw = Math.min(.45, mid*.4);
  box(g, W - tw - uw, 0, .02, uw, .72, .56 - T, k.mats.mainFlat);
  for (let r = 0; r < 2; r++) front(k, g, W - tw - uw, r*.36, uw, .36, k.mats.main, "drawer", {depth:.58});
  box(g, tw + .01, 0, .12, .03, .72, .45, k.mats.accentFlat);
  // Мост над бюрото.
  const by = 1.65, bh = Math.min(.4, h - by - .1);
  box(g, tw, by, 0, mid, bh, .35 - T - .002, k.mats.mainFlat);
  const n = Math.max(1, Math.round(mid/.7));
  for (let i = 0; i < n; i++) front(k, g, tw + i*mid/n, by, mid/n, bh, k.mats.main, "drawer", {slide:false, lift:true, depth:.35, zone:"upper"});
  if (f.led) { ledStrip(k, g, tw + .03, by - .008, .22, mid - .06); lamp(k, g, W/2, 1.45, .35, 1.5); }
  // Панел на стената над бюрото.
  if (isWood(k.s.fAccent)) slats(k, g, tw, mid, .75, by - .75, 0);
  else box(g, tw, .75, 0, mid, by - .75, .02, k.mats.accentFlat);
  const mx = tw + (mid - uw)/2 + (uw < mid*.4 ? 0 : .0);
  workset(k, g, mx, .75, .02);
  tableLamp(k, g, W - tw - .2, .75, .22);
  books(g, tw + .08, .75, .08, Math.min(.3, mid*.18));
  chair(k, mx, .95);
  rugOffice(k, W/2, Math.min(W - .3, 2.2), .95);
  shadowAndSize(k, W, H);
}

// Висящо бюро: дълъг плот на стената без крака, 2 чекмеджета, рафт и пано.
function floatingDesk(k, f, H) {
  const W = metres(f.width, 1.2, 4.5), g = group(k);
  const dw = W*.9, x = (W - dw)/2, d = .5, topY = .705;
  box(g, x, topY, 0, dw, .045, d, k.mats.accentFlat);
  // Два интегрирани чекмеджета отдясно.
  const cw = Math.min(.45, dw*.2), ux = x + dw - 2*cw - .04;
  box(g, ux, .55, 0, 2*cw, .155, d - .06 - T, k.mats.mainFlat);
  for (let i = 0; i < 2; i++) front(k, g, ux + i*cw, .55, cw, .155, k.mats.main, "drawer", {depth:d - .06});
  // Метални конзоли.
  for (const bx of [x + .15, x + dw*.5, x + dw - .2]) box(g, bx, topY - .03, .02, .02, .03, d - .1, shared.darkMetal(), {uv:false});
  // Пано (акцент) със стенни предмети.
  const px = x + .1, pw = Math.min(1.4, dw*.5), py = .98, ph = .5;
  box(g, px, py, 0, pw, ph, .018, k.mats.accentFlat);
  for (let gx = px + .06; gx < px + pw - .04; gx += .06) for (let gy = py + .06; gy < py + ph - .04; gy += .06) if ((Math.round(gx*100) + Math.round(gy*100)) % 12 === 0) cylinder(g, .004, .004, shared.darkMetal(), gx, gy, .02, "z", 6);
  box(g, px + .1, py + .26, .018, .3, .02, .09, k.mats.mainFlat);
  pot(g, px + .2, py + .28, .06, .6);
  box(g, px + pw*.55, py + .2, .018, .25, .3, .008, shared.paper("#f4f0e8"), {uv:false});
  box(g, px + pw*.55 + .02, py + .22, .026, .21, .26, .004, shared.paper("#b9c4b2"), {uv:false});
  cylinder(g, .03, .09, shared.ceramic(), px + pw - .12, py + .05, .06, "y", 14);
  // Дълъг рафт над пано.
  const sy = 1.65, sl = dw*.8, sxp = x + (dw - sl)/2;
  box(g, sxp, sy, 0, sl, .035, .24, k.mats.accentFlat);
  books(g, sxp + .1, sy + .035, .06, Math.min(.8, sl*.3));
  pot(g, sxp + sl*.58, sy + .035, .12, 1.1);
  books(g, sxp + sl*.7, sy + .035, .06, Math.min(.5, sl*.2));
  if (f.led) { ledStrip(k, g, sxp + .03, sy - .008, .15, sl - .06); lamp(k, g, x + dw*.4, 1.5, .35, 1.5); }
  const mx = x + (dw - 2*cw)*.5;
  workset(k, g, Math.max(x + .5, mx), topY + .045, .0);
  tableLamp(k, g, x + dw - .2, topY + .045, .2);
  chair(k, Math.max(x + .5, mx), .85);
  rugOffice(k, W/2, Math.min(W - .2, 2.0), .9, "#cfc7b8");
  softShadow(k.root, W/2, .0015, .55, W*.9, .9, .18);
  k.size = {A:W, depth:1.4, H};
}

const BUILDERS = {office, shelves:office, cabinets:office, library:libraryDesk, corner:cornerDesk, bridge:bridgeDesk, floating:floatingDesk};
export function build(k, f, H) {
  return (BUILDERS[f.model] || office)(k, f, H);
}
