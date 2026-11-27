// Материали за 3D сцената: истински текстури в реален мащаб (UV в метри) и процедурни карти.
import * as THREE from "three";
import {TEX, FRONTS, TOPS, finishes} from "./catalog.js";

let anisotropy = 4;
let onLoad = () => {};
// lite = телефон: по-леки материали без лак-слой и блясък на тъкани.
export const quality = {lite:false};
export function setupMaterials(renderer, loaded, lite = false) {
  anisotropy = Math.min(lite ? 4 : 8, renderer.capabilities.getMaxAnisotropy());
  onLoad = loaded;
  quality.lite = lite;
}
const PHYSICAL = ["clearcoat", "clearcoatRoughness", "sheen", "sheenRoughness", "sheenColor", "transmission"];
function PM(params = {}) {
  if (!quality.lite) return new THREE.MeshPhysicalMaterial(params);
  const rest = Object.fromEntries(Object.entries(params).filter(([k]) => !PHYSICAL.includes(k)));
  return new THREE.MeshStandardMaterial(rest);
}

const loader = new THREE.TextureLoader();
let pending = 0;
export const texturesPending = () => pending;
const textures = new Map();
function texture(name, color, size = [1,1]) {
  const key = `${name}|${color}|${size}`;
  if (textures.has(key)) return textures.get(key);
  // Докато текстурата се зарежда: неутрален цвят вместо черно. Когато снимката дойде,
  // старата 2×2 текстура във видеокартата се изтрива (иначе истинската снимка не се показва никога).
  pending++;
  const t = loader.load(`${TEX}${name}.webp`, tex => { pending--; tex.dispose(); tex.needsUpdate = true; onLoad(); }, undefined, () => { pending--; });
  if (!t.image) { t.image = placeholder(name.includes("_nor") ? "#8080ff" : name.includes("_rough") ? "#c8c8c8" : "#d9cfc2"); t.needsUpdate = true; }
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = anisotropy;
  t.repeat.set(1/size[0], 1/size[1]);
  if (color) t.colorSpace = THREE.SRGBColorSpace;
  textures.set(key, t);
  return t;
}

const placeholders = {};
function placeholder(color) {
  if (placeholders[color]) return placeholders[color];
  const c = document.createElement("canvas");
  c.width = c.height = 2;
  const ctx = c.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 2, 2);
  return (placeholders[color] = c);
}

function canvasTexture(key, size, draw, {color = true, repeat = [1,1]} = {}) {
  if (textures.has(key)) return textures.get(key);
  const canvas = document.createElement("canvas");
  canvas.width = size[0];
  canvas.height = size[1];
  draw(canvas.getContext("2d"), canvas.width, canvas.height);
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = anisotropy;
  t.repeat.set(repeat[0], repeat[1]);
  if (color) t.colorSpace = THREE.SRGBColorSpace;
  textures.set(key, t);
  return t;
}

const random = seed => () => (seed = (Math.imul(1664525, seed) + 1013904223) >>> 0) / 4294967296;

// Нормална карта за ламели (вертикални полуцилиндри) и V-канали.
function flutesNormal(kind) {
  return canvasTexture(`normal-${kind}`, [256, 4], (ctx, w, h) => {
    const img = ctx.createImageData(w, h);
    for (let x = 0; x < w; x++) {
      let nx = 0;
      if (kind === "fluted") {
        const t = (x / w) * 2 - 1;                       // -1..1 през една ламела
        nx = Math.abs(t) > .86 ? 0 : t * .9;
      } else {
        const t = x / w;                                  // V-канал в средата на 15 см
        nx = t > .48 && t < .5 ? -.7 : t >= .5 && t < .52 ? .7 : 0;
      }
      const nz = Math.sqrt(1 - nx*nx);
      for (let y = 0; y < h; y++) {
        const i = (y*w + x)*4;
        img.data[i] = (nx*.5 + .5)*255; img.data[i+1] = 128; img.data[i+2] = (nz*.5 + .5)*255; img.data[i+3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, {color:false, repeat:[kind === "fluted" ? 1/.032 : 1/.15, 1]});
}

const materials = new Map();
function cached(key, make) {
  if (!materials.has(key)) materials.set(key, make());
  return materials.get(key);
}

// Фасада: каталожен материал + профил (ламели / V-канали) + блясък.
export function frontMaterial(id, profile = "flat") {
  const f = FRONTS[id] || FRONTS["lac-white"];
  // Рамките са отделна геометрия – материалът е като при гладките врати (по-малко материали и шейдъри).
  if (profile !== "fluted" && profile !== "vgroove") profile = "flat";
  return cached(`front|${f.id}|${profile}`, () => {
    const m = PM({color:f.tex ? (f.tint || "#ffffff") : f.hex});
    if (f.tex) m.map = texture(f.tex, true, f.size);
    if (f.rough) m.roughnessMap = texture(f.rough, false, f.size);
    if (f.nor && profile !== "fluted" && profile !== "vgroove") { m.normalMap = texture(f.nor, false, f.size); m.normalScale.set(.6, .6); }
    if (profile === "fluted" || profile === "vgroove") { m.normalMap = flutesNormal(profile); m.normalScale.set(1, 1); }
    const finish = {
      satin:{roughness:.36, clearcoat:.35, clearcoatRoughness:.32},
      matte:{roughness:.62},
      supermatte:{roughness:.86, sheen:.15, sheenRoughness:.8, sheenColor:new THREE.Color("#ffffff")},
      gloss:{roughness:.06, clearcoat:1, clearcoatRoughness:.03},
      wood:{roughness:f.group === "veneer" ? .5 : .6, clearcoat:f.group === "veneer" ? .2 : 0, clearcoatRoughness:.4},
    }[f.finish];
    Object.assign(m, finish);
    if (f.rough) m.roughness = 1;
    return m;
  });
}

export function carcassMaterial() {
  return cached("carcass", () => new THREE.MeshStandardMaterial({color:"#cdc6ba", roughness:.8}));
}

export function topMaterial(id) {
  const t = TOPS[id] || TOPS.calacatta;
  return cached(`top|${t.id}`, () => {
    const m = PM({color:t.tex ? (t.tint || "#ffffff") : t.hex});
    if (t.tex) m.map = texture(t.tex, true, t.size);
    if (t.rough) m.roughnessMap = texture(t.rough, false, t.size);
    if (t.nor) { m.normalMap = texture(t.nor, false, t.size); m.normalScale.set(.3, .3); }
    if (t.kind === "stone") Object.assign(m, {roughness:t.rough ? 1 : .22, clearcoat:.55, clearcoatRoughness:.12});
    if (t.kind === "ceramic") Object.assign(m, {roughness:.55});
    if (t.kind === "wood") Object.assign(m, {roughness:.55, clearcoat:.25, clearcoatRoughness:.4});
    if (t.kind === "metal") Object.assign(m, {metalness:1, roughness:.34});
    return m;
  });
}

export function metalMaterial(id) {
  const f = finishes[id] || finishes.black;
  return cached(`metal|${id}`, () => PM({color:f.hex, metalness:f.metal, roughness:f.rough, clearcoat:f.metal < 1 ? .2 : 0}));
}

export const shared = {
  blackGlass:() => cached("blackGlass", () => PM({color:"#08090a", roughness:.04, metalness:0, clearcoat:1, clearcoatRoughness:.02})),
  steel:() => cached("steel", () => PM({color:"#ffffff", map:texture("egger_F500", true, [1.3,2.8]), metalness:1, roughness:.32})),
  darkMetal:() => cached("darkMetal", () => new THREE.MeshStandardMaterial({color:"#202224", metalness:.8, roughness:.38})),
  interior:() => cached("interior", () => new THREE.MeshStandardMaterial({color:"#3b3d40", roughness:.55, metalness:.2})),
  shadowGap:() => cached("shadowGap", () => new THREE.MeshStandardMaterial({color:"#111111", roughness:.9})),
  glass:() => cached("glass", () => PM({color:"#e6ecea", transparent:true, opacity:.12, roughness:.02, metalness:0, envMapIntensity:.55, depthWrite:false})),
  bronzeGlass:() => cached("bronzeGlass", () => PM({color:"#8c6a4c", transparent:true, opacity:.3, roughness:.04, envMapIntensity:.6, depthWrite:false})),
  mirror:() => cached("bronzeMirror", () => PM({color:"#b48b62", metalness:1, roughness:.07})),
  led:() => cached("led", () => new THREE.MeshBasicMaterial({color:"#ffd9a0", toneMapped:false})),
  ledOff:() => cached("ledOff", () => new THREE.MeshStandardMaterial({color:"#d8d2c4", roughness:.4, emissive:"#000000"})),
  bulb:() => cached("bulb", () => new THREE.MeshStandardMaterial({color:"#fff2d6", emissive:"#ffd9a0", emissiveIntensity:0, roughness:.2})),
  ceramic:() => cached("ceramic", () => PM({color:"#f3f0ea", roughness:.28, clearcoat:.6})),
  ceramicDark:() => cached("ceramicDark", () => PM({color:"#3c3a37", roughness:.4, clearcoat:.3})),
  wood:() => cached("propWood", () => new THREE.MeshStandardMaterial({color:"#ffffff", map:texture("egger_H1145", true, [.6,1.3]), roughness:.55})),
  // Букле: само релефът на тъканта, в светъл цвят (цветната текстура излизаше като кафяво каре).
  boucle:() => cached("boucle", () => new THREE.MeshStandardMaterial({color:"#ebe5da", normalMap:texture("boucle_nor", false, [.12,.12]), normalScale:new THREE.Vector2(.8, .8), roughness:.96})),
  leaf:() => cached("leaf", () => new THREE.MeshStandardMaterial({color:"#4f6a48", roughness:.7, side:THREE.DoubleSide})),
  cushion:() => cached("cushion", () => PM({color:"#e7dfd2", roughness:.92, sheen:1, sheenRoughness:.7, sheenColor:"#ffffff"})),
  sage:() => cached("sage", () => new THREE.MeshStandardMaterial({color:"#7f8f6d", roughness:.75})),
  sageDark:() => cached("sageDark", () => new THREE.MeshStandardMaterial({color:"#5f7052", roughness:.75})),
  sageLight:() => cached("sageLight", () => new THREE.MeshStandardMaterial({color:"#a3ae8f", roughness:.75})),
  bark:() => cached("bark", () => new THREE.MeshStandardMaterial({color:"#6b5a49", roughness:.9})),
  fruit:color => cached(`fruit|${color}`, () => PM({color, roughness:.45, clearcoat:.3})),
  wall:color => cached(`wall|${color}`, () => new THREE.MeshStandardMaterial({color, roughness:.94})),
  linen:color => cached(`linen|${color}`, () => new THREE.MeshStandardMaterial({color, normalMap:texture("linen_nor", false, [.35,.35]), normalScale:new THREE.Vector2(.6, .6), roughness:.95})),
  velvet:color => cached(`velvet|${color}`, () => PM({color, map:texture("velvet_diff", true, [.4,.4]), roughness:.85, sheen:1, sheenRoughness:.5, sheenColor:"#ffffff"})),
  fabric:color => cached(`fabric|${color}`, () => new THREE.MeshStandardMaterial({color, roughness:.9})),
  // Огледало: светло и леко топло (пълното метално отражение излизаше черно на фона на стаята).
  silverMirror:() => cached("silverMirror", () => new THREE.MeshStandardMaterial({color:"#e9eff1", metalness:.35, roughness:.05})),
  screen:() => cached("screen", () => PM({color:"#0b0c0e", roughness:.12, clearcoat:1, clearcoatRoughness:.05})),
  paper:color => cached(`paper|${color}`, () => new THREE.MeshStandardMaterial({color, roughness:.8})),
  // Изглед през прозореца: светло небе и далечни дървета, леко размити.
  sky:() => cached("sky", () => new THREE.MeshBasicMaterial({color:"#ffffff", toneMapped:false, map:canvasTexture("sky", [256, 256], (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#cfdeec"); g.addColorStop(.55, "#e9eef2"); g.addColorStop(1, "#f3efe7");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.filter = "blur(6px)";
    const rnd = random(5);
    for (let i = 0; i < 26; i++) {
      const x = rnd()*w, r = 18 + rnd()*30, y = h*.72 + rnd()*20;
      ctx.fillStyle = ["#a9b79a", "#98aa8a", "#b8c3a8"][i % 3];
      ctx.beginPath(); ctx.ellipse(x, y, r, r*.8, 0, 0, Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = "#c9c2b4"; ctx.fillRect(0, h*.86, w, h*.14);
  })})),
};

// Ръчни плочки (зелидж), метро плочки и стъкло в цвят.
export function backsplashMaterial(kind, wallColor) {
  if (kind === "glass") return cached("bs-glass", () => PM({color:"#c9c2b6", roughness:.05, clearcoat:1, clearcoatRoughness:.03}));
  if (kind === "bronze") return shared.mirror();
  if (kind === "paint") return shared.wall(wallColor);
  const zellige = kind === "zellige";
  return cached(`bs-${kind}`, () => {
    const tile = zellige ? [64, 64] : [52, 104];
    const map = canvasTexture(`tiles-${kind}`, [1024, 1024], (ctx, w, h) => {
      const rnd = random(zellige ? 17 : 29);
      ctx.fillStyle = zellige ? "#cfc6b6" : "#d8d4cd";
      ctx.fillRect(0, 0, w, h);
      const tones = zellige ? ["#efe8da","#e6dccb","#f3eee4","#dcd1bd","#e9e0cf","#f6f1e8"] : ["#f4f3ef","#f1f0ec","#f6f5f2"];
      for (let y = 0, row = 0; y < h; y += tile[0], row++) {
        for (let x = zellige ? 0 : (row % 2) * tile[1] / 2 - tile[1]; x < w; x += tile[1]) {
          ctx.fillStyle = tones[Math.floor(rnd()*tones.length)];
          ctx.fillRect(x + 2, y + 2, tile[1] - 4, tile[0] - 4);
          if (zellige) {
            const g = ctx.createRadialGradient(x + tile[1]*rnd(), y + tile[0]*rnd(), 2, x + tile[1]/2, y + tile[0]/2, tile[1]*.8);
            g.addColorStop(0, "rgba(255,255,255,.35)");
            g.addColorStop(1, "rgba(120,100,80,.10)");
            ctx.fillStyle = g;
            ctx.fillRect(x + 2, y + 2, tile[1] - 4, tile[0] - 4);
          }
        }
      }
    }, {repeat:[1/.6, 1/.6]});
    return PM({color:"#ffffff", map, roughness:zellige ? .18 : .12, clearcoat:.8, clearcoatRoughness:.08});
  });
}

// Подове: унгарска рибена кост от истински дъб, дъски, микроцимент, големи плочи.
export function floorMaterial(kind, ready) {
  if (kind === "planks") return cached("floor-planks", () => new THREE.MeshStandardMaterial({
    color:"#fff5e6", map:texture("floor03light_diff", true, [1.6,1.6]), roughnessMap:texture("floor03_rough", false, [1.6,1.6]),
    normalMap:texture("floor03_nor", false, [1.6,1.6]), roughness:1}));
  if (kind === "microcement") return cached("floor-micro", () => new THREE.MeshStandardMaterial({color:"#ffffff", roughness:.62,
    map:canvasTexture("micro", [512, 512], (ctx, w, h) => {
      const rnd = random(5);
      ctx.fillStyle = "#d3cdc4"; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 160; i++) {
        const x = rnd()*w, y = rnd()*h, r = 20 + rnd()*90;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const tone = rnd() > .5 ? "rgba(255,250,240,.06)" : "rgba(80,70,60,.035)";
        g.addColorStop(0, tone); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r*2, r*2);
      }
    }, {repeat:[1/2.5, 1/2.5]})}));
  if (kind === "tiles") return cached("floor-tiles", () => {
    const base = texture("egger_F186", true, [1.3,2.8]);
    const m = PM({color:"#ffffff", map:base, roughness:.32, clearcoat:.3});
    m.onBeforeCompile = shader => {
      shader.fragmentShader = shader.fragmentShader.replace("#include <map_fragment>", `#include <map_fragment>
        vec2 tileUv = fract(vMapUv * vec2(1.3/.6, 2.8/1.2));
        float grout = step(.992, tileUv.x) + step(.996, tileUv.y);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.55,.53,.5), clamp(grout,0.,1.));`);
    };
    return m;
  });
  return cached("floor-chevron", () => {
    const image = new Image();
    const map = canvasTexture("chevron", [1024, 1024], (ctx, w, h) => { ctx.fillStyle = "#cdb79c"; ctx.fillRect(0, 0, w, h); }, {repeat:[1/1.2, 1/1.2]});
    image.onload = () => {
      const ctx = map.image.getContext("2d");
      const pattern = ctx.createPattern(image, "repeat");
      const rnd = random(11);
      const columns = 3, cw = 1024 / columns, plank = 78;
      for (let c = 0; c < columns; c++) {
        const dir = c % 2 ? -1 : 1;
        for (let y = -cw; y < 1024 + cw; y += plank) {
          const x0 = c*cw, x1 = x0 + cw;
          const y0 = y, y1 = y + dir*cw;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineTo(x1, y1 + plank); ctx.lineTo(x0, y0 + plank); ctx.closePath();
          ctx.clip();
          ctx.translate(rnd()*400, rnd()*400);
          ctx.fillStyle = pattern;
          ctx.fillRect(-400, -400, 1900, 1900);
          ctx.restore();
          ctx.fillStyle = `rgba(250,244,234,${.3 + rnd()*.08})`;
          ctx.beginPath();
          ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineTo(x1, y1 + plank); ctx.lineTo(x0, y0 + plank); ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "rgba(90,70,50,.14)"; ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.fillStyle = "rgba(90,70,50,.14)";
        ctx.fillRect(c*cw - .5, 0, 1, 1024);
      }
      map.needsUpdate = true;
      ready?.();
    };
    image.src = `${TEX}egger_H1180.webp`;
    return PM({color:"#f8f0e4", map, roughness:.55, clearcoat:.12, clearcoatRoughness:.35});
  });
}

// UV в метри (кутийна проекция): еднакъв мащаб и непрекъсната шарка между съседни фасади.
export function worldUV(geometry, offset = [0,0,0], horizontalLong = false) {
  const pos = geometry.attributes.position, nor = geometry.attributes.normal, uv = geometry.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + offset[0], y = pos.getY(i) + offset[1], z = pos.getZ(i) + offset[2];
    const ax = Math.abs(nor.getX(i)), ay = Math.abs(nor.getY(i)), az = Math.abs(nor.getZ(i));
    if (ay >= ax && ay >= az) uv.setXY(i, horizontalLong ? z : x, horizontalLong ? x : z);
    else if (ax >= az) uv.setXY(i, z, y);
    else uv.setXY(i, x, y);
  }
  uv.needsUpdate = true;
  return geometry;
}
