// Инструменти за скиците (SVG 120×80, подът е под y = 70): врати с профила и дръжката на стила,
// цокъл или крачета, корниз, дрехи, книги. Ползват ги скиците на моделите в js/models/*.meta.js.
const lum = c => { const [r, g, b] = [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); return r*.3 + g*.59 + b*.11; };
export const lineOn = c => lum(c) > 120 ? "rgba(40,30,20,.28)" : "rgba(255,255,255,.3)";
const SK_CLOTHES = ["#ebe6dc", "#cbbfad", "#8e857a", "#3e4347", "#aab5c0", "#d9c4a6", "#9aa48f"];

// s = стил (profile, handle, base, crown, uppers), c = цветове {lower, upper, tall, main, accent, wood, metal, top, wall}, woodAccent = дали акцентът е дърво.
export function makeKit(s, c, woodAccent = true) {
  const out = [], metal = c.metal, legs = s.base === "legs";
  const R = (x, y, w, h, fill, extra = "") => out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`);
  const P = (d, stroke, width = .8, extra = "") => out.push(`<path d="${d}" stroke="${stroke}" stroke-width="${width}" fill="none" ${extra}/>`);
  const F = (d, fill, extra = "") => out.push(`<path d="${d}" fill="${fill}" ${extra}/>`);
  const O = (cx, cy, rx, ry, fill, extra = "") => out.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`);
  // Врата или чекмедже. kind: door | upper | tall | drawer; side: от коя страна е дръжката.
  const door = (x, y, w, h, color, kind = "door", side = "R") => {
    const l = lineOn(color);
    R(x, y, w, h, color, `stroke="${l}" stroke-width=".6"`);
    if (s.profile === "shaker" && w > 6 && h > 5) R(x + 1.8, y + 1.8, w - 3.6, h - 3.6, "none", `stroke="${l}" stroke-width=".7"`);
    if (s.profile === "classic" && w > 7 && h > 5) {
      if (h <= 10) R(x + 1.8, y + 1.5, w - 3.6, h - 3, "none", `stroke="${l}" stroke-width=".6"`);
      else { R(x + 2.2, y + 2.2, w - 4.4, h - 4.4, "none", `stroke="${l}" stroke-width=".7"`); R(x + 3.8, y + 3.8, w - 7.6, h - 7.6, "none", `rx="1" stroke="${l}" stroke-width=".6"`); }
    }
    if (s.profile === "fluted") for (let fx = x + 1.6; fx < x + w - .8; fx += 1.8) P(`M${fx} ${y}v${h}`, l, .45);
    if (s.profile === "vgroove") P(`M${x + w/3} ${y}v${h}M${x + 2*w/3} ${y}v${h}`, l, .6);
    const drawer = kind === "drawer", hx = side === "R" ? x + w - 2.6 : x + 2.6;
    const len = kind === "tall" ? Math.min(9, h*.22) : 5;
    const hy = kind === "upper" ? y + h - 3 - len/2 : kind === "tall" ? y + h*.46 : y + 3 + len/2;
    if (s.handle === "bar") P(drawer ? `M${x + w*.32} ${y + 2.4}h${w*.36}` : `M${hx} ${hy - len/2}v${len}`, metal, 1.2, 'stroke-linecap="round"');
    if (s.handle === "knob" || (s.handle === "cup" && !drawer)) out.push(`<circle cx="${drawer ? x + w/2 : hx}" cy="${drawer ? y + Math.min(3, h/2) : hy}" r="1.05" fill="${metal}"/>`);
    if (s.handle === "cup" && drawer) F(`M${x + w/2 - 3} ${y + 2.2}a3 2.1 0 0 0 6 0z`, metal);
    if (s.handle === "profile") P(`M${x + 1} ${kind === "upper" ? y + h - .6 : y + .6}h${w - 2}`, metal, 1.1);
  };
  // Цокъл или крачета от y до пода.
  const base = (x, w, y) => {
    if (legs) for (const lx of [x + 2, x + w - 2, ...(w > 50 ? [x + w/2] : [])]) P(`M${lx} ${y}v${70 - y}`, metal, 1.1);
    else R(x + .5, y, w - 1, 70 - y, "rgba(0,0,0,.35)");
  };
  const crown = (x, y, w, color) => {
    if (!s.crown) return;
    R(x - 1.2, y - 2, w + 2.4, 2, color, `stroke="${lineOn(color)}" stroke-width=".4"`);
    R(x - 2.2, y - 3.6, w + 4.4, 1.6, color, `stroke="${lineOn(color)}" stroke-width=".4"`);
  };
  const clothes = (x, w, y, maxH) => { for (let i = 0, cx = x + 1; cx < x + w - 2; i++, cx += 2.8) R(cx, y, 2.4, maxH*(.62 + ((i*37) % 10)/26), SK_CLOTHES[i % SK_CLOTHES.length], 'rx=".6"'); };
  const stack = (x, y, w) => { for (let j = 0; j < 3; j++) R(x, y - 1.6*(j + 1), w, 1.5, SK_CLOTHES[(j*3 + Math.round(x)) % SK_CLOTHES.length], 'rx=".5"'); };
  const books = (x, y, w) => { for (let bx = x, i = 0; bx < x + w - 1.5; i++) { const bw = 1.2 + (i % 3)*.5; R(bx, y - 4 - (i % 2), bw, 4 + (i % 2), ["#ddd3c4", "#9aa293", "#c4a47e", "#4b4f54", "#7e6b59"][i % 5]); bx += bw + .2; } };
  const slats = (x, y, w, h, color) => { R(x, y, w, h, color); if (woodAccent) for (let sx = x + 1.5; sx < x + w - 1; sx += 2.6) R(sx, y, 1.6, h, lineOn(color), 'opacity=".55"'); };
  const tvScreen = (x, y, w, h) => R(x, y, w, h, "#151515", 'rx=".8"');
  const lampGlow = (cx, cy, r = 3.4) => out.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f6f0e4"/>`);
  // Стая: стена и под.
  R(0, 0, 120, 80, c.wall);
  R(0, 70, 120, 10, "#d8cab4");
  return {s, c, metal, legs, out, R, P, F, O, door, base, crown, clothes, stack, books, slats, tvScreen, lampGlow, lineOn,
    svg:() => `<svg class="art" viewBox="0 0 120 80" aria-hidden="true">${out.join("")}</svg>`};
}

// Кухня отпред. o: {L, U, island, hob, noUpper}
export function kitchenSketch(K, o = {}) {
  const {s, c, R, P, door, base, crown} = K;
  const legs = K.legs, baseY = legs ? 64 : 63;
  const left = o.L || o.U ? 18 : 8, right = o.U ? 102 : 112;
  // Колона вляво (или отляво на рамото).
  if (!o.L && !o.U) { door(8, 12, 20, 30, c.tall, "door", "R"); door(8, 42, 20, baseY - 42, c.tall, "door", "R"); crown(8, 12, 20, c.tall); base(8, 20, baseY); }
  // Рамо (Г или П): шкаф в перспектива отстрани.
  const arm = (x, dir) => {
    K.F(`M${x} 44.5 L${x + dir*10} 48 L${x + dir*10} ${baseY + 3} L${x} ${baseY}z`, c.lower, `stroke="${K.lineOn(c.lower)}" stroke-width=".5"`);
    K.F(`M${x} 42.5 L${x + dir*10} 46 L${x + dir*10} 48 L${x} 44.5z`, c.top);
  };
  if (o.L || o.U) arm(left, -1);
  if (o.U) arm(right, 1);
  const bx = o.L || o.U ? left : 30, bw = right - bx, dh = (baseY - 44.5)/3;
  const n = Math.max(2, Math.round(bw/27));
  for (let i = 0; i < n; i++) {
    const x = bx + i*bw/n;
    if (i % 2 === 0) for (let r = 0; r < 3; r++) door(x, 44.5 + r*dh, bw/n, dh, c.lower, "drawer");
    else door(x, 44.5, bw/n, baseY - 44.5, c.lower, "door", "R");
  }
  if (s.handle === "gola") P(`M${bx} 46h${bw}`, "rgba(0,0,0,.45)", 1);
  R(bx - 1, 42.5, bw + 2, 2, c.top, 'stroke="rgba(0,0,0,.15)" stroke-width=".4"');
  base(bx, bw, baseY);
  const uppers = o.noUpper ? "none" : s.uppers;
  if (["shelves", "rack"].includes(uppers)) {
    for (const y of uppers === "rack" ? [16, 25, 34] : [20, 31]) {
      R(bx + 2, y, bw - 4, 1.6, c.wood);
      for (let dx = 6; dx < bw - 6; dx += 9) R(bx + dx, y - 3.4, 3.2, 3.4, "#f3efe8", 'rx=".8" stroke="rgba(0,0,0,.15)" stroke-width=".3"');
    }
    if (uppers === "rack") for (const x of [bx + 3, bx + bw/2, bx + bw - 3]) P(`M${x} 12v25`, "#1d1d1d", .8);
  } else if (uppers === "none") R(bx + 4, 28, bw - 8, 1.8, c.wood);
  else {
    const y0 = uppers === "ceiling" ? 2 : 12, h = 32 - y0, m = Math.max(3, Math.round(bw/21));
    for (let i = 0; i < m; i++) {
      const x = bx + i*bw/m;
      if (uppers === "glass" && i % 2 === 1) {
        R(x, y0, bw/m, h, c.upper, `stroke="${K.lineOn(c.upper)}" stroke-width=".6"`); R(x + 2.5, y0 + 2.5, bw/m - 5, h - 5, "#dfe6e6", 'opacity=".85"');
        if (s.profile === "classic") P(`M${x + bw/m/2} ${y0 + 2.5}v${h - 5}M${x + 2.5} ${y0 + h/2}h${bw/m - 5}`, c.upper, 1);
      } else door(x, y0, bw/m, h, c.upper, "upper", i % 2 ? "L" : "R");
    }
    if (y0 > 4) crown(bx, y0, bw, c.upper);
  }
  if (o.hob) { K.F("M44 6h32l-4 8h-24z", "#c7c8c5"); P("M60 0v6", "#9a9a9a", 1.2); }
  // Остров отпред.
  if (o.island) {
    const ix = 26, iw = 68, iy = 61, col = c.island || c.lower;
    K.O(ix + iw/2, 76.6, iw/2 + 5, 2.2, "rgba(0,0,0,.14)");
    R(ix, iy, iw, 75 - iy, col, `stroke="${K.lineOn(col)}" stroke-width=".6"`);
    for (let i = 1; i < 3; i++) P(`M${ix + i*iw/3} ${iy + 2}v${75 - iy - 4}`, K.lineOn(col), .6);
    R(ix - 2.5, iy - 2.4, iw + 5, 2.4, c.top, 'stroke="rgba(0,0,0,.18)" stroke-width=".4"');
    if (o.hob) R(ix + iw/2 - 8, iy - 2.7, 16, .8, "#1b1b1b");
    R(ix + .5, 75, iw - 1, 1.6, "rgba(0,0,0,.35)");
  }
}
