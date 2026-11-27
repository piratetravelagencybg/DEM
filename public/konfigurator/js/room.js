// Стаята: под, стени, прозорец със слънце, первази и декорация.
import * as THREE from "three";
import {floorMaterial, shared, worldUV} from "./materials.js";

let ceilingMaterial = null;
export function buildRoom(s, k, ready) {
  const g = new THREE.Group();
  const A = k.size.A, H = s.height/100;
  const W = A + 6, Z = 12, thick = .1;
  const wallMat = shared.wall(s.wall);
  const add = (geometry, material, x, y, z, shadows = true) => {
    const m = new THREE.Mesh(geometry, material);
    m.position.set(x, y, z);
    m.receiveShadow = true;
    m.castShadow = shadows;
    g.add(m);
    return m;
  };
  const slab = (x, y, z, w, h, d, material, shadows = true) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    worldUV(geometry, [x + w/2, y + h/2, z + d/2], true);
    return add(geometry, material, x + w/2, y + h/2, z + d/2, shadows);
  };

  // Под.
  const floorGeometry = new THREE.PlaneGeometry(W, Z);
  floorGeometry.rotateX(-Math.PI/2);
  worldUV(floorGeometry, [W/2, 0, Z/2]);
  add(floorGeometry, floorMaterial(s.floor, ready), W/2, 0, Z/2, false);

  // Задна стена и дясна стена при П-образна кухня.
  slab(-thick, 0, -thick, W + thick, H, thick, wallMat);
  if (s.shape === "U") {
    // Дясна стена само с вътрешна страна: отвън камерата вижда през нея.
    const right = new THREE.Mesh(new THREE.PlaneGeometry(Z, H), wallMat);
    right.rotation.y = -Math.PI/2;
    right.position.set(A + .001, H/2, Z/2);
    right.receiveShadow = true;
    g.add(right);
  }

  // Лява стена с прозорец.
  const L = s.shape.startsWith("L") || s.shape === "U";
  const B = s.walls.B/100;
  let z1, z2;
  if (L && B >= 1.7) { z1 = Math.max(.95, B/2 - .7); z2 = Math.min(B - .15, B/2 + .7); }
  else if (L) { z1 = B + .35; z2 = B + 1.75; }
  else { z1 = 1.05; z2 = 2.45; }
  const y1 = L && B >= 1.7 ? 1.05 : .9, y2 = Math.min(H - .25, 2.3);
  slab(-thick, 0, 0, thick, y1, Z, wallMat);
  slab(-thick, y2, 0, thick, H - y2, Z, wallMat);
  slab(-thick, y1, 0, thick, y2 - y1, z1, wallMat);
  slab(-thick, y1, z2, thick, y2 - y1, Z - z2, wallMat);
  const frame = shared.darkMetal();
  for (const [y, h] of [[y1, .05], [y2 - .05, .05]]) slab(-.07, y, z1, .05, h, z2 - z1, frame);
  for (const z of [z1, (z1 + z2)/2 - .025, z2 - .05]) slab(-.07, y1, z, .05, y2 - y1, .05, frame);
  slab(-.02, y1 - .03, z1 - .03, .06, .03, z2 - z1 + .06, shared.ceramic());
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(z2 - z1, y2 - y1), shared.sky());
  sky.rotation.y = Math.PI/2;
  sky.position.set(-.12, (y1 + y2)/2, (z1 + z2)/2);
  g.add(sky);

  // Первази.
  const skirting = shared.wall(shade(s.wall, -.04));
  slab(0, 0, 0, W - .2, .08, .014, skirting, false);
  slab(0, 0, 0, .014, .08, Z, skirting, false);

  // Растение в ъгъла вдясно, ако има място.
  if (s.shape !== "U") plant(g, A + .75, .55);

  // Таван с вградени луни: стаята изглежда завършена. Гледа надолу, затова отгоре не се вижда.
  const ceilingGeometry = new THREE.PlaneGeometry(W + thick, Z);
  ceilingGeometry.rotateX(Math.PI/2);
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial || (ceilingMaterial = new THREE.MeshStandardMaterial({color:"#f6f3ee", emissive:"#f4f0ea", emissiveIntensity:.62, roughness:.95})));
  ceiling.position.set(W/2 - thick/2, H, Z/2);
  ceiling.receiveShadow = true;
  ceiling.castShadow = false;
  g.add(ceiling);
  const spot = new THREE.CircleGeometry(.045, 20);
  spot.rotateX(Math.PI/2);
  const ring = new THREE.RingGeometry(.045, .058, 24);
  ring.rotateX(Math.PI/2);
  const rows = Math.max(2, Math.round(A/1.1));
  for (let i = 0; i < rows; i++) for (const z of [.9, 2.3]) {
    const x = (i + .5)*A/rows;
    const bulb = new THREE.Mesh(spot, shared.bulb());
    bulb.position.set(x, H - .002, z);
    const trim = new THREE.Mesh(ring, shared.darkMetal());
    trim.position.set(x, H - .001, z);
    g.add(bulb, trim);
  }

  return {group:g, window:{z:(z1 + z2)/2, y:(y1 + y2)/2}, sky:sky.material};
}

// Маслиново дръвче в бяла керамична саксия.
function plant(g, x, z) {
  const add = (geometry, material, cast = true) => {
    const m = new THREE.Mesh(geometry, material);
    m.castShadow = cast;
    m.receiveShadow = true;
    g.add(m);
    return m;
  };
  const profile = [[0, 0], [.14, 0], [.17, .03], [.2, .2], [.21, .4], [.2, .42], [.185, .41], [.185, .39], [0, .39]].map(([a, b]) => new THREE.Vector2(a, b));
  add(new THREE.LatheGeometry(profile, 40), shared.ceramic()).position.set(x, 0, z);
  const rnd = (n => () => (n = (n*9301 + 49297) % 233280)/233280)(11);
  const tones = [shared.sage(), shared.sageDark(), shared.sageLight()];
  const leaf = new THREE.SphereGeometry(1, 8, 5);
  const up = new THREE.Vector3(0, 1, 0);
  for (const [cx, cy, cz] of [[-.13, 1.42, .03], [.11, 1.6, -.05], [.01, 1.8, .07]]) {
    const from = new THREE.Vector3(x, .38, z), to = new THREE.Vector3(x + cx, cy, z + cz);
    const dir = to.clone().sub(from);
    const branch = add(new THREE.CylinderGeometry(.007, .015, dir.length(), 7), shared.bark());
    branch.position.copy(from).addScaledVector(dir, .5);
    branch.quaternion.setFromUnitVectors(up, dir.normalize());
    for (let i = 0; i < 48; i++) {
      const a = rnd()*Math.PI*2, b = Math.acos(2*rnd() - 1), r = .06 + rnd()*.17;
      const m = add(leaf, tones[i % 3]);
      m.position.set(x + cx + Math.sin(b)*Math.cos(a)*r*1.25, cy + Math.cos(b)*r*.75, z + cz + Math.sin(b)*Math.sin(a)*r);
      m.scale.set(.046, .006, .014);
      m.rotation.set(rnd()*Math.PI, rnd()*Math.PI, rnd()*Math.PI);
    }
  }
}

function shade(hex, amount) {
  const c = new THREE.Color(hex);
  c.offsetHSL(0, 0, amount);
  return `#${c.getHexString()}`;
}
