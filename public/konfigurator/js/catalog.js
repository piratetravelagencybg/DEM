// Каталог на материалите и колекциите за калкулатора v2.
// price = категория за цената (виж pricing.js): chip ПДЧ, foil МДФ фолио, pet PET гланц, painted лак, hpl супермат, veneer фурнир.
// size = физически размер на текстурата в метри [ширина, височина].
export const TEX = "./assets/tex/";

const egger = (code, name, hex) => ({id:`egger-${code}`, group:"egger", code, name:`${code} ${name}`, short:name, hex, tex:`egger_${code}`, size:[1.3,2.8], price:"chip", finish:"wood"});
const uni = (code, name, hex) => ({id:`uni-${code}`, group:"uni", code, name:`${code} ${name}`, short:name, hex, price:"chip", finish:"matte"});
const lacquer = (id, name, hex) => ({id:`lac-${id}`, group:"lacquer", name, short:name, hex, price:"painted", finish:"satin"});
const matte = (id, name, hex) => ({id:`hpl-${id}`, group:"supermatte", name:`Супермат ${name}`, short:name, hex, price:"hpl", finish:"supermatte"});
const gloss = (id, name, hex) => ({id:`pet-${id}`, group:"gloss", name:`Гланц ${name}`, short:name, hex, price:"pet", finish:"gloss"});

export const frontGroups = {
  lacquer:"МДФ боядисан", supermatte:"Супермат (FENIX / HPL)", veneer:"Естествен фурнир",
  egger:"Дърво EGGER", uni:"Едноцветни EGGER", gloss:"Висок гланц",
};

export const fronts = [
  lacquer("white","Бял","#efede7"), lacquer("ivory","Слонова кост","#e8e0cf"), lacquer("cashmere","Кашмир","#d6c9b8"),
  lacquer("greige","Грейж","#bcb1a2"), lacquer("taupe","Тауп","#8b7e73"), lacquer("sage","Шалфей","#9ca58f"),
  lacquer("olive","Маслина","#6c7055"), lacquer("forest","Горско зелено","#2e463b"), lacquer("petrol","Петрол","#24474d"),
  lacquer("navy","Нощно синьо","#262f45"), lacquer("terracotta","Теракота","#ad6a50"), lacquer("clay","Глина","#a58a72"),
  lacquer("bordeaux","Бордо","#57292d"), lacquer("graphite","Графит","#3a3c3e"), lacquer("black","Черен","#1c1c1c"),
  matte("white","бяло","#ecebe6"), matte("cashmere","кашмир","#cbbfb0"), matte("grey","сиво","#8c8d8b"),
  matte("graphite","графит","#454749"), matte("black","черно","#262627"), matte("green","зелено","#4b5a4c"),
  matte("beige","бежово","#d8cebf"), matte("taupe","тауп","#8a7f75"), matte("blue","синьо","#2e3b4f"),
  {id:"ven-walnut", group:"veneer", name:"Фурнир орех", short:"Фурнир орех", hex:"#6e4b33", tint:"#857263", tex:"walnut01_diff", nor:"walnut01_nor", rough:"walnut01_rough", size:[1,1], price:"veneer", finish:"wood"},
  {id:"ven-walnut-dark", group:"veneer", name:"Фурнир тъмен орех", short:"Тъмен орех", hex:"#5a4535", tint:"#8e7462", tex:"walnut03_diff", nor:"walnut03_nor", rough:"walnut03_rough", size:[1,1], price:"veneer", finish:"wood"},
  egger("H1145","Дъб Бардолино натур","#c2a486"), egger("H1180","Дъб Халифакс натур","#b59671"), egger("H1176","Дъб Халифакс бял","#c6b49d"),
  egger("H1181","Дъб Халифакс табак","#886d51"), egger("H1199","Термо дъб черно-кафяв","#2e221a"), egger("H3303","Дъб Хамилтън натур","#c09f72"),
  egger("H3309","Дъб Гладстон пясък","#bba78c"), egger("H1344","Дъб Шермън коняк","#8f6440"), egger("H1346","Дъб Шермън антрацит","#4a4643"),
  egger("H3734","Орех Дижон натур","#8a6a4f"), egger("H3700","Орех Пасифик натур","#9a7454"), egger("H1318","Див дъб натур","#b28f66"),
  egger("H3170","Дъб Кендъл натур","#b98d5c"), egger("H3398","Дъб Кендъл коняк","#8e5f37"), egger("H1204","Ясен Лугано светъл","#d3c2a6"),
  uni("W1000","Премиум бяло","#fbfcf4"), uni("W980","Платинено бяло","#fdfcee"), uni("U222","Крем","#e8dcc3"),
  uni("U702","Кашмир","#d8cabd"), uni("U708","Светлосиво","#c2c2bd"), uni("U727","Каменно сиво","#a39d93"),
  uni("U750","Кафеникаво сиво","#8a8075"), uni("U961","Графит","#403b39"), uni("U999","Черно","#040405"),
  uni("U608","Пистачио","#c9d2c1"), uni("U606","Горско зелено","#3f5547"), uni("U560","Дълбоко синьо","#16346e"),
  gloss("white","бяло","#f3f2ee"), gloss("cashmere","кашмир","#d4c6b4"), gloss("cappuccino","капучино","#b9a68f"),
  gloss("grey","сиво","#a9aaa7"), gloss("graphite","графит","#3a3c3e"), gloss("black","черно","#151515"),
];

// Плотове. price: post постформинг, compact компакт, quartz кварц, granite гранит/керамика, wood масив.
export const tops = [
  {id:"calacatta", name:"Кварц Калаката", hex:"#f1eee9", tint:"#f6f4f0", tex:"calacatta_diff", rough:"marble14_rough", nor:"marble14_nor", size:[2,2], price:"quartz", kind:"stone"},
  {id:"statuario", name:"Кварц Статуарио", hex:"#ebebe8", tint:"#f1f1ef", tex:"statuario_diff", size:[2,2], price:"quartz", kind:"stone"},
  {id:"rosa", name:"Кварц Роза", hex:"#e7dcd4", tex:"marble20_diff", size:[2,2], price:"quartz", kind:"stone"},
  {id:"onyx", name:"Оникс сив", hex:"#c9c6c0", tex:"onyx15_diff", size:[2,2], price:"granite", kind:"stone"},
  {id:"nero", name:"Компакт Неро, мраморен десен", hex:"#1f1f20", tex:"egger_F199", size:[1.3,2.8], price:"compact", kind:"stone"},
  {id:"levanto", name:"Компакт Леванто, бял мраморен десен", hex:"#e3e1dc", tex:"egger_F812", size:[1.3,2.8], price:"compact", kind:"stone"},
  {id:"cremona", name:"Компакт Кремона, мраморен десен", hex:"#ddd5c8", tex:"egger_F229", size:[1.3,2.8], price:"compact", kind:"stone"},
  {id:"cipollino", name:"Компакт Чиполино, сив мраморен десен", hex:"#b8b6b1", tex:"egger_F093", size:[1.3,2.8], price:"compact", kind:"stone"},
  {id:"travertine", name:"Компакт Травертин Маргалида", hex:"#cdbba2", tex:"egger_F030", size:[1.3,2.8], price:"compact", kind:"stone"},
  {id:"concrete", name:"Компакт Бетон Чикаго светъл", hex:"#b7b4ae", tex:"egger_F186", size:[1.3,2.8], price:"compact", kind:"stone"},
  {id:"concrete-dark", name:"Компакт Бетон Чикаго тъмен", hex:"#5d5c5a", tex:"egger_F187", size:[1.3,2.8], price:"compact", kind:"stone"},
  {id:"granite-black", name:"Гранит черен", hex:"#2a2a2a", tex:"egger_F128", size:[1.3,2.8], price:"granite", kind:"stone"},
  {id:"ceramic-white", name:"Керамика бяла мат", hex:"#efede8", price:"granite", kind:"ceramic"},
  {id:"ceramic-black", name:"Керамика черна мат", hex:"#202021", price:"granite", kind:"ceramic"},
  {id:"oak", name:"Плот EGGER Дъб Халифакс", hex:"#b59671", tex:"egger_H1180", size:[1.3,2.8], price:"post", kind:"wood"},
  {id:"walnut", name:"Масив орех", hex:"#6e4b33", tint:"#857263", tex:"walnut01_diff", nor:"walnut01_nor", size:[1,1], price:"wood", kind:"wood"},
  {id:"steel", name:"Инокс", hex:"#b9bab7", tex:"egger_F500", size:[1.3,2.8], price:"granite", kind:"metal"},
];

export const profiles = {flat:"Гладки", shaker:"Тънка рамка", classic:"Класическа рамка", fluted:"Ламели", vgroove:"V-канали"};
// Рамките, фрезовките и ламелите се правят от боядисан МДФ.
export const PAINTED_PROFILES = ["shaker", "classic", "fluted", "vgroove"];
export const handleTypes = {gola:"Без дръжки (Gola)", push:"С натискане (push)", profile:"Профил по ръба", bar:"Дълга дръжка", knob:"Копчета", cup:"Черупки и копчета"};
export const finishes = {
  black:{name:"Черен мат", hex:"#1d1d1d", rough:.45, metal:.5},
  steel:{name:"Инокс", hex:"#c7c8c5", rough:.28, metal:1},
  brass:{name:"Четкан месинг", hex:"#c9a063", rough:.3, metal:1},
  bronze:{name:"Бронз", hex:"#7d5c40", rough:.36, metal:1},
  gunmetal:{name:"Графит", hex:"#55575a", rough:.32, metal:1},
  champagne:{name:"Шампанско", hex:"#cdb994", rough:.3, metal:1},
};
export const shapes = {I:"Права", L:"Г-образна", U:"П-образна", "I+island":"Права с остров", "L+island":"Г-образна с остров"};
export const uppersTypes = {doors:"Врати", lift:"Подемни врати", glass:"Врати и витрини", open:"Врати и рафтове", ceiling:"До тавана", shelves:"Открити рафтове", rack:"Метална етажерка", none:"Без горни"};
export const lowerTypes = {drawers:"Чекмеджета", mixed:"Врати и чекмеджета", deep:"Дълбоки чекмеджета"};
export const backsplashes = {slab:"Като плота", zellige:"Ръчни плочки", subway:"Метро плочки", glass:"Стъкло в цвят", bronze:"Бронзово огледало", paint:"Като стената"};
export const floors = {herringbone:"Паркет рибена кост", planks:"Дъбови дъски", microcement:"Микроцимент", tiles:"Големи плочи"};
export const walls = {"#f4f1ec":"Чисто бяло", "#efe9e0":"Топло бяло", "#e7dfd2":"Пясък", "#dcd5ca":"Грейж", "#d9ddd6":"Светло сиво-зелено", "#e9e3e1":"Пудра", "#dccbb8":"Глина", "#cfd5c6":"Шалфей", "#c9c0b4":"Тауп"};
export const pendants = {globe:"Стъклени сфери", cone:"Метални конуси", line:"Линейна лампа", none:"Без лампи"};
export const hobs = {induction:"Индукция", gas:"Газ"};
export const hoods = {integrated:"Вграден в шкаф", chimney:"Стенен", downdraft:"В плота", ceiling:"Таванен над острова"};
export const fridges = {integrated:"Вграден", visible:"Свободен инокс", none:"Без"};
export const seatsOptions = {0:"Без места", 2:"2 места", 3:"3 места", 4:"4 места"};
export const islandFunctions = {prep:"Работен плот", sink:"С мивка", hob:"С плот за готвене"};
export const bases = {plinth:"Цокъл", legs:"Крачета"};

// Материал на вратите. Дървесните декори (EGGER и фурнир) се добавят като акцент към всеки материал.
export const materials = {
  lacquer:{name:"МДФ боядисан", sub:"мат лак", text:"Всеки цвят. Позволява рамки, фрезовки и ламели.", group:"lacquer"},
  supermatte:{name:"Супермат", sub:"FENIX / HPL", text:"Мек на допир, дълбок матов вид.", group:"supermatte"},
  chip:{name:"ПДЧ меламин", sub:"EGGER", text:"Едноцветни и дървесни декори EGGER.", group:"uni"},
  gloss:{name:"МДФ гланц", sub:"висок гланц", text:"Висок гланц, който отразява светлината.", group:"gloss"},
};
export const WOOD_GROUPS = ["egger", "veneer"];
export const isWood = id => WOOD_GROUPS.includes(FRONTS[id]?.group);
export const materialOf = id => Object.entries(materials).find(([, m]) => m.group === FRONTS[id]?.group)?.[0];

// Най-близкият цвят от даден материал (за смяна на материала без да се губи гамата).
const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
export function nearestFront(id, material) {
  const f = FRONTS[id];
  const group = materials[material]?.group;
  if (!f || !group || f.group === group || WOOD_GROUPS.includes(f.group)) return f ? id : fronts[0].id;
  const [r, g, b] = rgb(f.hex);
  let best = null, bestD = Infinity;
  for (const c of fronts) {
    if (c.group !== group) continue;
    const [r2, g2, b2] = rgb(c.hex);
    const d = 2*(r - r2)**2 + 4*(g - g2)**2 + 3*(b - b2)**2;
    if (d < bestD) { bestD = d; best = c.id; }
  }
  return best || id;
}

// Цветови гами: само цветове (фасади, плот, метал, стени, под). Формата идва от стила.
const P = (name, text, material, front, upperFront, tallFront, islandFront, top, finish, wall, floor, extra = {}) =>
  ({name, text, set:{material, front, upperFront, tallFront, islandFront, top, finish, wall, floor, fMain:extra.fMain || upperFront, fAccent:extra.fAccent || islandFront, ...extra.set}});
export const palettes = {
  oak:P("Бяло и дъб", "Бял супермат, естествен дъб и бял мрамор", "supermatte", "egger-H1180", "hpl-white", "hpl-white", "egger-H1180", "calacatta", "black", "#e7dfd2", "planks"),
  black:P("Черно и орех", "Черен супермат, орех и месинг", "supermatte", "hpl-black", "ven-walnut", "ven-walnut", "hpl-black", "calacatta", "brass", "#efe9e0", "herringbone", {fMain:"hpl-black", fAccent:"ven-walnut"}),
  graphite:P("Графит и дъб", "Графит долу, светъл дъб горе", "supermatte", "hpl-graphite", "egger-H3303", "egger-H3303", "hpl-graphite", "levanto", "black", "#e7dfd2", "microcement", {fMain:"hpl-graphite", fAccent:"egger-H3303"}),
  white:P("Изцяло бяло", "Бял супермат, бяла керамика, инокс", "supermatte", "hpl-white", "hpl-white", "hpl-white", "hpl-white", "ceramic-white", "steel", "#f4f1ec", "microcement", {fAccent:"egger-H1204"}),
  greige:P("Грейж и тъмен дъб", "Топло сиво, тъмен дъб и бял кварц", "lacquer", "lac-greige", "lac-greige", "egger-H1344", "egger-H1344", "levanto", "black", "#f4f1ec", "planks"),
  cashmere:P("Кашмир и орех", "Кашмир, топъл орех и месинг", "lacquer", "lac-cashmere", "lac-cashmere", "ven-walnut", "ven-walnut", "calacatta", "brass", "#dccbb8", "herringbone"),
  ivory:P("Слонова кост", "Топло бяло, бронз и бял мрамор", "lacquer", "lac-ivory", "lac-ivory", "lac-ivory", "lac-ivory", "statuario", "bronze", "#e7dfd2", "herringbone", {fAccent:"ven-walnut"}),
  navy:P("Синьо и месинг", "Нощно синьо долу, слонова кост горе", "lacquer", "lac-navy", "lac-ivory", "lac-ivory", "lac-navy", "calacatta", "brass", "#efe9e0", "herringbone", {fMain:"lac-navy", fAccent:"lac-ivory"}),
  sageclassic:P("Шалфей и дъб", "Светлозелено, дъб и месинг", "lacquer", "lac-sage", "lac-sage", "lac-sage", "egger-H1180", "statuario", "brass", "#f4f1ec", "planks"),
  forest:P("Горско зелено", "Тъмнозелено, месинг и мрамор", "lacquer", "lac-forest", "lac-forest", "lac-forest", "lac-forest", "calacatta", "brass", "#efe9e0", "herringbone", {fAccent:"egger-H1180"}),
  whitebrass:P("Бяло и месинг", "Бяла рамка, месинг и бял мрамор", "lacquer", "lac-white", "lac-white", "lac-white", "lac-white", "statuario", "brass", "#dcd5ca", "herringbone", {fAccent:"egger-H1180"}),
  clay:P("Глина и травертин", "Глинен цвят, слонова кост и травертин", "lacquer", "lac-clay", "lac-ivory", "lac-ivory", "lac-clay", "travertine", "champagne", "#efe9e0", "planks", {fMain:"lac-clay", fAccent:"lac-ivory"}),
  nordic:P("Бяло и ясен", "Бяло, светъл ясен и инокс", "chip", "uni-W1000", "uni-W1000", "egger-H1204", "egger-H1204", "ceramic-white", "steel", "#f4f1ec", "planks"),
  pistachio:P("Пистачио и дъб", "Светлозелено, дъб и месинг", "chip", "uni-U608", "uni-U608", "egger-H3303", "egger-H3303", "levanto", "brass", "#f4f1ec", "planks"),
  lightgrey:P("Светлосиво и дъб", "Светлосиво, бяло и естествен дъб", "chip", "uni-U708", "uni-W1000", "egger-H1145", "uni-U708", "levanto", "black", "#efe9e0", "planks", {fMain:"uni-U708", fAccent:"egger-H1145"}),
  loftgraphite:P("Графит и орех", "Графит, тъмен орех и бетон", "supermatte", "hpl-graphite", "hpl-graphite", "ven-walnut-dark", "ven-walnut-dark", "concrete", "black", "#c9c0b4", "microcement"),
  loftblack:P("Черно и бетон", "Черно, тъмен дъб и светъл бетон", "supermatte", "hpl-black", "hpl-black", "egger-H1181", "hpl-black", "concrete", "black", "#dcd5ca", "microcement", {fAccent:"egger-H1181"}),
  loftgreen:P("Зелено и орех", "Тъмнозелен супермат, орех и бетон", "supermatte", "hpl-green", "hpl-green", "ven-walnut", "ven-walnut", "concrete", "black", "#e7dfd2", "microcement"),
  japandi:P("Ясен и кашмир", "Светъл ясен, кашмир и бетон", "lacquer", "egger-H1204", "lac-cashmere", "egger-H1204", "egger-H1204", "concrete", "steel", "#efe9e0", "microcement", {fMain:"egger-H1204", fAccent:"lac-cashmere"}),
  olive:P("Маслина и травертин", "Маслинено, орех и травертин", "lacquer", "lac-olive", "lac-olive", "egger-H3734", "egger-H3734", "travertine", "champagne", "#e7dfd2", "planks"),
  japandark:P("Тъмен дъб и глина", "Тъмен дъб, глинен цвят и травертин", "lacquer", "egger-H1199", "lac-clay", "egger-H1199", "lac-clay", "travertine", "black", "#dccbb8", "planks", {fMain:"egger-H1199", fAccent:"lac-clay"}),
};

// Стилове: формата на мебелта (врати, дръжки, корниз, цокъл, горни шкафове). Всеки има свои цветови гами.
export const styles = {
  modern:{name:"Модерен", text:"Гладки врати без дръжки, LED и водопад", furnText:"Гладки врати без дръжки и LED", palettes:["oak", "black", "graphite"],
    set:{profile:"flat", handle:"gola", crown:false, base:"plinth", uppers:"lift", lower:"drawers", backsplash:"slab", pendants:"line", hood:"integrated", waterfall:true}},
  minimal:{name:"Минимализъм", text:"Врати с натиск до тавана, нищо излишно", furnText:"Врати с натиск, чисти линии", palettes:["white", "greige", "cashmere"],
    set:{profile:"flat", handle:"push", crown:false, base:"plinth", uppers:"ceiling", lower:"drawers", backsplash:"slab", pendants:"line", hood:"integrated", waterfall:true}},
  classic:{name:"Класически", text:"Класическа рамка, корниз, черупки и витрини", furnText:"Класическа рамка, корниз и копчета", palettes:["ivory", "navy", "sageclassic"],
    set:{profile:"classic", handle:"cup", crown:true, base:"plinth", uppers:"glass", lower:"mixed", backsplash:"subway", pendants:"cone", hood:"chimney", waterfall:false}},
  neoclassic:{name:"Модерна класика", text:"Тънка рамка, дълги дръжки и ръчни плочки", furnText:"Тънка рамка и дълги дръжки", palettes:["forest", "whitebrass", "clay"],
    set:{profile:"shaker", handle:"bar", crown:false, base:"plinth", uppers:"glass", lower:"mixed", backsplash:"zellige", pendants:"cone", hood:"chimney", waterfall:false}},
  scandi:{name:"Скандинавски", text:"Светло дърво, копчета, крачета и открити рафтове", furnText:"Светло дърво, копчета и крачета", palettes:["nordic", "pistachio", "lightgrey"],
    set:{profile:"flat", handle:"knob", crown:false, base:"legs", uppers:"shelves", lower:"mixed", backsplash:"subway", pendants:"globe", hood:"chimney", waterfall:false}},
  loft:{name:"Индустриален", text:"Тъмни цветове, метална етажерка и бетон", furnText:"Тъмни цветове и черен метал", palettes:["loftgraphite", "loftblack", "loftgreen"],
    set:{profile:"flat", handle:"bar", crown:false, base:"plinth", uppers:"rack", lower:"drawers", backsplash:"subway", pendants:"cone", hood:"chimney", waterfall:false}},
  japandi:{name:"Японди", text:"Ламели, топло дърво и спокойни цветове", furnText:"Ламели, топло дърво и спокойни цветове", palettes:["japandi", "olive", "japandark"],
    set:{profile:"fluted", handle:"push", crown:false, base:"plinth", uppers:"none", lower:"drawers", backsplash:"slab", pendants:"cone", hood:"chimney", waterfall:true}},
};

export const byId = list => Object.fromEntries(list.map(item => [item.id, item]));
export const FRONTS = byId(fronts);
export const TOPS = byId(tops);
