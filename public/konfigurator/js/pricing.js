// Цени в евро с ДДС. По решение на собственика (26.11) всички мебели, и кухнята, са по ставките на
// калкулатора, взет за пример (сверени на 19.11.2026). Мебелистът ще ги уточни – всичко е тук.
import {FRONTS, TOPS} from "./catalog.js";

export const RATES = {
  front:{chip:45, foil:75, pet:95, painted:140, hpl:165, veneer:180},  // €/м² лице
  body:32, back:5, labour:.18, vat:.20,                               // корпус и гръб €/м²
  top:{post:85, compact:180, quartz:320, granite:350, wood:240},      // €/л.м. плот
  hardware:{basic:[1.8,9], gtv:[2.8,14], hettich:[4.5,24], grass:[5.2,28], blum:[5.8,30]}, // € панта, € водач
  devices:{oven:100, microwave:80, dish60:120, dish45:100, induction:90, gas:70, hood:90, fridge:180},
  extras:{light:150, soft:90, pvc:200, tower:300, frame:220, corner:250},
  shape:{straight:1, corner:1.10, u:1.25, island:1.40},
};
export const hardwareNames = {blum:"Blum", grass:"Grass", hettich:"Hettich", gtv:"GTV", basic:"Базов"};
export const tierNames = {top:["Премиум","Поне боядисан МДФ, Blum и кварц"], standard:["Стандарт","Материалите и обковът по Ваш избор"], basic:["Основен","Вашите фасади с обков GTV и постформинг"]};
export const OFFER = {design3d:100, design3dOther:50, visit:50, term:"4–6 седмици", warranty:"5 години на корпуса", phone:"0876 081 199", phoneHref:"tel:+359876081199"};

// Дължини на кухнята в метри по стени и остров.
export function kitchenRuns(s) {
  const A = s.walls.A/100, B = s.walls.B/100, C = s.walls.C/100;
  const island = s.shape.includes("island") ? s.island.len/100 : 0;
  const L = s.shape.startsWith("L"), U = s.shape === "U";
  return {A, B:L || U ? B : 0, C:U ? C : 0, island};
}

function kitchenInput(s) {
  const r = kitchenRuns(s);
  const length = r.A + r.B + r.C + r.island;
  const shape = r.island ? "island" : s.shape === "U" ? "u" : s.shape.startsWith("L") ? "corner" : "straight";
  const rows = s.uppers === "none" ? "low" : s.uppers === "ceiling" ? "tall" : "both";
  const devices = [
    ...(s.oven ? ["oven"] : []), ...(s.microwave ? ["microwave"] : []), ...(s.dishwasher ? ["dish60"] : []),
    s.hob === "gas" ? "gas" : "induction", ...(s.hood !== "none" ? ["hood"] : []), ...(s.fridge === "integrated" ? ["fridge"] : []),
  ];
  const extras = [
    "soft", ...(s.ledUnder || s.ledPlinth || s.ledShelves ? ["light"] : []), ...(s.oven && s.ovenTall ? ["tower"] : []),
    ...(s.fridge === "integrated" ? ["frame"] : []), ...(s.cornerUnit && s.shape !== "I" && s.shape !== "I+island" ? ["corner"] : []),
  ];
  return {length, shape, rows, height:s.height, front:FRONTS[s.front]?.price || "painted", top:TOPS[s.top]?.price || "quartz", hardware:s.hardware || "blum", devices, extras};
}

// Площи [корпус, лице, гръб, плот, врати, чекмеджета] като в примера.
function measure(k) {
  const n = k.length * RATES.shape[k.shape];
  const h = k.height/100;
  if (k.rows === "low") return [1.46*n,.72*n,.72*n,.95*n,Math.round(1.5*n),Math.round(n)];
  if (k.rows === "tall") return [3.55*n*h/2.6,2.32*n*h/2.6,2.32*n*h/2.6,.95*n,Math.round(4*n),Math.round(n)];
  return [2.24*n,1.44*n,1.44*n,.95*n,Math.round(3*n),Math.round(n)];
}

export function kitchenPrice(s, tier = s.tier || "standard") {
  const k = kitchenInput(s);
  const [body,front,back,counter,doors,drawers] = measure(k);
  const frontCat = tier === "top" && RATES.front[k.front] < RATES.front.painted ? "painted" : k.front;
  const frontRate = RATES.front[frontCat];
  const hardwareId = tier === "basic" ? "gtv" : tier === "top" ? "blum" : k.hardware;
  const [hinge,slide] = RATES.hardware[hardwareId];
  const topCat = tier === "basic" ? "post" : tier === "top" && RATES.top[k.top] < RATES.top.quartz ? "quartz" : k.top;
  const lines = [
    ["Корпус", body*RATES.body, RATES.body, body, "м²"],
    ["Гръб", back*RATES.back, RATES.back, back, "м²"],
    ["Фасади", front*frontRate, frontRate, front, "м²"],
    [`Обков · ${hardwareNames[hardwareId]}`, doors*2*hinge + drawers*slide],
    ["Плот", counter*RATES.top[topCat], RATES.top[topCat], counter, "л.м."],
    ...k.devices.map(id => [`Вграждане · ${deviceNames[id]}`, RATES.devices[id]]),
  ];
  const subtotal = lines.reduce((sum,line) => sum + line[1], 0);
  lines.push(["Изработка", subtotal*RATES.labour]);
  for (const id of k.extras) lines.push([extraNames[id], RATES.extras[id]]);
  const net = lines.reduce((sum,line) => sum + line[1], 0);
  lines.push(["ДДС 20 %", net*RATES.vat]);
  return {total:Math.round(net*(1+RATES.vat)), lines, tier, metres:k.length, doors, drawers};
}

const deviceNames = {oven:"фурна", microwave:"микровълнова", dish60:"съдомиялна", dish45:"съдомиялна 45 см", induction:"индукционен плот", gas:"газов плот", hood:"аспиратор", fridge:"хладилник"};
const extraNames = {light:"LED осветление", soft:"Плавно затваряне", pvc:"PVC шкаф за мивка", tower:"Колона за уреди", frame:"Рамка за хладилник", corner:"Ъглов механизъм"};

import {MODELS} from "./models/index.js";

// Мебели извън кухнята: ставки на м² и на брой обков + 18 % изработка + ДДС (сверени 19.11.2026).
// Площите [корпус, лице, гръб, врати, чекмеджета] са по същия модел като в първия калкулатор.
export const FURN_NAMES = {wardrobe:"Гардероб", walkin:"Гардеробна", bedroom:"Спалня", tv:"ТВ стена", entry:"Антре", office:"Домашен офис"};
export function furnitureLength(s) {
  const f = s.furn?.[s.type] || {};
  if (s.type === "walkin") return (f.A + (f.shape === "I" ? 0 : f.B) + (f.shape === "U" ? f.B : 0))/100;
  return (f.width || 200)/100;
}
// Моделите могат да добавят площи и обков: extra(n, h, f) → [корпус, лице, гръб м², врати, чекмеджета].
function furnitureMeasure(s) {
  const base = baseMeasure(s);
  const f = s.furn?.[s.type] || {};
  const extra = MODELS[s.type]?.[f.model]?.extra?.(furnitureLength(s), s.height/100, f);
  return extra ? base.map((v, i) => Math.max(0, v + (extra[i] || 0))) : base;
}
function baseMeasure(s) {
  const f = s.furn?.[s.type] || {};
  const n = furnitureLength(s), h = s.height/100;
  if (s.type === "tv") return [.8*n, .5*n, .5*n, Math.round(1.33*n), Math.round(.67*n)];
  if (s.type === "office") return [1.8*n, n, 1.2*n, Math.round(n), Math.round(n)];
  if (s.type === "entry") { const u = Math.min(h, 2.6); return [n*u*1.2, n*u*.8, n*u*.8, Math.round(1.2*n), Math.round(.5*n)]; }
  if (s.type === "bedroom") {
    const bw = Number(f.bed || 160)/100 + .08, bl = 2.08, storage = !!f.storage, panel = f.head === "panel";
    const fh = storage ? .42 : .30, ph = panel ? Math.min(h, 2.6) - .1 : 1.2, pw = panel ? n : bw + .2;
    const stands = f.stands === "none" ? 0 : 2;
    return [(2*bl + 2*bw)*fh + (storage ? bw*bl : 0) + stands*.75, pw*ph + stands*.18, bw*bl, 0, stands*2];
  }
  const u = s.type === "wardrobe" && f.ceiling ? h : Math.min(h, 2.6);
  return [n*u*1.45, n*u, n*u, Math.round((s.type === "walkin" ? 1.33 : 1.67)*n), Math.round(.67*n)];
}
export function furniturePrice(s, tier = s.tier || "standard") {
  const f = s.furn?.[s.type] || {};
  const [body, front, back, doors, drawers] = furnitureMeasure(s);
  const cat = FRONTS[s.fMain || s.front]?.price || "chip";
  const frontCat = tier === "top" && RATES.front[cat] < RATES.front.painted ? "painted" : cat;
  const frontRate = RATES.front[frontCat];
  const hardwareId = tier === "basic" ? "gtv" : tier === "top" ? "blum" : s.hardware || "blum";
  const [hinge, slide] = RATES.hardware[hardwareId];
  const lines = [
    ["Корпус", body*RATES.body, RATES.body, body, "м²"],
    ["Гръб", back*RATES.back, RATES.back, back, "м²"],
    ["Лице", front*frontRate, frontRate, front, "м²"],
    [`Обков · ${hardwareNames[hardwareId]}`, doors*2*hinge + drawers*slide],
  ];
  const subtotal = lines.reduce((sum, line) => sum + line[1], 0);
  lines.push(["Изработка", subtotal*RATES.labour]);
  lines.push([extraNames.soft, RATES.extras.soft]);
  if (f.led) lines.push([extraNames.light, RATES.extras.light]);
  const net = lines.reduce((sum, line) => sum + line[1], 0);
  lines.push(["ДДС 20 %", net*RATES.vat]);
  return {total:Math.round(net*(1 + RATES.vat)), lines, tier, metres:furnitureLength(s), doors, drawers};
}
export const price = (s, tier) => s.type === "kitchen" || !s.type ? kitchenPrice(s, tier) : furniturePrice(s, tier);
