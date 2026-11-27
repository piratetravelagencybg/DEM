// 3D двигател: рендър при нужда, меки сенки, отражения, гледни точки, „Вечер“ и „Отвори“.
import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {RoomEnvironment} from "three/addons/environments/RoomEnvironment.js";
import {EffectComposer} from "three/addons/postprocessing/EffectComposer.js";
import {RenderPass} from "three/addons/postprocessing/RenderPass.js";
import {GTAOPass} from "three/addons/postprocessing/GTAOPass.js";
import {OutputPass} from "three/addons/postprocessing/OutputPass.js";
import {setupMaterials, shared, frontMaterial, topMaterial, metalMaterial, floorMaterial, backsplashMaterial, carcassMaterial} from "./materials.js";
import * as CAT from "./catalog.js";
import {buildKitchen} from "./kitchen.js";
import {buildFurniture} from "./furniture.js";
import {buildRoom} from "./room.js";
import {optimize} from "./optimize.js";

const ease = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2;

export class Showroom {
  constructor(container) {
    this.container = container;
    this.mobile = matchMedia("(max-width: 760px), (pointer: coarse)").matches;
    const r = this.renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:"high-performance"});
    r.setPixelRatio(Math.min(devicePixelRatio, this.mobile ? 1.5 : 2));
    r.outputColorSpace = THREE.SRGBColorSpace;
    // Неутрален тон: цветовете на фасадите остават като в мострите, без сиво-жълто отместване.
    r.toneMapping = THREE.NeutralToneMapping;
    r.toneMappingExposure = 1;
    r.shadowMap.enabled = true;
    r.shadowMap.type = this.mobile ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
    // Сенките се смятат наново само при промяна, не при всяко завъртане на камерата.
    r.shadowMap.autoUpdate = false;
    container.appendChild(r.domElement);
    setupMaterials(r, () => this.invalidate(), this.mobile);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#efebe4");
    const pmrem = new THREE.PMREMGenerator(r);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
    this.camera = new THREE.PerspectiveCamera(36, 1, .05, 60);
    this.controls = new OrbitControls(this.camera, r.domElement);
    Object.assign(this.controls, {enableDamping:true, dampingFactor:.08, enablePan:false, minDistance:1.2, maxDistance:26, minPolarAngle:.16*Math.PI, maxPolarAngle:.495*Math.PI});
    this.controls.addEventListener("change", () => this.invalidate());

    // Сенки в ъглите и под шкафовете (ambient occlusion) – само на компютър.
    if (!this.mobile) {
      try {
        const target = new THREE.WebGLRenderTarget(2, 2, {type:THREE.HalfFloatType, samples:4});
        this.composer = new EffectComposer(r, target);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        this.gtao = new GTAOPass(this.scene, this.camera, 2, 2);
        this.gtao.updateGtaoMaterial({radius:.32, distanceExponent:1.6, thickness:1, scale:1, samples:16});
        this.gtao.blendIntensity = .6;
        this.gtao.updatePdMaterial({lumaPhi:10, depthPhi:2, normalPhi:3, radius:5, rings:2, samples:16});
        this.composer.addPass(this.gtao);
        this.composer.addPass(new OutputPass());
      } catch (error) {
        console.warn("AO изключен:", error);
        this.composer = null;
      }
    }

    this.hemi = new THREE.HemisphereLight("#ffffff", "#e4dccf", .35);
    this.sun = new THREE.DirectionalLight("#fff3e2", 2.2);
    this.sun.castShadow = true;
    const size = this.mobile ? 1024 : 2048;
    this.sun.shadow.mapSize.set(size, size);
    Object.assign(this.sun.shadow, {bias:-.0002, normalBias:.025});
    const cam = this.sun.shadow.camera;
    Object.assign(cam, {left:-6, right:6, top:6, bottom:-6, near:.5, far:20});
    // Мека запълваща светлина откъм зрителя: стената с прозореца и фасадите не потъмняват.
    this.fill = new THREE.DirectionalLight("#fff8f0", .45);
    this.fill.position.set(9, 4, 10);
    this.scene.add(this.hemi, this.sun, this.sun.target, this.fill);
    // Постоянен брой лампи (вечерен режим): при смяна на мебелта шейдърите не се компилират наново.
    this.pool = Array.from({length:this.mobile ? 2 : 5}, () => {
      const light = new THREE.PointLight("#ffd9a0", 0, 3, 2);
      this.scene.add(light);
      return light;
    });

    this.evening = false;
    this.open = 0;
    this.tweens = [];
    this.dirty = true;
    new ResizeObserver(() => this.resize()).observe(container);
    this.resize();
    const loop = () => {
      requestAnimationFrame(loop);
      const moved = this.controls.update();
      const now = performance.now();
      if (this.tweens.length) {
        this.tweens = this.tweens.filter(t => { const p = Math.min(1, (now - t.start)/t.dur); t.step(ease(p)); return p < 1; });
        this.dirty = true;
      }
      if (moved || this.dirty) { this.draw(moved); this.dirty = false; }
    };
    loop();
  }

  draw(moving = false) {
    const start = performance.now();
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
    this.watch(performance.now() - start, moving);
  }

  // Ако устройството не смогва при въртене, сваляме качеството тихо, на две стъпки:
  // първо сенките в ъглите (AO), а резолюцията – само ако пак е бавно. Кадрите след смяна на мебел не се броят.
  watch(ms, moving) {
    const now = performance.now();
    const gap = this.lastDraw ? now - this.lastDraw : 0;
    this.lastDraw = now;
    if (this.downgraded >= 2 || !moving || now - (this.lastBuild || 0) < 1500 || gap <= 0 || gap > 100) return;
    this.frames = (this.frames || []).concat(Math.max(ms, gap)).slice(-40);
    if (this.frames.length < 40) return;
    const median = [...this.frames].sort((a, b) => a - b)[20];
    if (median <= 34) return;
    this.frames = [];
    this.downgraded = (this.downgraded || 0) + 1;
    if (this.downgraded === 1 && this.composer) this.composer = null;
    else {
      this.downgraded = 2;
      this.composer = null;
      this.renderer.setPixelRatio(Math.min(devicePixelRatio, this.mobile ? 1 : 1.5));
      const {clientWidth:w, clientHeight:h} = this.container;
      this.renderer.setSize(w, h, false);
    }
    this.invalidate();
  }

  // Шейдърите за всички материали се подготвят предварително, във фонов режим,
  // за да не „засича“ картината при първия клик върху нов цвят.
  async warmup() {
    const r = this.renderer;
    if (!r.compileAsync) return;
    const mats = new Set();
    const add = m => { if (m) mats.add(m); };
    const groups = new Set();
    for (const f of CAT.fronts) {
      const key = `${f.group}|${!!f.tex}|${!!f.nor}`;
      if (groups.has(key)) continue;
      groups.add(key);
      for (const profile of Object.keys(CAT.profiles)) add(frontMaterial(f.id, profile));
    }
    const topKinds = new Set();
    for (const t of CAT.tops) { const key = `${t.kind}|${!!t.tex}|${!!t.nor}|${!!t.rough}`; if (!topKinds.has(key)) { topKinds.add(key); add(topMaterial(t.id)); } }
    for (const id of Object.keys(CAT.finishes)) add(metalMaterial(id));
    for (const kind of Object.keys(CAT.backsplashes)) add(backsplashMaterial(kind, "#f4f1ec"));
    for (const kind of Object.keys(CAT.floors)) add(floorMaterial(kind, () => this.invalidate()));
    add(carcassMaterial());
    for (const [name, make] of Object.entries(shared)) add(make.length ? make("#cccccc") : make());
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(.01, .01, .01);
    for (const m of mats) { const mesh = new THREE.Mesh(geometry, m); mesh.castShadow = mesh.receiveShadow = true; mesh.position.set(0, -50, 0); scene.add(mesh); }
    const previous = r.getRenderTarget();
    try {
      if (this.composer) r.setRenderTarget(this.composer.renderTarget1);
      await r.compileAsync(scene, this.camera, this.scene);
    } catch (error) { console.warn("Подготовката на шейдърите е пропусната:", error); }
    finally { r.setRenderTarget(previous); geometry.dispose(); }
  }

  // Лампите от мебелта се прехвърлят върху постоянните лампи (най-силните вечер са с предимство).
  assignLights(k) {
    k.root.updateMatrixWorld(true);
    const wanted = k.lights.map(entry => {
      const light = entry.light;
      const pos = light.getWorldPosition(new THREE.Vector3());
      light.parent?.remove(light);
      return {...entry, pos, color:light.color.clone(), distance:light.distance || 3};
    }).sort((a, b) => b.night - a.night);
    k.lights = this.pool.map((light, i) => {
      const w = wanted[i];
      if (!w) return {light, day:0, night:0};
      light.position.copy(w.pos);
      light.color.copy(w.color);
      light.distance = w.distance;
      return {light, day:w.day, night:w.night};
    });
  }

  invalidate() { this.dirty = true; }

  resize() {
    const {clientWidth:w, clientHeight:h} = this.container;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    if (this.composer) {
      const ratio = this.renderer.getPixelRatio();
      this.composer.setSize(w, h);
      this.gtao.setSize(w*ratio, h*ratio);
    }
    this.camera.aspect = w/h;
    this.camera.updateProjectionMatrix();
    if (this.kitchen) this.setView(this.view || "persp", false);
    this.invalidate();
  }

  build(state) {
    const previous = this.kitchen?.size;
    const t = [performance.now()];
    for (const part of [this.kitchen?.root, this.room?.group]) if (part) { this.scene.remove(part); dispose(part); }
    t.push(performance.now());
    this.kitchen = state.type === "kitchen" ? buildKitchen(state) : buildFurniture(state);
    t.push(performance.now());
    this.kitchen.box = bounds(this.kitchen.root);
    this.room = buildRoom(this.kitchen.roomState || state, this.kitchen, () => this.invalidate());
    t.push(performance.now());
    // Стотиците части се обединяват по материал: много по-малко работа за видеокартата.
    optimize(this.kitchen.root, this.kitchen.openers.map(o => o.obj));
    optimize(this.room.group);
    t.push(performance.now());
    this.timing = {dispose:t[1] - t[0], build:t[2] - t[1], room:t[3] - t[2], merge:t[4] - t[3]};
    this.lastBuild = performance.now();
    this.assignLights(this.kitchen);
    this.scene.add(this.room.group, this.kitchen.root);
    this.state = state;
    const {A, depth} = this.kitchen.size;
    this.sun.position.set(-4.2, 3.9, this.room.window.z + 1.4);
    this.sun.target.position.set(A*.45, .4, Math.min(2.4, depth*.5));
    this.applyLight();
    this.applyOpen(this.open);
    if (!this.warmed) { this.warmed = true; setTimeout(() => this.warmup(), 1200); }
    const shape = this.kitchen.roomState?.shape ?? state.shape, shapeChanged = shape !== this.frameShape;
    this.frameShape = shape;
    const changed = !previous || shapeChanged || Math.abs(previous.A - A) > .01 || Math.abs(previous.depth - depth) > .01 || previous.H !== this.kitchen.size.H;
    if (changed) this.setView(this.view || "persp", !!previous);
    this.invalidate();
  }

  // Камерата се приближава, докато цялата кухня влезе в кадъра – при всякакъв екран.
  frame(name) {
    const {A} = this.kitchen.size;
    const box = this.kitchen.box.clone();
    if (this.state?.type === "kitchen" || !this.state) box.max.y = Math.min(box.max.y, 2.35);
    const center = box.getCenter(new THREE.Vector3());
    const u = (this.kitchen.roomState?.shape ?? this.state?.shape) === "U";
    const views = {
      persp:{az:u ? .16 : .5, el:u ? .22 : .15, margin:.95},
      front:{az:0, el:.08, margin:.92},
      top:{az:.3, el:.95, margin:.92},
      detail:{az:.38, el:.28, d:1.9, target:new THREE.Vector3(A*.55, .95, .45)},
    };
    const v = views[name] || views.persp;
    const target = v.target || new THREE.Vector3(center.x, 1.0, center.z);
    const dir = new THREE.Vector3(Math.sin(v.az)*Math.cos(v.el), Math.sin(v.el), Math.cos(v.az)*Math.cos(v.el));
    if (v.d) return {pos:target.clone().addScaledVector(dir, v.d), target};
    const probe = this.camera.clone();
    const corners = [];
    for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) corners.push(new THREE.Vector3(x, y, z));
    const fits = d => {
      probe.position.copy(target).addScaledVector(dir, d);
      probe.lookAt(target);
      probe.updateMatrixWorld();
      return corners.every(c => { const p = c.clone().project(probe); return Math.abs(p.x) <= v.margin && Math.abs(p.y) <= v.margin && p.z < 1; });
    };
    let lo = 1.5, hi = 30;
    for (let i = 0; i < 28; i++) { const mid = (lo + hi)/2; if (fits(mid)) hi = mid; else lo = mid; }
    return {pos:target.clone().addScaledVector(dir, hi), target};
  }

  setView(name, animate = true) {
    this.view = name;
    if (!this.kitchen) return;
    const {pos, target} = this.frame(name);
    this.controls.minAzimuthAngle = -.45;
    this.controls.maxAzimuthAngle = 1.25;
    if (!animate) {
      this.camera.position.copy(pos);
      this.controls.target.copy(target);
      this.controls.update();
      this.invalidate();
      return;
    }
    const fromPos = this.camera.position.clone(), fromTarget = this.controls.target.clone();
    this.tweens.push({start:performance.now(), dur:900, step:p => {
      this.camera.position.lerpVectors(fromPos, pos, p);
      this.controls.target.lerpVectors(fromTarget, target, p);
    }});
  }

  setEvening(on) {
    this.evening = on;
    this.applyLight();
    this.invalidate();
  }

  applyLight() {
    const night = this.evening, k = this.kitchen;
    // Ден: топло слънце от прозореца и по-слаба разсеяна светлина – повече дълбочина и обем.
    this.scene.environmentIntensity = night ? .1 : .62;
    this.scene.background.set(night ? "#2a2930" : "#efebe4");
    this.sun.intensity = night ? .1 : 3.1;
    this.sun.color.set(night ? "#8da2d8" : "#ffecd6");
    this.hemi.intensity = night ? .08 : .24;
    this.fill.intensity = night ? 0 : .32;
    this.renderer.toneMappingExposure = night ? 1.2 : 1.04;
    this.renderer.shadowMap.needsUpdate = true;
    shared.led().color.set(night ? "#ffd59a" : "#f1ebe1");
    shared.bulb().emissiveIntensity = night ? 3 : .15;
    this.room.sky.color.set(night ? "#1b2234" : "#f3f6f9");
    if (!k) return;
    for (const {light, day, night:n} of k.lights) light.intensity = night ? n : day;
    for (const m of k.glows) m.opacity = night ? .75 : .18;
  }

  toggleOpen() {
    const from = this.open, to = from > .5 ? 0 : 1;
    this.tweens.push({start:performance.now(), dur:1100, step:p => this.applyOpen(from + (to - from)*p)});
    this.open = to;
    return to === 1;
  }

  applyOpen(t) {
    this.renderer.shadowMap.needsUpdate = true;
    for (const o of this.kitchen?.openers || []) {
      if (o.type === "slide") o.obj.position.z = o.to*t;
      if (o.type === "rotY") o.obj.rotation.y = o.to*t;
      if (o.type === "rotX") o.obj.rotation.x = o.to*t;
      if (o.type === "slideX") o.obj.position.x = o.from + o.to*t;
    }
  }

  snapshot(type = "image/jpeg") {
    this.draw();
    return this.renderer.domElement.toDataURL(type, .9);
  }
}

// Рамката на кухнята за камерата (без меките сенки по пода).
function bounds(root) {
  const box = new THREE.Box3();
  root.updateMatrixWorld(true);
  const skip = new Set();
  root.traverse(o => { if (o.userData.decor) o.traverse(c => skip.add(c)); });
  root.traverse(o => { if (o.isMesh && o.geometry.type !== "PlaneGeometry" && !skip.has(o)) box.expandByObject(o); });
  return box;
}

function dispose(root) {
  root.traverse(o => { if (o.geometry) o.geometry.dispose(); });
}
