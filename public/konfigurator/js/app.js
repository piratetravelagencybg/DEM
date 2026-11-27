// Интерфейс на 3D конфигуратора: стил, форма, цветове, детайли и запитване.
import {Showroom} from "./engine.js";
import * as C from "./catalog.js";
import {price, tierNames, hardwareNames, OFFER, FURN_NAMES} from "./pricing.js";
import {FURN_DEFAULTS} from "./furniture.js";
import {MODELS, firstModel} from "./models/index.js";
import {makeKit} from "./sketchkit.js";

// Цени (решение на собственика 27.11): общата цена се вижда долу и в последната стъпка; до отделните избори – никога.
const SHOW_PRICES = true;

const $ = selector => document.querySelector(selector);
const STORE = "dem-v2-kitchen-4";
const INQUIRY_ENDPOINT = "/api/inquiry";
const INQUIRY_LIVE = /(^|\.)domexpertmebel\.com$/.test(location.hostname);
const money = n => `${new Intl.NumberFormat("bg-BG",{maximumFractionDigits:0,useGrouping:"always"}).format(Math.round(n))} €`;
const esc = t => String(t).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
const cm = n => `${String(n/100).replace(".", ",")} м`;

const FRONT_KEYS = ["front", "upperFront", "tallFront", "islandFront", "fMain", "fAccent"];
const DEFAULT = {
  type:"kitchen", model:"island", style:"modern", palette:"oak", material:"supermatte",
  shape:"I+island", walls:{A:420, B:260, C:220}, island:{len:240, depth:100, seats:3}, height:270,
  front:"egger-H1180", upperFront:"hpl-white", tallFront:"hpl-white", islandFront:"egger-H1180", fMain:"hpl-white", fAccent:"egger-H1180",
  profile:"flat", handle:"gola", finish:"black", crown:false, base:"plinth",
  top:"calacatta", topThick:2, waterfall:true, backsplash:"slab", uppers:"lift", lower:"drawers",
  oven:true, ovenTall:true, microwave:true, pantry:true, fridge:"integrated", hob:"induction", hood:"integrated", dishwasher:true,
  islandFunc:"prep", cornerUnit:false, ledUnder:true, ledPlinth:true, ledShelves:true, pendants:"line",
  floor:"planks", wall:"#e7dfd2", hardware:"blum", tier:"standard", applyTo:"all", furn:structuredClone(FURN_DEFAULTS),
};
// Граници на размерите (см): едни и същи за полетата, за паметта и за линка.
const LIMITS = {
  "walls.A":[180, 800], "walls.B":[120, 600], "walls.C":[120, 600], "island.len":[120, 400], "island.depth":[60, 140], height:[230, 320],
  "furn.wardrobe.width":[120, 600], "furn.walkin.A":[150, 600], "furn.walkin.B":[120, 450], "furn.bedroom.width":[260, 550],
  "furn.tv.width":[160, 550], "furn.entry.width":[120, 400], "furn.office.width":[120, 450],
};
const isKitchen = () => state.type === "kitchen";
const F = () => `furn.${state.type}`;
const fv = key => state.furn[state.type][key];

const types = [
  ["kitchen","Кухня",'<path d="M3 3h18v5H3zM3 12h18v9H3zM11 3v5m1 4v9m4-6h3m-12 0h2"/>'],
  ["wardrobe","Гардероб",'<path d="M4 3h16v18H4zM12 3v18m-2-10v3m4-3v3"/>'],
  ["walkin","Гардеробна",'<path d="M3 4h18v16H3zM14 4v16M3 9h11m0 5h7M6 12h5"/>'],
  ["bedroom","Спалня",'<path d="M3 19v-8h18v8M3 15h18M5 11V6h14v5M3 19v2m18-2v2"/>'],
  ["tv","ТВ стена",'<path d="M3 4h18v10H3zM12 14v3m-8 1h16"/>'],
  ["entry","Антре",'<path d="M3 3h8v18H3zM14 6h7M16 6v3m3-3v3M14 14h7v2h-7z"/>'],
  ["office","Офис",'<path d="M2 10h20M4 10v11m16-11v11m-7-15h6v4"/>'],
];
const shapeIcons = {
  I:'<path d="M4 6h36v8H4z"/>', L:'<path d="M4 6h36v8H12v12H4z"/>', U:'<path d="M4 6h36v20h-8V14H12v12H4z"/>',
  "I+island":'<path d="M4 4h36v8H4zM12 19h20v7H12z"/>', "L+island":'<path d="M4 4h36v8H12v14H4zM18 19h18v7H18z"/>',
};
const profileIcons = {
  flat:'<rect x="10" y="3" width="24" height="24" rx="1"/>',
  shaker:'<rect x="10" y="3" width="24" height="24" rx="1"/><rect x="15" y="8" width="14" height="14"/>',
  classic:'<rect x="10" y="3" width="24" height="24" rx="1"/><rect x="14.5" y="7.5" width="15" height="15"/><rect x="17.5" y="10.5" width="9" height="9" rx="1.5"/>',
  fluted:'<rect x="10" y="3" width="24" height="24" rx="1"/><path d="M14 3v24M18 3v24M22 3v24M26 3v24M30 3v24"/>',
  vgroove:'<rect x="10" y="3" width="24" height="24" rx="1"/><path d="M18 3v24M26 3v24"/>',
};
const handleIcons = {
  gola:'<rect x="6" y="9" width="32" height="18" rx="1"/><path d="M6 6h32"/>', push:'<rect x="6" y="5" width="32" height="22" rx="1"/><circle cx="22" cy="16" r="1.5"/>',
  profile:'<rect x="6" y="7" width="32" height="20" rx="1"/><path d="M12 7h20" stroke-width="3"/>', bar:'<rect x="6" y="5" width="32" height="22" rx="1"/><path d="M15 11h14" stroke-width="2.4"/>',
  knob:'<rect x="6" y="5" width="32" height="22" rx="1"/><circle cx="22" cy="11" r="2.4"/>',
  cup:'<rect x="6" y="5" width="32" height="22" rx="1"/><path d="M17 10a5 4 0 0 0 10 0z"/>',
};
const baseIcons = {
  plinth:'<rect x="8" y="4" width="28" height="17" rx="1"/><rect x="10" y="21" width="24" height="5"/>',
  legs:'<rect x="8" y="4" width="28" height="17" rx="1"/><path d="M12 21v6M32 21v6" stroke-width="2.2"/>',
};
const icon = (paths, box = "0 0 44 30") => `<svg viewBox="${box}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

let state = load();
let step = 0;
let showroom = null;
let quoteMode = "project";

// --- Състояние: зареждане, проверка, стил, гама и материал ---
function load() {
  const hash = new URLSearchParams(location.hash.slice(1)).get("p");
  if (hash) try { return sanitize(JSON.parse(decodeURIComponent(escape(atob(hash.replace(/-/g, "+").replace(/_/g, "/")))))); } catch { /* лош линк */ }
  try { const saved = JSON.parse(localStorage.getItem(STORE)); if (saved?.front) return sanitize(saved); } catch { /* без памет */ }
  return applyStyle(structuredClone(DEFAULT), "modern");
}
// Всичко, което идва отвън (линк, памет), се проверява: непознат цвят или размер извън границите не чупи 3D сцената.
function sanitize(saved) {
  const s = {...structuredClone(DEFAULT), ...saved};
  s.furn = Object.fromEntries(Object.entries(FURN_DEFAULTS).map(([id, d]) => [id, {...d, ...(saved.furn?.[id] || {})}]));
  s.walls = {...DEFAULT.walls, ...(saved.walls || {})};
  s.island = {...DEFAULT.island, ...(saved.island || {})};
  if (!types.some(([id]) => id === s.type)) s.type = "kitchen";
  if (!C.styles[s.style]) s.style = "modern";
  if (!MODELS.kitchen[s.model]) s.model = firstModel("kitchen");
  for (const id of Object.keys(s.furn)) if (!MODELS[id]?.[s.furn[id].model]) s.furn[id].model = firstModel(id);
  if (s.palette && !C.palettes[s.palette]) s.palette = "";
  for (const key of FRONT_KEYS) if (!C.FRONTS[s[key]]) s[key] = DEFAULT[key];
  if (!C.materials[s.material]) s.material = C.materialOf(s.upperFront) || C.materialOf(s.front) || "lacquer";
  if (!C.TOPS[s.top]) s.top = DEFAULT.top;
  const lists = {profile:C.profiles, handle:C.handleTypes, finish:C.finishes, shape:C.shapes, uppers:C.uppersTypes, lower:C.lowerTypes,
    backsplash:C.backsplashes, floor:C.floors, pendants:C.pendants, hob:C.hobs, hood:C.hoods, fridge:C.fridges, islandFunc:C.islandFunctions,
    base:C.bases, hardware:hardwareNames, tier:tierNames};
  for (const [key, list] of Object.entries(lists)) if (!Object.hasOwn(list, s[key])) s[key] = DEFAULT[key];
  if (!/^#[0-9a-f]{6}$/i.test(s.wall)) s.wall = DEFAULT.wall;
  if (![0, 2, 3, 4].includes(Number(s.island.seats))) s.island.seats = 3;
  s.island.seats = Number(s.island.seats);
  for (const path of Object.keys(LIMITS)) set(path, clamp(path, get(path, s)), s);
  for (const [id, f] of Object.entries(s.furn)) for (const [key, d] of Object.entries(FURN_DEFAULTS[id])) if (typeof f[key] !== typeof d) f[key] = d;
  s.crown = !!s.crown;
  if (C.PAINTED_PROFILES.includes(s.profile) && s.material !== "lacquer") s.profile = "flat";
  if (!["all", "lower", "upper", "tall", "island"].includes(s.applyTo)) s.applyTo = "all";
  return s;
}
function clamp(path, value) {
  const [min, max] = LIMITS[path];
  const n = Number(value);
  if (value === "" || value === null || !Number.isFinite(n)) return Math.max(min, Math.min(max, Number(get(path, DEFAULT)) || min));
  return Math.round(Math.min(max, Math.max(min, n)));
}
function save() { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch { /* частен режим */ } }
function get(path, o = state) { return path.split(".").reduce((a, k) => a?.[k], o); }
function set(path, value, o = state) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((a, k) => a?.[k], o);
  if (target) target[last] = value;
}
const shareUrl = () => `${location.origin}${location.pathname}#p=${btoa(unescape(encodeURIComponent(JSON.stringify(state)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`;

function setMaterial(s, material) {
  s.material = material;
  for (const key of FRONT_KEYS) s[key] = C.nearestFront(s[key], material);
  return s;
}
function applyPalette(s, id) {
  const p = C.palettes[id];
  if (!p) return s;
  Object.assign(s, structuredClone(p.set), {palette:id});
  // Рамка или ламели изискват боядисан МДФ: гамата се показва в най-близките боядисани цветове.
  if (C.PAINTED_PROFILES.includes(s.profile) && s.material !== "lacquer") setMaterial(s, "lacquer");
  else setMaterial(s, s.material);
  return s;
}
function applyStyle(s, id) {
  const st = C.styles[id];
  Object.assign(s, structuredClone(st.set), {style:id});
  const layout = MODELS.kitchen[s.model]?.set || {};
  for (const key of ["uppers", "hood"]) if (key in layout) s[key] = layout[key];
  return applyPalette(s, st.palettes[0]);
}
// Модел = разпределение (кои шкафове и къде). Стилът и цветовете остават.
function applyModel(s, id) {
  if (s.type === "kitchen") {
    const m = MODELS.kitchen[id], st = C.styles[s.style].set;
    s.uppers = st.uppers; s.hood = st.hood; s.pantry = DEFAULT.pantry;
    Object.assign(s, structuredClone(m.set), {model:id});
    if (s.islandFunc !== "hob" && s.hood === "ceiling") s.hood = "integrated";
  } else {
    const f = s.furn[s.type];
    Object.assign(f, structuredClone(FURN_DEFAULTS[s.type]), structuredClone(MODELS[s.type][id].set), {model:id, width:f.width, A:f.A, B:f.B});
    for (const key of ["width", "A", "B"]) if (f[key] === undefined) delete f[key];
  }
  return s;
}

// --- Контроли ---
const pressed = (a, b) => `aria-pressed="${a === b}"`;
const cards = (key, options, icons = {}, box, type = "") => `<div class="cards">${Object.entries(options).map(([id, label]) => {
  const on = String(get(key)) === String(id);
  return `<button type="button" class="card" data-key="${key}" data-value="${id}" data-type="${type}" aria-pressed="${on}">${icons[id] ? icon(icons[id], box) : ""}<span>${esc(label)}</span></button>`;
}).join("")}</div>`;
const chips = (key, options, type = "") => `<div class="chips">${Object.entries(options).map(([id, label]) => {
  const on = String(get(key)) === String(id);
  return `<button type="button" class="chip" data-key="${key}" data-value="${id}" data-type="${type}" aria-pressed="${on}">${esc(label)}</button>`;
}).join("")}</div>`;
const toggle = (key, label, note = "") => `<button type="button" class="switch" role="switch" data-toggle="${key}" aria-checked="${!!get(key)}"><span>${esc(label)}${note ? `<small>${esc(note)}</small>` : ""}</span><i></i></button>`;
const thumb = item => item.tex ? `background-image:url(${C.TEX}thumb/${item.tex.replace("_diff", "")}.webp);background-color:${item.hex}` : `background:${item.hex}`;
const named = (items, attr, current) => `<div class="swatches named">${items.map(it =>
  `<button type="button" class="swatch" ${attr(it)} title="${esc(it.name)}" aria-pressed="${current === it.id}"><span style="${thumb(it)}"></span>${esc(it.short || it.name)}</button>`).join("")}</div>`;
const number = (path, label) => `<label class="field">${esc(label)}<input type="number" inputmode="numeric" data-path="${path}" min="${LIMITS[path][0]}" max="${LIMITS[path][1]}" step="5" value="${get(path)}"><small>${LIMITS[path][0]}–${LIMITS[path][1]} см</small></label>`;
let showAllPalettes = false, showAllTops = false;
const POPULAR_TOPS = ["calacatta","statuario","levanto","travertine","concrete","nero","ceramic-white","ceramic-black","oak","walnut"];
const woods = () => C.fronts.filter(f => C.WOOD_GROUPS.includes(f.group));
const materialColors = () => C.fronts.filter(f => f.group === C.materials[state.material].group);
const hex = id => C.FRONTS[id]?.hex || "#cccccc";

// Скици: текущият модел (разпределение) в избрания стил и гама. Всеки модел рисува себе си (js/models/*.meta.js).
const currentModel = (type = state.type) => type === "kitchen" ? state.model : state.furn[type].model;
function sketch(type, styleId, paletteId, modelId = currentModel(type)) {
  const p = C.palettes[paletteId].set, models = MODELS[type];
  const m = models[modelId] || models[firstModel(type)];
  const st = {...C.styles[styleId].set};
  if (type === "kitchen" && m.set?.uppers) st.uppers = m.set.uppers;
  const woodId = [p.fAccent, p.tallFront, p.islandFront, p.upperFront, p.front].find(C.isWood) || "egger-H1180";
  const c = {lower:hex(p.front), upper:hex(p.upperFront), tall:hex(p.tallFront), island:hex(p.islandFront), main:hex(p.fMain), accent:hex(p.fAccent), wood:hex(woodId),
    metal:C.finishes[p.finish].hex, top:C.TOPS[p.top]?.hex || "#eeeeee", wall:p.wall};
  const K = makeKit(st, c, C.isWood(p.fAccent));
  (m.sketch || models[firstModel(type)].sketch)(K);
  return K.svg();
}
const sketchPalette = () => state.palette || C.styles[state.style].palettes[0];

// Мини кръгче на гамата: основен цвят, акцент и плот.
const paletteDot = id => {
  const s = C.palettes[id].set;
  const [a, b, d] = isKitchen() ? [hex(s.front), hex(s.upperFront), C.TOPS[s.top]?.hex || "#eee"] : [hex(s.fMain), hex(s.fAccent), hex(s.fAccent)];
  return `<i style="background:conic-gradient(${a} 0 50%, ${b} 0 ${isKitchen() ? 78 : 100}%, ${d} 0)"></i>`;
};
const paletteCard = id => {
  const p = C.palettes[id];
  return `<button type="button" class="palette" data-palette="${id}" ${pressed(state.palette, id)}>${sketch(state.type, state.style, id)}<strong>${esc(p.name)}</strong>${isKitchen() ? `<small>${esc(p.text)}</small>` : ""}</button>`;
};

// --- Стъпки ---
const styleStep = ["Стил", () => {
  const st = C.styles[state.style];
  const list = showAllPalettes ? Object.keys(C.palettes) : st.palettes;
  const handles = isKitchen() ? C.handleTypes : {...C.handleTypes, gola:"Без дръжки"};
  return `<h2>Стил</h2><p class="hint">Изберете стил и цветова гама. Скиците показват ${isKitchen() ? "кухнята" : `${FURN_NAMES[state.type].toLowerCase()}`} във всяка гама.</p>
    <h3>Цветова гама · ${esc(st.name)}</h3>
    <div class="palettes">${list.map(paletteCard).join("")}</div>
    <button type="button" class="more-btn" data-action="all-palettes">${showAllPalettes ? "Само гамите за този стил" : `Всички ${Object.keys(C.palettes).length} гами в този стил`}</button>
    <h3>Стил</h3>
    <div class="styles">${Object.entries(C.styles).map(([id, x]) => `<button type="button" class="style" data-style="${id}" ${pressed(state.style, id)}>${sketch(state.type, id, x.palettes[0])}<strong>${esc(x.name)}</strong><small>${esc(isKitchen() ? x.text : x.furnText)}</small><span class="pal-dots">${x.palettes.map(paletteDot).join("")}</span></button>`).join("")}</div>
    <h3>Материал на вратите</h3>
    <div class="materials">${Object.entries(C.materials).map(([id, m]) => {
      const sample = C.fronts.filter(f => f.group === m.group).slice(0, 4).map(f => `<i style="background:${f.hex}"></i>`).join("");
      return `<button type="button" class="material" data-material="${id}" ${pressed(state.material, id)}><span class="dots small">${sample}</span><strong>${esc(m.name)}</strong><b>${esc(m.sub)}</b><small>${esc(m.text)}</small></button>`;
    }).join("")}</div>
    <h3>Вид на вратите</h3>${cards("profile", C.profiles, profileIcons)}
    <p class="hint">Рамките, фрезовките и ламелите се правят от боядисан МДФ.</p>
    <h3>Дръжки</h3>${cards("handle", handles, handleIcons)}
    <h3>Отдолу и отгоре</h3>${cards("base", C.bases, baseIcons)}
    <div class="switches" style="margin-top:8px">${toggle("crown", "Корниз отгоре", "Класически завършек на горните шкафове")}</div>`;
}];

const modelStep = ["Модел", () => {
  const models = MODELS[state.type];
  return `<h2>Модел</h2><p class="hint">Изберете разпределението: кои шкафове има и къде са. Стила, цветовете и размерите променяте в следващите стъпки.</p>
    <div class="models">${Object.entries(models).map(([id, m]) => `<button type="button" class="model" data-model="${id}" ${pressed(currentModel(), id)}>${sketch(state.type, state.style, sketchPalette(), id)}<strong>${esc(m.name)}</strong><small>${esc(m.text)}</small></button>`).join("")}</div>`;
}];

const colorSwatches = (keys, current) => {
  const m = C.materials[state.material];
  return `<h3>${esc(m.name)} · ${esc(m.sub)}</h3>${named(materialColors(), f => `data-front="${f.id}"`, current)}
    <h3>Дървесни декори</h3>${named(woods(), f => `data-front="${f.id}"`, current)}
    <p class="hint">Материалът се сменя в стъпка „Стил“. <button type="button" class="link" data-step="0">Сменете материала</button></p>`;
};
const metalsAndWalls = () => `<h3>Цвят на металите</h3>${named(Object.entries(C.finishes).map(([id, f]) => ({id, name:f.name, hex:f.hex})), f => `data-key="finish" data-value="${f.id}"`, state.finish)}
  <h3>Стени</h3>${named(Object.entries(C.walls).map(([h, name]) => ({id:h, name, hex:h})), w => `data-key="wall" data-value="${w.id}"`, state.wall)}`;

const kitchenSteps = [
  modelStep,
  styleStep,
  ["Размери", () => {
    const L = state.shape.startsWith("L") || state.shape === "U", U = state.shape === "U", island = state.shape.includes("island");
    return `<h2>Размери</h2><p class="hint">Въведете дължината на всяка стена в сантиметри. Точните размери взимаме на място.</p>
      <div class="fields">${number("walls.A", "Стена A (основна)")}${L ? number("walls.B", "Стена B (лява)") : ""}${U ? number("walls.C", "Стена C (дясна)") : ""}
      ${island ? number("island.len", "Остров – дължина") + number("island.depth", "Остров – дълбочина") : ""}${number("height", "Височина на стаята")}</div>`;
  }],
  ["Цветове", () => {
    const target = state.applyTo;
    const current = {all:state.front, lower:state.front, upper:state.upperFront, tall:state.tallFront, island:state.islandFront}[target];
    const topList = showAllTops ? C.tops : POPULAR_TOPS.map(id => C.TOPS[id]);
    const zones = {all:"Цялата кухня", lower:"Долни", upper:"Горни", tall:"Колони", ...(state.shape.includes("island") ? {island:"Остров"} : {})};
    return `<h2>Цветове</h2><p class="hint">Изберете за коя част е цветът и докоснете мостра.</p>
      <div class="segmented">${Object.entries(zones).map(([id, label]) => `<button type="button" data-key="applyTo" data-value="${id}" ${pressed(target, id)}>${label}</button>`).join("")}</div>
      ${colorSwatches(target, current)}
      <h3>Плот</h3>${named(topList, t => `data-key="top" data-value="${t.id}"`, state.top)}
      <button type="button" class="more-btn" data-action="all-tops">${showAllTops ? "Само избраните плотове" : `Всички ${C.tops.length} плота`}</button>
      ${metalsAndWalls()}`;
  }],
  ["Уреди", () => {
    const island = state.shape.includes("island");
    return `<h2>Шкафове и уреди</h2><p class="hint">Включете само това, което Ви трябва.</p>
      <h3>Горни шкафове</h3>${cards("uppers", C.uppersTypes)}
      <h3>Долни шкафове</h3>${cards("lower", C.lowerTypes)}
      ${island ? `<h3>Островът</h3>${cards("islandFunc", C.islandFunctions)}<h3>Места за сядане</h3>${chips("island.seats", C.seatsOptions, "num")}
        <div class="switches" style="margin-top:10px">${toggle("waterfall", "Плотът слиза до пода (водопад)")}</div>` : ""}
      <h3>Уреди</h3><div class="switches">${toggle("oven", "Фурна")}${state.oven ? toggle("ovenTall", "Фурната на удобна височина") : ""}${toggle("microwave", "Микровълнова")}${toggle("dishwasher", "Съдомиялна")}${toggle("pantry", "Висок шкаф-килер")}${state.shape !== "I" && state.shape !== "I+island" ? toggle("cornerUnit", "Въртящ се ъглов механизъм") : ""}</div>
      <h3>Хладилник</h3>${cards("fridge", C.fridges)}
      <h3>Плот за готвене</h3>${cards("hob", C.hobs)}
      <h3>Аспиратор</h3>${cards("hood", Object.fromEntries(Object.entries(C.hoods).filter(([id]) => id !== "ceiling" || (island && state.islandFunc === "hob"))))}`;
  }],
  ["Детайли", () => {
    const island = state.shape.includes("island");
    return `<h2>Светлина и детайли</h2>
      <h3>Светлина</h3><div class="switches">${toggle("ledUnder", "LED под горните шкафове")}${toggle("ledPlinth", "LED в цокъла")}${toggle("ledShelves", "LED във витрините")}</div>
      ${island ? `<h3>Лампи над острова</h3>${cards("pendants", C.pendants)}` : ""}
      <h3>Гръб между плота и шкафовете</h3>${cards("backsplash", C.backsplashes)}
      <h3>Под</h3>${cards("floor", C.floors)}
      <h3>Обков (панти и водачи)</h3>${chips("hardware", Object.fromEntries(Object.entries(hardwareNames).filter(([id]) => id !== "basic")))}`;
  }],
];

// Мебели извън кухнята.
const FURN_OPTIONS = {
  doors:{hinged:"Врати на панти", sliding:"Плъзгащи врати", mirror:"Плъзгащи с огледало"},
  shape:{I:"По една стена", L:"Г-образна", U:"П-образна"},
  bed:{"140":"Легло 140 × 200", "160":"Легло 160 × 200", "180":"Легло 180 × 200"},
  head:{upholstered:"Мека тапицирана", wood:"Дървена", panel:"Ламели"},
  stands:{floating:"Висящи шкафчета", standing:"Стоящи шкафчета", none:"Без шкафчета"},
  panel:{slats:"Панел с ламели", stone:"Каменен панел", none:"Без панел"},
  side:{shelves:"Рафтове отстрани", tall:"Висок шкаф отстрани", none:"Само шкаф за ТВ"},
  upper:{open:"Отворени рафтове", cabinets:"Шкафове с врати"},
};
const FURN_TOGGLES = {
  ceiling:"До тавана", led:"LED осветление", island:"Остров с чекмеджета в средата", storage:"Ракла под леглото",
  closet:"Висок шкаф за дрехи", bench:"Пейка с шкаф за обувки", mirror:"Голямо огледало", tall:"Висок шкаф с рафтове",
};
const FURN_LAYOUT = {
  wardrobe:[], walkin:[], bedroom:[["bed", "Легло"], ["head", "Табла"]], tv:[], entry:[], office:[],
};
const FURN_SWITCHES_BY_MODEL = {entry:{closetBench:["closet", "bench", "mirror", "led"]}, office:{shelves:["tall", "led"], cabinets:["tall", "led"]}, walkin:{Lisland:["island", "led"], U:["island", "led"], glass:["island", "led"]}};
const FURN_SWITCHES_BASE = {wardrobe:["ceiling", "led"], walkin:["led"], bedroom:["storage", "led"], tv:["led"], entry:["led"], office:["led"]};
const furnSwitches = (type = state.type) => FURN_SWITCHES_BY_MODEL[type]?.[state.furn[type].model] || FURN_SWITCHES_BASE[type];
const FURN_HINT = {
  wardrobe:"Въведете ширината на стената. Вътрешността разпределяме по Ваше желание, с „Отвори“ я виждате.",
  walkin:"Въведете дължината на стените. Точните размери взимаме на място.",
  bedroom:"Въведете ширината на стената зад леглото.",
  tv:"Въведете ширината на стената за ТВ.",
  entry:"Въведете ширината на стената в антрето.",
  office:"Въведете ширината на стената за бюрото.",
};

const furnSteps = [
  modelStep,
  styleStep,
  ["Размери", () => {
    const type = state.type, f = state.furn[type];
    const sizes = type === "walkin" ? number(`${F()}.A`, "Стена A (основна)") + (f.shape !== "I" ? number(`${F()}.B`, "Стена B (странична)") : "") : number(`${F()}.width`, "Ширина на стената");
    return `<h2>${FURN_NAMES[type]}</h2><p class="hint">${FURN_HINT[type]}</p>
      <div class="fields">${sizes}${number("height", "Височина на стаята")}</div>
      ${FURN_LAYOUT[type].map(([key, title]) => `<h3>${title}</h3>${cards(`${F()}.${key}`, FURN_OPTIONS[key])}`).join("")}`;
  }],
  ["Цветове", () => {
    const target = state.applyTo === "tall" ? "tall" : "lower";
    const key = target === "tall" ? "fAccent" : "fMain";
    const stone = state.type === "tv" && fv("panel") === "stone";
    return `<h2>Цветове</h2><p class="hint">Основният цвят е за вратите и чекмеджетата. Акцентът е за панели, рафтове и плотове.</p>
      <div class="segmented">${[["lower", "Основен цвят"], ["tall", "Акцент"]].map(([id, label]) => `<button type="button" data-key="applyTo" data-value="${id}" ${pressed(target, id)}>${label}</button>`).join("")}</div>
      ${colorSwatches(key, state[key])}
      ${stone ? `<h3>Каменен панел</h3>${named(POPULAR_TOPS.map(id => C.TOPS[id]), t => `data-key="top" data-value="${t.id}"`, state.top)}` : ""}
      ${metalsAndWalls()}`;
  }],
  ["Детайли", () => `<h2>Детайли</h2><p class="hint">Включете само това, което Ви трябва.</p>
    <div class="switches">${furnSwitches().map(key => toggle(`${F()}.${key}`, FURN_TOGGLES[key])).join("")}</div>
    <h3>Под</h3>${cards("floor", C.floors)}
    <h3>Обков (панти и водачи)</h3>${chips("hardware", Object.fromEntries(Object.entries(hardwareNames).filter(([id]) => id !== "basic")))}`],
];

// Последна стъпка: преглед на изборите и изпращане.
function recap() {
  const n = id => C.FRONTS[id]?.name || id;
  const st = C.styles[state.style], pal = C.palettes[state.palette], mat = C.materials[state.material];
  const common = [
    ["Модел", MODELS[state.type][currentModel()]?.name || "–"], ["Стил", st.name], ["Цветова гама", pal ? pal.name : "Собствена"], ["Материал", `${mat.name} (${mat.sub})`],
    ["Врати", `${C.profiles[state.profile]}${state.crown ? ", корниз" : ""}, ${C.bases[state.base].toLowerCase()}`],
    ["Дръжки", `${isKitchen() || state.handle !== "gola" ? C.handleTypes[state.handle] : "Без дръжки"}, ${C.finishes[state.finish].name.toLowerCase()}`],
  ];
  if (!isKitchen()) {
    const f = state.furn[state.type];
    const dims = state.type === "walkin" ? `стена A ${f.A} см${f.shape !== "I" ? `, стена B ${f.B} см` : ""}` : `ширина ${f.width} см`;
    const choices = [...FURN_LAYOUT[state.type].map(([key]) => FURN_OPTIONS[key][f[key]]), ...furnSwitches().filter(key => f[key]).map(key => FURN_TOGGLES[key])].filter(Boolean).join(", ");
    return [["Мебел", FURN_NAMES[state.type]], ["Размери", `${dims}; височина ${state.height} см`], ["Избори", choices || "–"], ...common,
      ["Цветове", `основен ${n(state.fMain)}, акцент ${n(state.fAccent)}`],
      ["Под и стени", `${C.floors[state.floor].toLowerCase()}; ${(C.walls[state.wall] || state.wall).toLowerCase()}`], ["Обков", hardwareNames[state.hardware]]];
  }
  const island = state.shape.includes("island");
  const walls = [`A ${state.walls.A} см`, ...(state.shape.startsWith("L") || state.shape === "U" ? [`B ${state.walls.B} см`] : []), ...(state.shape === "U" ? [`C ${state.walls.C} см`] : [])].join(", ");
  const yes = (v, label) => v ? label : "";
  return [
    ["Мебел", `Кухня, ${C.shapes[state.shape].toLowerCase()}`],
    ["Размери", `${walls}${island ? `; остров ${state.island.len} × ${state.island.depth} см, места: ${state.island.seats}` : ""}; височина ${state.height} см`],
    ...common,
    ["Фасади", `долни ${n(state.front)}, горни ${n(state.upperFront)}, колони ${n(state.tallFront)}${island ? `, остров ${n(state.islandFront)}` : ""}`],
    ["Плот", `${C.TOPS[state.top].name}${state.waterfall && island ? ", водопад" : ""}; гръб: ${C.backsplashes[state.backsplash].toLowerCase()}`],
    ["Шкафове", `горни: ${C.uppersTypes[state.uppers].toLowerCase()}; долни: ${C.lowerTypes[state.lower].toLowerCase()}`],
    ["Уреди", [yes(state.oven, state.ovenTall ? "фурна в колона" : "фурна"), yes(state.microwave, "микровълнова"), yes(state.dishwasher, "съдомиялна"), `хладилник ${C.fridges[state.fridge].toLowerCase()}`, C.hobs[state.hob].toLowerCase(), `аспиратор ${C.hoods[state.hood].toLowerCase()}`, yes(state.pantry, "килер")].filter(Boolean).join(", ")],
    ["Светлина", [yes(state.ledUnder, "LED под шкафовете"), yes(state.ledPlinth, "LED в цокъла"), yes(state.ledShelves, "LED във витрините")].filter(Boolean).join(", ") || "без LED"],
    ["Под и стени", `${C.floors[state.floor].toLowerCase()}; ${(C.walls[state.wall] || state.wall).toLowerCase()}`],
    ["Обков", hardwareNames[state.hardware]],
  ];
}
const priceBlock = () => {
  const r = price(state);
  return `<h3>Ориентировъчна цена с ДДС</h3><div class="tiers">${Object.entries(tierNames).map(([id, [label, text]]) => `<button type="button" class="tier" data-key="tier" data-value="${id}" ${pressed(state.tier, id)}>
    <span><strong>${label}</strong><small>${text}</small></span><b>${money(price(state, id).total)}</b></button>`).join("")}</div><p class="hint">Избрано: ${money(r.total)}, ориентировъчно с ДДС. Точната сума е в писмената оферта.</p>`;
};
const sendStep = ["Готово", () => `<h2>Вашият проект</h2><p class="hint">Проверете изборите и изпратете проекта. Ще Ви се обадим, за да уточним размерите и да Ви изпратим оферта.</p>
  <dl class="recap">${recap().map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join("")}</dl>
  ${SHOW_PRICES ? priceBlock() : ""}
  <ul class="facts"><li>Безплатна 2D картина на мебелта по снимка на Вашето помещение.</li><li>Платеният 3D проект и огледът на адрес се приспадат от цената на поръчката.</li>
    <li>Монтажът в София най-често е включен.</li><li>Срок ${OFFER.term} · гаранция ${OFFER.warranty}.</li></ul>
  <div class="actions"><button type="button" class="primary wide" data-action="quote">Изпратете проекта</button>
    <button type="button" class="secondary" data-action="share">Копирайте линк към проекта</button>
    <button type="button" class="secondary" data-action="download">Свалете снимка</button>
    <button type="button" class="ghost" data-action="idea">Имате своя идея? Изпратете ни я</button></div>`];
kitchenSteps.push(sendStep);
furnSteps.push(sendStep);

const dimsText = () => {
  if (isKitchen()) return cm(state.walls.A);
  const f = state.furn[state.type];
  return state.type === "walkin" ? `${FURN_OPTIONS.shape[f.shape]} · ${cm(f.A)}` : `Ширина ${cm(f.width)}`;
};

function render() {
  $("#types").innerHTML = types.map(([id, label, path]) => `<button type="button" class="type" data-furniture="${id}" aria-pressed="${state.type === id}">${icon(path, "0 0 24 24")}${label}</button>`).join("");
  const steps = isKitchen() ? kitchenSteps : furnSteps;
  if (step >= steps.length) step = steps.length - 1;
  $("#steps").innerHTML = steps.map(([label], i) => `<button type="button" data-step="${i}" ${i === step ? 'aria-current="step"' : ""}><b>${i + 1}</b>${label}</button>`).join("");
  const body = $("#panel");
  const scroll = body.scrollTop;
  body.innerHTML = steps[step][1]();
  body.scrollTop = scroll;
  $("#panel-foot").innerHTML = `${step ? `<button type="button" data-step="${step - 1}">← Назад</button>` : "<span></span>"}${step < steps.length - 1 ? `<button type="button" class="primary" data-step="${step + 1}">Напред →</button>` : `<button type="button" class="primary" data-action="quote">Изпратете проекта</button>`}`;
  const st = C.styles[state.style], pal = C.palettes[state.palette];
  $("#stage-name").textContent = st.name;
  $("#stage-text").textContent = `${pal ? pal.name : "Собствена гама"} · ${C.materials[state.material].name}`;
  $("#stage-palettes").innerHTML = `<span>Гама</span>${st.palettes.map(id => `<button type="button" data-palette="${id}" title="${esc(C.palettes[id].name)}" aria-label="Гама ${esc(C.palettes[id].name)}" ${pressed(state.palette, id)}>${paletteDot(id)}</button>`).join("")}`;
  if (SHOW_PRICES) {
    showPrice(price(state).total);
    $("#tier-label").textContent = `${isKitchen() ? "Кухня" : FURN_NAMES[state.type]} · ${MODELS[state.type][currentModel()]?.name || ""} · ${dimsText()}`;
  } else {
    $("#price").textContent = isKitchen() ? "Кухня" : FURN_NAMES[state.type];
    $("#tier-label").textContent = dimsText();
  }
}

// Цената „брои“ до новата сума, вместо да скача.
let shownPrice = null, priceFrame = 0;
function showPrice(total) {
  const el = $("#price");
  if (shownPrice === null || matchMedia("(prefers-reduced-motion: reduce)").matches) { shownPrice = total; el.textContent = money(total); return; }
  if (Math.round(shownPrice) === total) return;
  const from = shownPrice, start = performance.now(), dur = 750;
  el.classList.remove("up", "down");
  void el.offsetWidth;
  el.classList.add(total > from ? "up" : "down");
  cancelAnimationFrame(priceFrame);
  const tick = now => {
    const t = Math.min(1, (now - start)/dur), e = 1 - Math.pow(1 - t, 3);
    shownPrice = from + (total - from)*e;
    el.textContent = money(shownPrice);
    if (t < 1) priceFrame = requestAnimationFrame(tick);
  };
  priceFrame = requestAnimationFrame(tick);
}

let buildTimer = 0;
function changed(rebuild = true) {
  save();
  render();
  if (!rebuild || !showroom) return;
  clearTimeout(buildTimer);
  buildTimer = setTimeout(() => showroom.build(state), 30);
}

const parse = (value, type) => type === "num" ? Number(value) : value;
const COLOR_KEYS = ["top", "finish", "wall"];
const UI_KEYS = ["applyTo", "tier", "hardware"];
document.addEventListener("click", event => {
  const el = event.target.closest("button,[data-action]");
  if (!el) return;
  if (el.dataset.step !== undefined) { step = Number(el.dataset.step); render(); $("#panel").scrollTop = 0; return; }
  if (el.dataset.furniture) {
    if (state.type !== el.dataset.furniture) { state.type = el.dataset.furniture; step = 0; state.applyTo = isKitchen() ? "all" : "lower"; changed(); $("#panel").scrollTop = 0; }
    return;
  }
  if (el.dataset.action === "all-palettes") { showAllPalettes = !showAllPalettes; render(); return; }
  if (el.dataset.action === "all-tops") { showAllTops = !showAllTops; render(); return; }
  if (el.dataset.model) { applyModel(state, el.dataset.model); changed(); return; }
  if (el.dataset.style) { applyStyle(state, el.dataset.style); showAllPalettes = false; changed(); $("#panel").scrollTo({top:0, behavior:"smooth"}); return; }
  if (el.dataset.palette) { applyPalette(state, el.dataset.palette); changed(); return; }
  if (el.dataset.material) {
    if (state.material === el.dataset.material) return;
    setMaterial(state, el.dataset.material);
    state.palette = "";
    if (state.material !== "lacquer" && C.PAINTED_PROFILES.includes(state.profile)) { state.profile = "flat"; toast("Рамки и ламели има само при боядисания МДФ, затова вратите са гладки."); }
    changed();
    return;
  }
  if (el.dataset.front) {
    const map = isKitchen() ? {all:["front","upperFront","tallFront","islandFront"], lower:["front"], upper:["upperFront"], tall:["tallFront"], island:["islandFront"]} : {lower:["fMain"], tall:["fAccent"]};
    for (const key of map[state.applyTo] || map.lower) state[key] = el.dataset.front;
    state.palette = "";
    changed();
    return;
  }
  if (el.dataset.key) {
    const key = el.dataset.key, value = parse(el.dataset.value, el.dataset.type);
    set(key, value);
    if (COLOR_KEYS.includes(key)) state.palette = "";
    if (key === "profile" && C.PAINTED_PROFILES.includes(value) && state.material !== "lacquer") {
      setMaterial(state, "lacquer");
      toast("Рамките и ламелите се правят от боядисан МДФ, затова материалът е сменен.");
    }
    if (key === "islandFunc" && state.islandFunc !== "hob" && state.hood === "ceiling") state.hood = "integrated";
    changed(!UI_KEYS.includes(key));
    return;
  }
  if (el.dataset.toggle) { set(el.dataset.toggle, !get(el.dataset.toggle)); changed(); return; }
  if (el.dataset.view) {
    document.querySelectorAll("[data-view]").forEach(b => b.setAttribute("aria-pressed", String(b === el)));
    showroom?.setView(el.dataset.view);
    return;
  }
  if (el.id === "evening") { const on = el.getAttribute("aria-pressed") !== "true"; el.setAttribute("aria-pressed", String(on)); showroom?.setEvening(on); return; }
  if (el.id === "open") { const on = showroom?.toggleOpen(); el.setAttribute("aria-pressed", String(!!on)); return; }
  const action = el.dataset.action || {"quote-open":"quote", "idea-open":"idea"}[el.id];
  if (action === "quote" || action === "idea") openQuote(action === "idea" ? "idea" : "project");
  if (action === "share") share();
  if (action === "download") download();
  if (el.id === "quote-close") $("#quote").close();
});
$("#panel").addEventListener("change", event => {
  const input = event.target;
  if (!input.dataset.path) return;
  set(input.dataset.path, clamp(input.dataset.path, input.value));
  changed();
});
$("#panel").addEventListener("keydown", event => {
  if (event.key === "Enter" && event.target.dataset?.path) event.target.blur();
});

async function share() {
  const url = shareUrl();
  try { await navigator.clipboard.writeText(url); toast("Линкът към проекта е копиран."); }
  catch { try { history.replaceState(null, "", url); toast("Копирането не е разрешено тук. Линкът е в полето за адрес."); } catch { toast("Копирането не е разрешено на това устройство."); } }
}
function download() {
  if (!showroom) return;
  const link = document.createElement("a");
  link.href = showroom.snapshot();
  link.download = `DEM-${state.type}.jpg`;
  link.click();
}
function toast(text) {
  const t = $("#toast");
  t.textContent = text;
  t.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { t.hidden = true; }, 3200);
}

// Текстът, който стига до нас: всички избори и линк към проекта.
function summary() {
  const lines = recap().map(([label, value]) => `${label}: ${value}`);
  if (SHOW_PRICES) lines.push(`Ориентировъчно: ${money(price(state).total)} с ДДС (ниво ${tierNames[state.tier][0]})`);
  return ["3D конфигуратор", ...lines, `Линк към проекта: ${shareUrl()}`].join("\n");
}

function openQuote(mode) {
  quoteMode = mode;
  const project = mode === "project" && !!showroom;
  $("#quote-title").textContent = mode === "project" ? "Изпратете проекта" : "Изпратете ни Вашата идея";
  $("#shot").hidden = !project;
  $("#quote-lead").textContent = mode === "project"
    ? "Снимката и всички избори стигат до нас заедно със запитването. Ще Ви се обадим, за да уточним детайлите и да Ви изпратим оферта."
    : "Ако идеята Ви е по-сложна от конфигуратора, опишете я и прикачете скица, снимка или план. Ще Ви се обадим с предложение.";
  $("#notes-text").textContent = mode === "project" ? "Бележки" : "Опишете идеята";
  $("#quote-status").textContent = "";
  $("#quote-status").classList.remove("ok");
  if (project) {
    $("#shot-img").src = showroom.snapshot();
    const pal = C.palettes[state.palette];
    $("#shot-text").textContent = `${isKitchen() ? "Кухня" : FURN_NAMES[state.type]} · ${C.styles[state.style].name} · ${pal ? pal.name : "собствена гама"}`;
  }
  $("#quote").showModal();
}

// Снимките се смаляват до ~1600 px JPEG: формата на сайта приема до 5 снимки, всяка под 1,5 MB, общо до 4 MB.
const MAX_PHOTOS = 5, PHOTO_LIMIT = 1.45*1024*1024, PHOTOS_TOTAL = 3.9*1024*1024;
async function shrink(blob, name, max = 1600, quality = .82) {
  if (blob.size < 600*1024 && /jpe?g/.test(blob.type)) return new File([blob], name, {type:blob.type});
  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise((ok, fail) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fail; i.src = url; });
    let w = img.naturalWidth, h = img.naturalHeight;
    const scale = Math.min(1, max/Math.max(w, h));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(w*scale); canvas.height = Math.round(h*scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    let out = await new Promise(ok => canvas.toBlob(ok, "image/jpeg", quality));
    if (out && out.size > PHOTO_LIMIT) out = await new Promise(ok => canvas.toBlob(ok, "image/jpeg", .65));
    return new File([out || blob], name.replace(/\.[^.]+$/, "") + ".jpg", {type:"image/jpeg"});
  } finally { URL.revokeObjectURL(url); }
}

$("#quote-form").addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = $("#quote-status");
  status.classList.remove("ok");
  const name = form.elements.name.value.trim(), phone = form.elements.phone.value.trim(), notes = form.elements.notes.value.trim();
  if (name.length < 2 || phone.replace(/\D/g, "").length < 8) { status.textContent = "Моля, въведете име и телефон за връзка."; (name.length >= 2 ? form.elements.phone : form.elements.name).focus(); return; }
  if (quoteMode === "idea" && !notes && !form.elements.photos.files.length) { status.textContent = "Опишете идеята или прикачете снимка или скица."; form.elements.notes.focus(); return; }
  const email = form.elements.email.value.trim();
  if (email && !form.elements.email.checkValidity()) { status.textContent = "Проверете имейла или го оставете празен."; return; }
  const files = [...form.elements.photos.files].filter(f => f.type.startsWith("image/"));
  const room = quoteMode === "project" ? MAX_PHOTOS - 1 : MAX_PHOTOS;
  if (files.length > room) { status.textContent = `Добавете до ${room} снимки.`; return; }
  const data = new FormData();
  data.append("honeypot", form.elements.honeypot.value);
  data.append("name", name);
  data.append("phone", phone);
  data.append("email", email);
  data.append("city", form.elements.city.value);
  data.append("service", isKitchen() ? "Кухня по поръчка" : `${FURN_NAMES[state.type]} по поръчка`);
  const picture = form.elements.picture.checked ? "Иска безплатна 2D картина по снимката.\n" : "";
  const head = quoteMode === "idea" ? "Идея от клиента (бутон „Имате своя идея?“)\n" : "";
  data.append("message", head + picture + (quoteMode === "project" ? summary() : "") + (notes ? `\n\n${quoteMode === "idea" ? "Идея" : "Бележки"}: ${notes}` : ""));
  data.append("source_page", `3D конфигуратор (${location.pathname})`);
  const submit = form.querySelector("[type=submit]");
  submit.disabled = true;
  status.textContent = "Изпращаме…";
  try {
    const photos = [];
    if (quoteMode === "project" && showroom) photos.push(await shrink(await (await fetch(showroom.snapshot())).blob(), `proekt-${state.type}.jpg`));
    for (const file of files) photos.push(await shrink(file, file.name));
    let total = 0;
    for (const photo of photos) { if (photo.size > PHOTO_LIMIT || total + photo.size > PHOTOS_TOTAL) continue; total += photo.size; data.append("photos", photo); }
    if (!INQUIRY_LIVE) {
      console.info("[3D конфигуратор] Преглед, нищо не е изпратено:", Object.fromEntries([...data.entries()].filter(([k]) => k !== "photos")), data.getAll("photos").map(f => f.size));
      status.textContent = "Това е преглед и запитването не е изпратено. На сайта то стига директно до нас.";
      status.classList.add("ok");
      return;
    }
    const response = await fetch(INQUIRY_ENDPOINT, {method:"POST", body:data});
    if (!response.ok) { const reply = await response.json().catch(() => ({})); throw new Error(typeof reply.error === "string" && /[а-я]/i.test(reply.error) ? reply.error : ""); }
    status.textContent = "Благодарим! Получихме запитването и ще Ви се обадим.";
    status.classList.add("ok");
    form.reset();
    window.dataLayer?.push({event:"generate_lead", lead_source:`konfigurator-${quoteMode}`});
  } catch (error) {
    status.textContent = `${error?.message ? `${error.message}. ` : ""}Запитването не се изпрати. Обадете се на ${OFFER.phone} или опитайте отново.`;
  } finally {
    submit.disabled = false;
  }
});

render();
try {
  showroom = new Showroom($("#viewport"));
  showroom.build(state);
  window.DEM = {showroom, state:() => state, set:(patch) => { Object.assign(state, patch); changed(); }, style:id => { applyStyle(state, id); changed(); }};
  setTimeout(() => { $("#loading").style.opacity = 0; setTimeout(() => $("#loading").remove(), 600); }, 350);
  setTimeout(() => { $("#drag-hint").style.opacity = 0; }, 6000);
} catch (error) {
  console.error(error);
  $("#loading").textContent = "3D изгледът не се зареди на това устройство. Можете да изпратите идеята си с бутона горе.";
}
