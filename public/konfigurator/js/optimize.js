// Обединява неподвижните части по материал: стотици отделни обекти стават няколко десетки,
// а сцената върви плавно и на телефон. Вратите и чекмеджетата се обединяват поотделно, за да се отварят.
import * as THREE from "three";
import {mergeGeometries} from "three/addons/utils/BufferGeometryUtils.js";

export function optimize(root, dynamicObjects = []) {
  const dynamic = new Set(dynamicObjects);
  const insideDynamic = (o, base) => {
    for (let p = o.parent; p && p !== base; p = p.parent) if (dynamic.has(p)) return true;
    return false;
  };
  mergeTree(root, o => !insideDynamic(o, root) && !dynamic.has(o));
  for (const obj of dynamic) mergeTree(obj, o => !insideDynamic(o, obj));
}

function mergeTree(base, keep) {
  base.updateMatrixWorld(true);
  const inverse = base.matrixWorld.clone().invert();
  const buckets = new Map();
  const merged = [];
  base.traverse(o => {
    if (!o.isMesh || !o.visible || Array.isArray(o.material) || !keep(o) || o.material.transparent || o.renderOrder) return;
    const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    for (const name of Object.keys(g.attributes)) if (!["position", "normal", "uv"].includes(name)) g.deleteAttribute(name);
    if (!g.attributes.uv || !g.attributes.normal) { g.dispose(); return; }
    g.clearGroups();
    g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse, o.matrixWorld));
    const key = `${o.material.uuid}|${o.castShadow}|${o.receiveShadow}`;
    if (!buckets.has(key)) buckets.set(key, {material:o.material, cast:o.castShadow, receive:o.receiveShadow, list:[]});
    buckets.get(key).list.push(g);
    merged.push(o);
  });
  for (const o of merged) { o.parent.remove(o); o.geometry.dispose(); }
  for (const {material, cast, receive, list} of buckets.values()) {
    const geometry = mergeGeometries(list, false);
    list.forEach(g => g.dispose());
    if (!geometry) continue;
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    base.add(mesh);
  }
}
