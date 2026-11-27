// 3D кухня в реални размери (метри). Всяка стена е „ред“ в собствени координати:
// x по стената, z от стената към стаята (фасадите са при z = D), y нагоре.
import * as THREE from "three";
import {RoundedBoxGeometry} from "three/addons/geometries/RoundedBoxGeometry.js";
import {frontMaterial, carcassMaterial, topMaterial, metalMaterial, shared, backsplashMaterial, worldUV, quality} from "./materials.js";
import {FRONTS} from "./catalog.js";
import {kitchenRuns} from "./pricing.js";

const D = .6, PLINTH = .1, BASE_TOP = .82, UP_Y = 1.45, UP_D = .35, T = .019, GAP = .004, AISLE = 1.4;

// Мека контактна сянка (без тежки изчисления): тъмно петно с меки краища.
const softTextures = {};
function softTexture(kind) {
  if (softTextures[kind]) return softTextures[kind];
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  if (kind === "box") {
    for (let i = 0; i < 30; i++) { ctx.fillStyle = "rgba(0,0,0,.045)"; ctx.fillRect(4 + i*1.3, 4 + i*1.3, 120 - i*2.6, 120 - i*2.6); }
  } else {
    const g = ctx.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, "rgba(0,0,0,.75)"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  }
  return (softTextures[kind] = new THREE.CanvasTexture(c));
}
function softShadow(parent, cx, y, cz, w, d, opacity, vertical = false) {
  const mat = new THREE.MeshBasicMaterial({map:softTexture(vertical ? "band" : "box"), transparent:true, opacity, depthWrite:false, color:"#000000"});
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
  if (!vertical) plane.rotation.x = -Math.PI/2;
  plane.position.set(cx, y, cz);
  plane.renderOrder = 1;
  parent.add(plane);
}

export function buildKitchen(s) {
  const k = {s, root:new THREE.Group(), lights:[], leds:[], glows:[], bulbs:[], openers:[]};
  const r = kitchenRuns(s);
  const H = s.height/100;
  const topT = Math.max(.012, (s.topThick || 2)/100);
  k.top = BASE_TOP + topT;
  k.upperH = s.uppers === "ceiling" ? H - .02 - UP_Y : .72;
  k.tallH = s.uppers === "ceiling" ? H - .02 : UP_Y + .72;
  k.gola = s.handle === "gola";
  k.mats = {
    front:frontMaterial(s.front, s.profile), upper:frontMaterial(s.upperFront || s.front, s.profile),
    tall:frontMaterial(s.tallFront || s.front, s.profile), island:frontMaterial(s.islandFront || s.front, s.profile),
    sideFront:frontMaterial(s.front, "flat"), sideTall:frontMaterial(s.tallFront || s.front, "flat"), sideIsland:frontMaterial(s.islandFront || s.front, "flat"),
    sideUpper:frontMaterial(s.upperFront || s.front, "flat"),
    top:topMaterial(s.top), metal:metalMaterial(s.finish), carcass:carcassMaterial(),
  };
  k.legs = s.base === "legs";
  const L = s.shape.startsWith("L") || s.shape === "U";
  const U = s.shape === "U";
  const island = r.island > 0;
  const islandRole = island ? s.islandFunc : "prep";

  // Основна стена A.
  const A = run(k, 0, 0, 0);
  const plan = planMain(r.A, s, {left:L, right:U, cookOnIsland:islandRole === "hob", sinkOnIsland:islandRole === "sink"});
  buildRun(k, A, plan, {upper:true, length:r.A, cornerLeft:L, cornerRight:U});
  const spot = plan.modules.find(m => (m.type === "drawers" || m.type === "doors") && m.w >= .5 && !plan.modules.some(n => (n.type === "sink" || n.type === "cook") && Math.abs(n.x - m.x) < .62));
  if (spot) props.counter(k, A, spot.x + .06, k.top);

  // Ляво рамо B: от далечния край към ъгъла, фасадите гледат към +x.
  if (L) {
    const B = run(k, 0, r.B, Math.PI/2);
    const len = Math.max(0, r.B - D);
    buildRun(k, B, fillPlan(len, s, U ? [] : []), {upper:false, length:len, armEnd:true});
  }
  // Дясно рамо C (П-образна): от ъгъла навън, фасадите гледат към -x.
  if (U) {
    const C = run(k, r.A, D, -Math.PI/2);
    const len = Math.max(0, r.C - D);
    const items = plan.droppedTalls.length && len >= 1.5 ? plan.droppedTalls.slice(0, 1) : [];
    buildRun(k, C, fillPlan(len, s, items, true), {upper:false, length:len, armEnd:true, startCorner:true});
  }
  // Остров: фасадите към основната стена, места за сядане към стаята.
  if (island) buildIsland(k, r, s, islandRole);

  k.size = {A:r.A, depth:island ? D + AISLE + s.island.depth/100 + .4 : Math.max(D, L ? r.B : D, U ? r.C : D), H};
  return k;
}

function run(k, x, z, rotY) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  k.root.add(g);
  return g;
}

function mesh(parent, geometry, material, x, y, z) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(x, y, z);
  m.castShadow = m.receiveShadow = true;
  parent.add(m);
  return m;
}

// Кутия по долен ляв заден ъгъл (x,y,z) и размери; UV в метри според мястото в реда.
function box(parent, x, y, z, w, h, d, material, {round = 0, long = false, uv = true} = {}) {
  const g = round ? new RoundedBoxGeometry(w, h, d, 2, Math.min(round, w/2 - 1e-4, h/2 - 1e-4, d/2 - 1e-4)) : new THREE.BoxGeometry(w, h, d);
  if (uv) worldUV(g, [x + w/2, y + h/2, z + d/2], long);
  return mesh(parent, g, material, x + w/2, y + h/2, z + d/2);
}

function cylinder(parent, r, len, material, x, y, z, axis = "y", segments = 20) {
  const m = mesh(parent, new THREE.CylinderGeometry(r, r, len, segments), material, x, y, z);
  if (axis === "x") m.rotation.z = Math.PI/2;
  if (axis === "z") m.rotation.x = Math.PI/2;
  return m;
}

// Разпределение на основната стена: мивка, съдомиялна, плот за готвене, колони вдясно.
function planMain(len, s, o) {
  const start = o.left ? D : 0, end = len - (o.right ? D : 0);
  const talls = [];
  if (!o.right) {
    if (s.fridge !== "none") talls.push({type:s.fridge === "visible" ? "fridgeFree" : "fridge", w:s.fridge === "visible" ? .7 : .6});
    if (s.oven && s.ovenTall) talls.push({type:"ovenTall", w:.6});
    if (s.pantry) talls.push({type:"pantry", w:.6});
  }
  const fixed = [];
  if (!o.sinkOnIsland) fixed.push({type:"sink", w:.8});
  if (!o.sinkOnIsland && s.dishwasher) fixed.push({type:"dish", w:.6});
  if (!o.cookOnIsland) fixed.push({type:"cook", w:s.hob === "gas" ? .9 : .8});
  const need = fixed.reduce((a, m) => a + m.w, 0) + .5;
  const droppedTalls = [];
  while (talls.length && end - start - talls.reduce((a, m) => a + m.w, 0) < need) droppedTalls.unshift(talls.pop());
  if (o.right && s.fridge !== "none") droppedTalls.push({type:s.fridge === "visible" ? "fridgeFree" : "fridge", w:s.fridge === "visible" ? .7 : .6});
  const tallW = talls.reduce((a, m) => a + m.w, 0);
  const free = Math.max(0, end - tallW - start - fixed.reduce((a, m) => a + m.w, 0));
  const cookIndex = fixed.findIndex(m => m.type === "cook");
  const before = cookIndex > 0 ? fixed.slice(0, cookIndex) : cookIndex === 0 ? [] : fixed;
  const cook = cookIndex >= 0 ? [fixed[cookIndex]] : [];
  const modules = [
    ...(o.left ? [{type:"corner", w:D}] : []),
    ...before,
    ...split(free*.45, s),
    ...cook,
    ...split(free*.55, s),
    ...talls,
    ...(o.right ? [{type:"corner", w:D}] : []),
  ];
  return place(modules, droppedTalls);
}

function fillPlan(len, s, talls = [], tallsAtEnd = false) {
  const tallW = talls.reduce((a, m) => a + m.w, 0);
  const modules = [...split(Math.max(0, len - tallW), s), ...talls];
  return place(tallsAtEnd ? modules : modules, []);
}

function split(len, s) {
  if (len < .12) return len > 0 ? [{type:"filler", w:len}] : [];
  const n = Math.max(1, Math.round(len/.75));
  const w = len/n;
  return Array.from({length:n}, (_, i) => ({type:s.lower === "mixed" && i % 2 ? "doors" : "drawers", w}));
}

function place(modules, droppedTalls) {
  let x = 0;
  for (const m of modules) { m.x = x; x += m.w; }
  return {modules, droppedTalls, length:x};
}

function buildRun(k, g, plan, o) {
  const {s} = k;
  const base = plan.modules.filter(m => !["fridge","fridgeFree","ovenTall","pantry"].includes(m.type));
  for (const m of plan.modules) {
    if (["fridge","fridgeFree","ovenTall","pantry"].includes(m.type)) tallModule(k, g, m);
    else baseModule(k, g, m);
  }
  softShadow(g, plan.length/2, .0015, D/2 + .04, plan.length + .35, D + .45, .38);
  // Плот, gola профил и цокъл по непрекъснатите участъци.
  for (const [a, b] of segments(base)) {
    box(g, a, BASE_TOP, 0, b - a, k.top - BASE_TOP, D + .02, k.mats.top, {long:true});
    if (k.gola) {
      box(g, a, BASE_TOP - .036, D - .055, b - a, .036, .03, shared.shadowGap(), {uv:false});
      box(g, a, BASE_TOP - .004, D - .03, b - a, .004, .012, shared.darkMetal(), {uv:false});
    }
    if (s.ledPlinth) {
      const strip = box(g, a + .02, k.legs ? PLINTH - .012 : .012, D - .068, b - a - .04, .008, .006, shared.led(), {uv:false});
      k.leds.push(strip);
      glow(k, g, a, b, D - .06);
    }
    if (o.upper) wallParts(k, g, a, b);
  }
  // Странични панели в цвета на фасадите в свободните краища.
  const first = plan.modules[0], last = plan.modules.at(-1);
  const sy = k.legs ? PLINTH : 0;
  if (first && !o.cornerLeft && !o.startCorner && first.type !== "fridgeFree") box(g, -T, sy, 0, T, k.top - .001 - sy, D + .02, isTall(first) ? k.mats.sideTall : k.mats.sideFront);
  if (last && !o.cornerRight && last.type !== "fridgeFree") box(g, plan.length, sy, 0, T, (isTall(last) ? k.tallH : k.top - .001) - sy, D + .02, isTall(last) ? k.mats.sideTall : k.mats.sideFront);
  if (o.upper) upperRow(k, g, plan);
}

const isTall = m => ["fridge","ovenTall","pantry"].includes(m.type);

function segments(modules) {
  const out = [];
  for (const m of modules) {
    const last = out.at(-1);
    if (last && Math.abs(last[1] - m.x) < 1e-6) last[1] = m.x + m.w;
    else out.push([m.x, m.x + m.w]);
  }
  return out;
}

// Кух корпус (гръб, страници, дъно, таван), за да се вижда вътрешността при „Отвори“.
function carcass(g, x, y, w, h, d, mat) {
  const t = .016;
  box(g, x + .001, y, 0, w - .002, h, .008, mat, {uv:false});
  box(g, x + .001, y, 0, t, h, d, mat, {uv:false});
  box(g, x + w - .001 - t, y, 0, t, h, d, mat, {uv:false});
  box(g, x + .001, y, 0, w - .002, t, d, mat, {uv:false});
  box(g, x + .001, y + h - t, 0, w - .002, t, d, mat, {uv:false});
}

// Долен шкаф: корпус, цокъл, фасади и уреди според типа.
function baseModule(k, g, m) {
  const {s} = k;
  const {x, w} = m;
  carcass(g, x, PLINTH, w, BASE_TOP - PLINTH, D - T - .002, k.mats.carcass);
  if (m.type === "doors" || m.type === "sink") box(g, x + .02, PLINTH + .33, .01, w - .04, .016, D - T - .04, k.mats.carcass, {uv:false});
  plinth(k, g, x, w, D);
  const top = BASE_TOP - (k.gola ? .036 : 0);
  const h = top - PLINTH;
  const mat = k.mats.front;
  if (m.type === "filler") { front(k, g, x, PLINTH, w, h, mat, "none"); return; }
  if (m.type === "corner") { front(k, g, x, PLINTH, w, h, mat, "none"); return; }
  if (m.type === "dish") { front(k, g, x, PLINTH, w, h, mat, "drawer", {slide:false}); return; }
  if (m.type === "sink" || m.type === "doors") {
    doors(k, g, x, PLINTH, w, h, mat, "base");
    if (m.type === "sink") sink(k, g, x, w);
    return;
  }
  if (m.type === "cook" && s.oven && !s.ovenTall) {
    front(k, g, x, PLINTH, w, .14, mat, "drawer");
    oven(k, g, x + (w - .6)/2, PLINTH + .14, .6, h - .14);
    if (w > .62) { front(k, g, x, PLINTH + .14, (w - .6)/2, h - .14, mat, "none"); front(k, g, x + w - (w - .6)/2, PLINTH + .14, (w - .6)/2, h - .14, mat, "none"); }
  } else {
    const rows = s.lower === "deep" ? [.42, .3] : [.27, .27, .18];
    const total = rows.reduce((a, b) => a + b, 0);
    let y = PLINTH;
    rows.forEach((part, i) => {
      const fh = h*part/total;
      front(k, g, x, y, w, fh, mat, "drawer", {inner:i === rows.length - 1 && m.type === "cook" ? "cutlery" : ""});
      y += fh;
    });
  }
  if (m.type === "cook") hob(k, g, x, w);
}

function doors(k, g, x, y, w, h, mat, zone) {
  if (w > .62) {
    front(k, g, x, y, w/2, h, mat, "doorL", {zone});
    front(k, g, x + w/2, y, w/2, h, mat, "doorR", {zone});
  } else front(k, g, x, y, w, h, mat, "doorL", {zone});
}

// Фасада с профил, дръжка и механизъм за „Отвори“.
function front(k, g, x, y, w, h, mat, mode, o = {}) {
  const {s} = k;
  const zone = o.zone || "base";
  const depth = o.depth ?? (zone === "upper" ? UP_D : D);
  const pw = w - GAP, ph = h - GAP, px = x + GAP/2, py = y + GAP/2;
  const holder = new THREE.Group();
  g.add(holder);
  let pivot = holder;
  if (mode === "doorL" || mode === "doorR" || o.lift) {
    pivot = new THREE.Group();
    const hx = mode === "doorR" ? px + pw : px;
    pivot.position.set(o.lift ? 0 : hx, o.lift ? py + ph : 0, depth);
    holder.add(pivot);
  }
  const local = (ax, ay, az) => pivot === holder ? [ax, ay, az] : [ax - pivot.position.x, ay - pivot.position.y, az - pivot.position.z];
  const at = local(px, py, depth - T);
  if ((s.profile === "shaker" || s.profile === "classic") && pw > .12 && ph > .1) shaker(pivot, at, pw, ph, mat, [px, py], s.profile === "classic");
  else {
    const panel = box(pivot, at[0], at[1], at[2], pw, ph, T, mat, {round:.0025, uv:false});
    worldUV(panel.geometry, [px + pw/2, py + ph/2, depth - T/2]);
  }
  handle(k, pivot, local, px, py, pw, ph, depth, mode, zone);
  if (mode === "drawer" && o.slide !== false) {
    drawerBox(pivot, px, py, pw, ph, depth, o.inner);
    k.openers.push({obj:holder, type:"slide", to:Math.min(.38, depth*.65)});
  } else if (o.lift) k.openers.push({obj:pivot, type:"rotX", to:-1.35});
  else if (mode === "doorL") k.openers.push({obj:pivot, type:"rotY", to:-1.75});
  else if (mode === "doorR") k.openers.push({obj:pivot, type:"rotY", to:1.75});
}

// Рамка: тънка (модерна класика) или класическа – по-широка рамка с повдигнат централен панел.
function shaker(parent, at, w, h, mat, world, classic = false) {
  const f = classic ? Math.min(.078, w*.22, h*.24) : Math.min(.065, w*.2, h*.25);
  const [x, y, z] = at;
  const piece = (px, py, pw, ph, depth, dz, round = 0) => {
    const m = box(parent, px, py, z + dz, pw, ph, depth, mat, {round, uv:false});
    worldUV(m.geometry, [world[0] + (px - x) + pw/2, world[1] + (py - y) + ph/2, 0]);
  };
  piece(x, y, w, h, T - .006, 0);
  piece(x, y, f, h, T, 0); piece(x + w - f, y, f, h, T, 0);
  piece(x + f, y, w - 2*f, f, T, 0); piece(x + f, y + h - f, w - 2*f, f, T, 0);
  if (classic) {
    const inset = f + Math.min(.022, (w - 2*f)*.15);
    if (w - 2*inset > .04 && h - 2*inset > .04) piece(x + inset, y + inset, w - 2*inset, h - 2*inset, T - .002, 0, .003);
  }
}

// Цокъл или крачета под шкафа (d = дълбочината до лицето на фасадата).
function plinth(k, g, x, w, d) {
  if (k.s.base !== "legs") { box(g, x, 0, d - .075, w, PLINTH - .002, .018, shared.shadowGap(), {uv:false}); return; }
  for (const lx of w > .3 ? [x + .045, x + w - .045] : [x + w/2]) cylinder(g, .014, PLINTH, k.mats.metal, lx, PLINTH/2, d - .07, "y", 12);
}

// Корниз отгоре: три стъпаловидни профила, леко издадени напред и встрани.
const CROWN_H = .07;
function crown(g, a, b, y, depth, mat) {
  let yy = y;
  for (const [h, p] of [[.016, .01], [.032, .026], [.022, .046]]) {
    box(g, a - p, yy, 0, b - a + 2*p, h, depth + p, mat, {round:.003, uv:false});
    yy += h;
  }
}

function handle(k, parent, local, px, py, pw, ph, depth, mode, zone) {
  const {s} = k;
  if (mode === "none" || s.handle === "gola" || s.handle === "push") return;
  const mat = k.mats.metal;
  const z = depth;
  const drawer = mode === "drawer";
  const upper = zone === "upper";
  if (s.handle === "profile") {
    const len = drawer ? pw*.92 : Math.min(.3, pw*.8);
    const hx = drawer ? px + (pw - len)/2 : mode === "doorR" ? px + .02 : px + pw - len - .02;
    const hy = upper ? py - .004 : py + ph - .014;
    const [ax, ay, az] = local(hx, hy, z - .006);
    box(parent, ax, ay, az, len, .016, .026, mat, {round:.002, uv:false});
    return;
  }
  const knob = s.handle === "knob" || s.handle === "cup";
  if (drawer) {
    const len = Math.min(.42, Math.max(.16, pw*.45));
    const cx = px + pw/2, cy = upper ? py + .05 : py + ph - Math.min(.05, ph*.3);
    if (s.handle === "cup") {
      // Черупка: полуцилиндър, отворен надолу.
      const [ax, ay, az] = local(cx, cy - .004, z + .002);
      const cup = mesh(parent, new THREE.CylinderGeometry(.019, .019, .095, 16, 1, false, -Math.PI/2, Math.PI), mat, ax, ay, az);
      cup.rotation.z = Math.PI/2;
      cup.scale.set(1, 1, .8);
      return;
    }
    if (knob) { const [ax, ay, az] = local(cx, cy, z + .012); cylinder(parent, .013, .024, mat, ax, ay, az, "z"); return; }
    const [ax, ay, az] = local(cx, cy, z + .024);
    cylinder(parent, .0065, len, mat, ax, ay, az, "x");
    for (const dx of [-len*.42, len*.42]) { const [bx, by, bz] = local(cx + dx, cy, z + .012); cylinder(parent, .004, .024, mat, bx, by, bz, "z", 10); }
    return;
  }
  const hx = mode === "doorR" ? px + .045 : px + pw - .045;
  const tall = zone === "wardrobe";
  const len = tall ? Math.min(.6, ph*.3) : Math.min(.24, ph*.4);
  const cy = upper ? py + len/2 + .05 : tall ? Math.min(py + ph - len/2 - .06, 1.1) : py + ph - len/2 - .06;
  if (knob) { const [ax, ay, az] = local(hx, upper ? py + .06 : tall ? Math.min(py + ph - .07, 1.05) : py + ph - .07, z + .012); cylinder(parent, .013, .024, mat, ax, ay, az, "z"); return; }
  const [ax, ay, az] = local(hx, cy, z + .024);
  cylinder(parent, .0065, len, mat, ax, ay, az, "y");
  for (const dy of [-len*.42, len*.42]) { const [bx, by, bz] = local(hx, cy + dy, z + .012); cylinder(parent, .004, .024, mat, bx, by, bz, "z", 10); }
}

// Кутия на чекмедже (вижда се при „Отвори“) с органайзер за прибори в горното.
function drawerBox(parent, px, py, pw, ph, depth, inner) {
  const mat = shared.interior();
  const bw = pw - .05, bh = Math.max(.06, ph*.62), bd = depth - .1, bx = px + .025, by = py + .03, bz = depth - T - bd;
  box(parent, bx, by, bz, bw, .012, bd, mat, {uv:false});
  box(parent, bx, by, bz, .012, bh, bd, mat, {uv:false});
  box(parent, bx + bw - .012, by, bz, .012, bh, bd, mat, {uv:false});
  box(parent, bx, by, bz, bw, bh, .012, mat, {uv:false});
  if (inner === "cutlery") {
    const tray = shared.wood();
    for (let i = 1; i < 5; i++) box(parent, bx + bw*i/5, by + .012, bz + .02, .008, .05, bd - .04, tray, {uv:false});
  }
}

function sink(k, g, x, w) {
  const {s} = k;
  const top = k.top;
  const sw = Math.min(.72, w - .12), sd = .42, sx = x + (w - sw)/2, sz = .1;
  box(g, sx, top - .002, sz, sw, .003, sd, shared.blackGlass(), {uv:false});
  box(g, sx + .02, top - .0015, sz + .02, sw - .04, .003, sd - .04, shared.interior(), {uv:false});
  cylinder(g, .018, .004, shared.darkMetal(), sx + sw/2, top + .001, sz + sd/2);
  faucet(k, g, sx + sw/2, top, sz - .045);
}

function faucet(k, g, x, top, z) {
  const mat = k.mats.metal;
  cylinder(g, .026, .05, mat, x, top + .025, z);
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, .26, 0), new THREE.Vector3(0, .34, .05), new THREE.Vector3(0, .33, .16), new THREE.Vector3(0, .25, .2),
  ]);
  const tube = mesh(g, new THREE.TubeGeometry(curve, 40, .012, 12), mat, x, top + .05, z);
  tube.castShadow = true;
  const lever = cylinder(g, .006, .09, mat, x + .04, top + .09, z, "x");
  lever.rotation.y = .3;
}

function hob(k, g, x, w) {
  const {s} = k;
  const top = k.top;
  const hw = Math.min(.78, w - .04), hx = x + (w - hw)/2;
  if (s.hob === "gas") {
    box(g, hx, top, .08, hw, .008, .5, shared.steel(), {uv:false});
    for (const [cx, cz, r] of [[.2, .18, .05], [.58, .18, .04], [.2, .4, .04], [.58, .4, .055]]) {
      cylinder(g, r, .02, shared.darkMetal(), hx + hw*cx/.78, top + .018, .08 + cz);
      cylinder(g, r*.45, .026, shared.blackGlass(), hx + hw*cx/.78, top + .02, .08 + cz);
    }
    for (let i = 0; i <= 3; i++) box(g, hx + .02 + i*(hw - .04)/3 - .004, top + .03, .1, .008, .012, .46, shared.darkMetal(), {uv:false});
    box(g, hx + .02, top + .03, .1, hw - .04, .012, .008, shared.darkMetal(), {uv:false});
    box(g, hx + .02, top + .03, .55, hw - .04, .012, .008, shared.darkMetal(), {uv:false});
  } else {
    box(g, hx, top, .07, hw, .006, .52, shared.blackGlass(), {uv:false});
    const ring = new THREE.MeshStandardMaterial({color:"#3a3c3e", roughness:.3});
    for (const [cx, cz, r] of [[.2, .19, .1], [.58, .19, .085], [.2, .42, .085], [.58, .42, .11]]) {
      const m = mesh(g, new THREE.RingGeometry(r - .004, r, 48), ring, hx + hw*cx/.78, top + .0065, .07 + cz);
      m.rotation.x = -Math.PI/2;
    }
  }
}

function oven(k, g, x, y, w, h) {
  const fh = Math.min(h, .6);
  box(g, x + .002, y + .002, D - T, w - .004, fh - .004, T, shared.blackGlass(), {round:.002, uv:false});
  box(g, x + .02, y + fh - .075, D, w - .04, .055, .002, shared.darkMetal(), {uv:false});
  box(g, x + w/2 - .05, y + fh - .06, D + .002, .1, .025, .001, shared.led(), {uv:false});
  cylinder(g, .008, w*.8, k.mats.metal, x + w/2, y + fh - .11, D + .03, "x");
  if (h > fh + .01) front(k, g, x, y + fh, w, h - fh, k.mats.front, "none");
}

function microwave(k, g, x, y, w) {
  box(g, x + .002, y + .002, D - T, w - .004, .45 - .004, T, shared.blackGlass(), {round:.002, uv:false});
  box(g, x + w*.78, y + .04, D + .001, w*.16, .36, .002, shared.darkMetal(), {uv:false});
}

// Колони: хладилник, фурна и микровълнова на удобна височина, килер.
function tallModule(k, g, m) {
  const {s} = k;
  const {x, w} = m;
  const H = k.tallH;
  const mat = k.mats.tall;
  if (m.type === "fridgeFree") {
    box(g, x + .005, 0, -.02, w - .01, 2.02, .7, shared.steel(), {round:.006, uv:false});
    box(g, x + .01, 1.3, .68, w - .02, .004, .004, shared.darkMetal(), {uv:false});
    for (const [y, len] of [[.75, .5], [1.6, .35]]) cylinder(g, .009, len, k.mats.metal, x + w - .06, y, .72);
    if (H > 2.06) box(g, x, 2.06, 0, w, H - 2.06, D, mat);
    return;
  }
  box(g, x + .001, PLINTH, 0, w - .002, H - PLINTH, D - T - .002, k.mats.carcass, {uv:false});
  plinth(k, g, x, w, D);
  if (m.x > .01) box(g, x, k.top, 0, T, H - k.top, D + .002, k.mats.sideTall);
  box(g, x, H, 0, w, .012, D, mat);
  if (s.crown && H + .012 + CROWN_H < s.height/100 - .005) crown(g, x, x + w, H + .012, D, k.mats.sideTall);
  if (m.type === "fridge") {
    front(k, g, x, PLINTH, w, 1.12, mat, "doorL", {zone:"tall"});
    front(k, g, x, PLINTH + 1.12, w, H - PLINTH - 1.12, mat, "doorL", {zone:"tall"});
  } else if (m.type === "ovenTall") {
    front(k, g, x, PLINTH, w, .3, mat, "drawer", {zone:"tall"});
    front(k, g, x, PLINTH + .3, w, .3, mat, "drawer", {zone:"tall"});
    oven(k, g, x, PLINTH + .6, w, .6);
    let y = PLINTH + 1.2;
    if (s.microwave) { microwave(k, g, x, y, w); y += .45; }
    if (H - y > .08) front(k, g, x, y, w, H - y, mat, "doorL", {zone:"tall"});
  } else {
    const split = Math.min(1.4, H*.62);
    front(k, g, x, PLINTH, w, split - PLINTH, mat, "doorL", {zone:"tall"});
    front(k, g, x, split, w, H - split, mat, "doorL", {zone:"tall"});
  }
}

// Гръб, горни шкафове, рафтове и аспиратор над основната стена.
function wallParts(k, g, a, b) {
  const {s} = k;
  const shelves = s.uppers === "shelves" || s.uppers === "rack";
  const topY = shelves ? Math.min(2.2, s.height/100 - .06) : s.uppers === "none" ? (s.backsplash === "slab" ? 2.1 : 1.5) : UP_Y;
  box(g, a, k.top, 0, b - a, topY - k.top, .012, backsplashMaterial(s.backsplash, s.wall), {long:false});
  if (s.uppers !== "none" && !shelves) softShadow(g, (a + b)/2, UP_Y - .17, .0135, b - a, .34, .24, true);
  if (s.uppers === "none") {
    box(g, a + .05, 1.62, .012, b - a - .1, .04, .26, k.mats.upper, {round:.003});
    if (s.ledUnder) { k.leds.push(box(g, a + .07, 1.615, .2, b - a - .14, .004, .01, shared.led(), {uv:false})); areaLight(k, g, (a + b)/2, 1.6, .16, b - a - .14); }
  }
}

function upperRow(k, g, plan) {
  const {s} = k;
  const base = plan.modules.filter(m => !isTall(m) && m.type !== "fridgeFree" && m.type !== "corner");
  if (s.uppers === "shelves" || s.uppers === "rack") { openShelves(k, g, plan); return; }
  if (s.uppers === "none") {
    const cook = base.find(m => m.type === "cook");
    if (cook && s.hood !== "downdraft" && s.hood !== "ceiling") chimneyHood(k, g, cook.x, cook.w);
    if (cook && s.hood === "downdraft") box(g, cook.x + .06, k.top, .04, cook.w - .12, .22, .03, shared.blackGlass(), {uv:false});
    return;
  }
  const h = k.upperH;
  const segs = segments(plan.modules.filter(m => !isTall(m) && m.type !== "fridgeFree"));
  let index = 0;
  for (const [a, b] of segs) {
    const mods = splitUpper(a, b);
    for (const m of mods) {
      const hoodHere = plan.modules.some(c => c.type === "cook" && Math.abs((c.x + c.w/2) - (m.x + m.w/2)) < m.w/2);
      upperModule(k, g, m.x, m.w, h, index++, hoodHere);
    }
    if (s.ledUnder) {
      k.leds.push(box(g, a + .02, UP_Y - .006, UP_D - .05, b - a - .04, .005, .012, shared.led(), {uv:false}));
      areaLight(k, g, (a + b)/2, UP_Y - .01, .24, b - a - .1);
    }
    const cy = UP_Y + h + .012;
    if (s.crown && cy + CROWN_H < s.height/100 - .005) crown(g, a, b, cy, UP_D, k.mats.sideUpper);
  }
}

// Открити рафтове (скандинавски) или метална етажерка (индустриален) вместо горни шкафове.
function openShelves(k, g, plan) {
  const {s} = k;
  const rack = s.uppers === "rack";
  const woodId = [s.tallFront, s.islandFront, s.upperFront, s.front].find(id => /^(egger|ven)-/.test(id || "")) || "egger-H1180";
  const wood = frontMaterial(woodId, "flat");
  const cook = plan.modules.find(m => m.type === "cook");
  const hood = cook && s.hood !== "downdraft" && s.hood !== "ceiling";
  if (hood) chimneyHood(k, g, cook.x, cook.w);
  if (cook && s.hood === "downdraft") box(g, cook.x + .06, k.top, .04, cook.w - .12, .22, .03, shared.blackGlass(), {uv:false});
  let parts = segments(plan.modules.filter(m => !isTall(m) && m.type !== "fridgeFree"));
  if (hood) {
    const hw = Math.min(.9, cook.w), hx = cook.x + (cook.w - hw)/2;
    parts = parts.flatMap(([a, b]) => hx >= b || hx + hw <= a ? [[a, b]] : [[a, hx - .08], [hx + hw + .08, b]]);
  }
  const ys = rack ? [1.42, 1.78, 2.12].filter(y => y < s.height/100 - .12) : [1.5, 1.86];
  const depth = rack ? .3 : .26, t = rack ? .024 : .036;
  let row = 0;
  for (const [a, b] of parts) {
    if (b - a < .35) continue;
    for (const y of ys) {
      box(g, a + .02, y, 0, b - a - .04, t, depth, wood, {round:.002});
      props.dishes(k, g, a + .05, y + t, b - a - .1, row++);
    }
    if (rack) {
      const n = Math.max(2, Math.round((b - a)/.9) + 1), top = ys.at(-1) + t + .03, bottom = ys[0] - .03;
      for (let i = 0; i < n; i++) {
        const x = a + .03 + i*(b - a - .074)/(n - 1);
        box(g, x, bottom, depth - .016, .014, top - bottom, .014, k.mats.metal, {uv:false});
        box(g, x, bottom, .004, .014, top - bottom, .014, k.mats.metal, {uv:false});
      }
      box(g, a + .03, top - .014, depth - .016, b - a - .06, .014, .014, k.mats.metal, {uv:false});
    }
    if (s.ledUnder) {
      k.leds.push(box(g, a + .05, ys[0] - .005, depth - .06, b - a - .1, .005, .01, shared.led(), {uv:false}));
      areaLight(k, g, (a + b)/2, ys[0] - .01, .2, b - a - .1);
    }
  }
}

function splitUpper(a, b) {
  const len = b - a;
  const n = Math.max(1, Math.round(len/.8));
  return Array.from({length:n}, (_, i) => ({x:a + i*len/n, w:len/n}));
}

function upperModule(k, g, x, w, h, index, hood) {
  const {s} = k;
  const mat = k.mats.upper;
  const y = UP_Y - (k.gola || s.handle === "push" ? .018 : 0);
  const fh = h + (UP_Y - y);
  if (hood && s.hood === "chimney") { chimneyHood(k, g, x, w); return; }
  carcass(g, x, UP_Y, w, h, UP_D - T - .002, k.mats.carcass);
  box(g, x, UP_Y + h, 0, w, .012, UP_D, mat);
  box(g, x + .02, UP_Y + h*.5, .01, w - .04, .016, UP_D - T - .03, k.mats.carcass, {uv:false});
  props.dishes(k, g, x + .02, UP_Y + h*.5 + .016, w - .04, index);
  if (hood && s.hood === "integrated") {
    box(g, x + .01, UP_Y - .004, UP_D - .32, w - .02, .006, .3, shared.steel(), {uv:false});
    front(k, g, x, UP_Y + .02, w, h - .02, mat, "doorL", {zone:"upper", lift:true});
    return;
  }
  const glass = s.uppers === "glass" && index % 2 === 1;
  const open = s.uppers === "open" && index % 3 === 1;
  if (glass || open) { displayCase(k, g, x, w, h, glass); return; }
  if (s.uppers === "lift") {
    front(k, g, x, y, w, fh/2, mat, "drawer", {zone:"upper", slide:false, lift:true});
    front(k, g, x, y + fh/2, w, fh/2, mat, "drawer", {zone:"upper", slide:false, lift:true});
  } else if (s.uppers === "ceiling" && h > 1) {
    doors(k, g, x, y, w, .74, mat, "upper");
    front(k, g, x, y + .74, w, fh - .74, mat, "drawer", {zone:"upper", slide:false, lift:true});
  } else doors(k, g, x, y, w, fh, mat, "upper");
}

// Витрина със стъкло и LED или отворени рафтове с декорация.
function displayCase(k, g, x, w, h, glass) {
  const {s} = k;
  const mat = k.mats.upper;
  const t = .018;
  box(g, x, UP_Y, 0, w, t, UP_D, mat);
  box(g, x, UP_Y + h - t, 0, w, t, UP_D, mat);
  box(g, x, UP_Y, 0, t, h, UP_D, mat);
  box(g, x + w - t, UP_Y, 0, t, h, UP_D, mat);
  const upper = FRONTS[s.upperFront] || {};
  const light = new THREE.Color(upper.hex || "#888888").getHSL({h:0, s:0, l:0}).l > .5;
  box(g, x + t, UP_Y + t, 0, w - 2*t, h - 2*t, .01, frontMaterial(upper.tex ? "lac-graphite" : light ? "egger-H1145" : "ven-walnut-dark"));
  const shelves = 2;
  for (let i = 1; i <= shelves; i++) {
    const sy = UP_Y + h*i/(shelves + 1);
    box(g, x + t, sy, .01, w - 2*t, .008, UP_D - .03, glass ? shared.glass() : mat, {uv:!glass});
    props.dishes(k, g, x + t, sy + .008, w - 2*t, i);
  }
  props.dishes(k, g, x + t, UP_Y + t, w - 2*t, 0);
  if (s.ledShelves) {
    k.leds.push(box(g, x + t, UP_Y + h - t - .006, UP_D - .08, w - 2*t, .005, .01, shared.led(), {uv:false}));
  }
  if (s.ledShelves && !quality.lite) {
    const light = new THREE.PointLight("#ffd9a0", 0, .9, 2);
    light.position.set(x + w/2, UP_Y + h - .06, UP_D - .1);
    g.add(light);
    k.lights.push({light, day:.08, night:.9});
  }
  if (glass) {
    const tint = ["bronze","brass","champagne"].includes(s.finish) ? shared.bronzeGlass() : shared.glass();
    const framed = s.profile === "classic" || s.profile === "shaker";
    const frame = framed ? .05 : .022, frameMat = framed ? k.mats.upper : k.mats.metal;
    const fx = x + GAP, fw = w - 2*GAP, fy = UP_Y, fh = h;
    for (const [px, py, pw, ph] of [[fx, fy, frame, fh], [fx + fw - frame, fy, frame, fh], [fx, fy, fw, frame], [fx, fy + fh - frame, fw, frame]]) {
      box(g, px, py, UP_D - .019, pw, ph, .019, frameMat, {round:.001, uv:false});
    }
    if (s.profile === "classic") {
      box(g, fx + fw/2 - .008, fy + frame, UP_D - .016, .016, fh - 2*frame, .014, frameMat, {uv:false});
      for (const r of [1/3, 2/3]) box(g, fx + frame, fy + fh*r - .008, UP_D - .016, fw - 2*frame, .016, .014, frameMat, {uv:false});
    }
    const pane = box(g, fx + frame, fy + frame, UP_D - .012, fw - 2*frame, fh - 2*frame, .004, tint, {uv:false});
    pane.castShadow = false;
  }
}

function chimneyHood(k, g, x, w) {
  const {s} = k;
  const H = s.height/100;
  const hw = Math.min(.9, w), hx = x + (w - hw)/2;
  // Гипсов аспиратор в цвета на стената: изчистен и светъл, без тежка черна кутия.
  const plaster = shared.wall(s.wall);
  box(g, hx, 1.56, 0, hw, .2, .48, plaster, {round:.01, uv:false});
  box(g, hx + hw/2 - .19, 1.74, 0, .38, H - 1.74, .3, plaster, {uv:false});
  box(g, hx + .05, 1.557, .08, hw - .1, .004, .34, shared.steel(), {uv:false});
}

function areaLight(k, g, cx, y, z, width) {
  if (quality.lite) return; // на телефон: само светещата лента, без скъпата площна светлина
  const light = new THREE.PointLight("#ffd7a0", 0, 2.2, 2);
  light.position.set(cx, y - .08, z);
  g.add(light);
  k.lights.push({light, day:0, night:1.6 + Math.min(2, width)*.6});
}

// Мека светлина по пода от LED в цокъла.
let glowTexture = null;
function glow(k, g, a, b, z) {
  if (!glowTexture) {
    const c = document.createElement("canvas");
    c.width = 4; c.height = 64;
    const ctx = c.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, 0, 64);
    grad.addColorStop(0, "rgba(255,210,150,.9)");
    grad.addColorStop(1, "rgba(255,210,150,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 4, 64);
    glowTexture = new THREE.CanvasTexture(c);
  }
  const mat = new THREE.MeshBasicMaterial({map:glowTexture, transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false, toneMapped:false});
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(b - a, .32), mat);
  plane.rotation.x = -Math.PI/2;
  plane.position.set((a + b)/2, .002, z + .16);
  g.add(plane);
  k.glows.push(mat);
}

// Остров: шкафове към стената, водопад, места за сядане, лампи над него.
function buildIsland(k, r, s, role) {
  const len = r.island, depth = s.island.depth/100;
  const x0 = Math.max(.3, (r.A - len)/2), frontZ = D + AISLE, backZ = frontZ + D;
  const g = run(k, x0 + len, backZ, Math.PI);
  const items = role === "sink" ? [{type:"sink", w:.8}, ...(s.dishwasher ? [{type:"dish", w:.6}] : [])] : role === "hob" ? [{type:"cook", w:s.hob === "gas" ? .9 : .8}] : [];
  const itemsW = items.reduce((a, m) => a + m.w, 0);
  const rest = Math.max(0, len - itemsW);
  const modules = [...split(rest/2, s), ...items, ...split(rest/2, s)];
  const plan = place(modules, []);
  const saved = k.mats.front;
  k.mats.front = k.mats.island;
  for (const m of plan.modules) baseModule(k, g, m);
  k.mats.front = saved;
  if (k.gola) {
    box(g, 0, BASE_TOP - .036, D - .055, len, .036, .03, shared.shadowGap(), {uv:false});
  }
  // Плот и водопад в световни координати.
  const topT = k.top - BASE_TOP;
  const z1 = frontZ - .02, z2 = backZ + Math.max(.02, depth - D);
  const top = box(k.root, x0, BASE_TOP, z1, len, topT, z2 - z1, k.mats.top, {long:true});
  if (s.waterfall) {
    box(k.root, x0 - topT, 0, z1, topT, k.top, z2 - z1, k.mats.top);
    box(k.root, x0 + len, 0, z1, topT, k.top, z2 - z1, k.mats.top);
  } else {
    const sy = k.legs ? PLINTH : 0;
    box(k.root, x0 - T, sy, frontZ, T, BASE_TOP - sy, D, k.mats.sideIsland);
    box(k.root, x0 + len, sy, frontZ, T, BASE_TOP - sy, D, k.mats.sideIsland);
  }
  // Задна страна към стаята (виждат я гостите).
  const back = box(k.root, x0, PLINTH, backZ, len, BASE_TOP - PLINTH, T, k.mats.island);
  if (k.legs) plinth(k, k.root, x0, len, backZ - .01); else box(k.root, x0, 0, backZ - .08, len, PLINTH - .002, .018, shared.shadowGap(), {uv:false});
  if (s.ledPlinth) { k.leds.push(box(k.root, x0 + .03, k.legs ? PLINTH - .012 : .012, backZ - .07, len - .06, .008, .006, shared.led(), {uv:false})); glow(k, k.root, x0, x0 + len, backZ - .06); }
  softShadow(k.root, x0 + len/2, .0015, (z1 + z2)/2, len + .55, z2 - z1 + .55, .36);
  // Столове.
  const seats = Number(s.island.seats || 0);
  if (seats && depth >= .85) for (let i = 0; i < seats; i++) props.stool(k, x0 + len*(i + .5)/seats, backZ + .28);
  // Лампи над острова.
  props.pendants(k, x0, len, (z1 + z2)/2, s);
  if (role === "hob" && s.hood === "ceiling") {
    const H = s.height/100;
    box(k.root, x0 + len/2 - .45, H - .2, (z1 + z2)/2 - .3, .9, .14, .6, shared.steel(), {round:.006, uv:false});
  }
  props.vase(k, x0 + len*.22, k.top, (z1 + z2)/2);
  props.bowl(k, x0 + len*.72, k.top, (z1 + z2)/2 + .05);
  void top; void back;
}

// Декорация: прави кухнята жива.
const props = {
  dishes(k, g, x, y, w, row) {
    const count = Math.max(1, Math.floor(w/.14));
    for (let i = 0; i < count; i++) {
      const cx = x + w*(i + .5)/count;
      if ((i + row) % 3 === 0) for (let j = 0; j < 4; j++) mesh(g, new THREE.CylinderGeometry(.1, .085, .012, 28), shared.ceramic(), cx, y + .006 + j*.014, .17);
      else if ((i + row) % 3 === 1) mesh(g, new THREE.CylinderGeometry(.035, .03, .12, 16), shared.glass(), cx, y + .06, .2).castShadow = false;
      else mesh(g, new THREE.SphereGeometry(.055, 18, 12, 0, Math.PI*2, 0, Math.PI*.55), shared.ceramicDark(), cx, y + .055, .18).rotation.x = Math.PI;
    }
  },
  // Модерен бар стол: тънки черни крака, дъбова седалка и светла тапицерия.
  stool(k, x, z) {
    const g = k.root, seatY = .64;
    const profile = [[0, 0], [.168, 0], [.181, .01], [.186, .03], [.18, .047], [.163, .056], [0, .058]].map(([a, b]) => new THREE.Vector2(a, b));
    mesh(g, new THREE.CylinderGeometry(.172, .172, .022, 40), shared.wood(), x, seatY + .011, z);
    mesh(g, new THREE.LatheGeometry(profile, 40), shared.cushion(), x, seatY + .022, z);
    for (let i = 0; i < 4; i++) {
      const a = i*Math.PI/2 + Math.PI/4;
      const leg = mesh(g, new THREE.CylinderGeometry(.009, .011, seatY, 10), shared.darkMetal(), x + Math.cos(a)*.125, seatY/2, z + Math.sin(a)*.125);
      leg.rotation.set(Math.sin(a)*.1, 0, -Math.cos(a)*.1);
    }
    const ring = mesh(g, new THREE.TorusGeometry(.135, .006, 8, 48), shared.darkMetal(), x, .24, z);
    ring.rotation.x = Math.PI/2;
  },
  pendants(k, x0, len, z, s) {
    if (s.pendants === "none") return;
    const H = s.height/100;
    const mat = k.mats.metal;
    if (s.pendants === "line") {
      const lw = Math.min(1.8, len*.7), y = BASE_TOP + .9;
      box(k.root, x0 + (len - lw)/2, y, z - .03, lw, .045, .06, shared.darkMetal(), {round:.006, uv:false});
      const strip = box(k.root, x0 + (len - lw)/2 + .02, y - .002, z - .02, lw - .04, .003, .04, shared.bulb(), {uv:false});
      k.bulbs.push(strip.material);
      for (const dx of [.1, lw - .1]) cylinder(k.root, .002, H - y - .045, shared.darkMetal(), x0 + (len - lw)/2 + dx, (H + y + .045)/2, z);
      const light = new THREE.PointLight("#ffd9a0", 0, 3.2, 2);
      light.position.set(x0 + len/2, y - .1, z);
      k.root.add(light);
      k.lights.push({light, day:0, night:7});
      return;
    }
    const count = len > 2.2 ? 3 : 2;
    for (let i = 0; i < count; i++) {
      const px = x0 + len*(i + .5)/count, y = BASE_TOP + 1.0;
      cylinder(k.root, .003, H - y - .1, shared.darkMetal(), px, (H + y + .1)/2, z, "y", 6);
      if (s.pendants === "globe") {
        const globe = mesh(k.root, new THREE.SphereGeometry(.13, 32, 20), shared.glass(), px, y, z);
        globe.castShadow = false;
        cylinder(k.root, .03, .05, mat, px, y + .14, z);
      } else {
        const shade = mat.clone();
        shade.side = THREE.DoubleSide;
        mesh(k.root, new THREE.ConeGeometry(.16, .2, 36, 1, true), shade, px, y + .02, z);
      }
      const bulb = mesh(k.root, new THREE.SphereGeometry(.035, 16, 12), shared.bulb(), px, y - .03, z);
      bulb.castShadow = false;
      k.bulbs.push(bulb.material);
      const light = new THREE.PointLight("#ffd9a0", 0, 3, 2);
      light.position.set(px, y - .08, z);
      k.root.add(light);
      k.lights.push({light, day:0, night:4});
    }
  },
  // Бяла керамична ваза с евкалиптови клонки.
  vase(k, x, y, z) {
    const points = [[0, 0], [.058, 0], [.074, .05], [.07, .14], [.042, .22], [.031, .27], [.035, .28]].map(([a, b]) => new THREE.Vector2(a, b));
    mesh(k.root, new THREE.LatheGeometry(points, 36), shared.ceramic(), x, y, z);
    const leaf = new THREE.SphereGeometry(1, 10, 6);
    for (let i = 0; i < 4; i++) {
      const len = .4 + (i % 2)*.1;
      const stem = new THREE.Group();
      stem.position.set(x, y + .2, z);
      stem.rotation.set(0, i*1.7, (i - 1.5)*.17);
      k.root.add(stem);
      cylinder(stem, .0025, len, shared.bark(), 0, len/2, 0, "y", 5);
      for (let j = 0; j < 9; j++) {
        const side = j % 2 ? 1 : -1;
        const m = mesh(stem, leaf, j % 3 ? shared.sage() : shared.sageLight(), side*.017, .12 + j*(len - .12)/9, 0);
        m.scale.set(.02, .006, .016);
        m.rotation.z = side*-.45;
      }
    }
  },
  // Дъски за рязане, облегнати на гърба, и буркани – плотът изглежда обитаван.
  counter(k, g, x, y) {
    const board = box(g, x, y + .002, .035, .34, .46, .02, shared.wood(), {round:.008, uv:false});
    board.rotation.x = -.1;
    const small = box(g, x + .2, y + .002, .07, .24, .32, .018, shared.wood(), {round:.008, uv:false});
    small.rotation.x = -.07;
    [[.52, .17], [.62, .22], [.72, .13]].forEach(([dx, h], i) => {
      mesh(g, new THREE.CylinderGeometry(.045, .045, h, 24), shared.glass(), x + dx, y + h/2, .17).castShadow = false;
      mesh(g, new THREE.CylinderGeometry(.04, .04, h*.62, 20), shared.fabric(["#e8dcc4", "#c9a878", "#f3efe6"][i]), x + dx, y + h*.31 + .004, .17);
      mesh(g, new THREE.CylinderGeometry(.047, .047, .022, 24), shared.wood(), x + dx, y + h + .011, .17);
    });
  },
  bowl(k, x, y, z) {
    const points = [[.0, 0], [.08, 0], [.15, .05], [.16, .09]].map(([a, b]) => new THREE.Vector2(a, b));
    mesh(k.root, new THREE.LatheGeometry(points, 32), shared.wood(), x, y, z);
    const colors = ["#e7b53c", "#d9a22c", "#9fb34a", "#e7b53c", "#c98b2a"];
    colors.forEach((c, i) => mesh(k.root, new THREE.SphereGeometry(.038, 18, 14), shared.fruit(c), x + Math.cos(i*1.3)*.06, y + .07 + (i === 4 ? .03 : 0), z + Math.sin(i*1.3)*.06));
  },
};

// Общи части за другите мебели (гардероби, спалня, антре, ТВ, офис).
export {softShadow, mesh, box, cylinder, carcass, front, glow, areaLight, props, plinth, crown, CROWN_H};
