// Модели на гардеробната.
// Открита система по една стена за скиците (три секции: закачалки, рафтове, обувки).
const openWall = (K, x0, w, y0, y1) => {
  const {c, R, P, clothes, stack} = K, sw = w/3;
  R(x0, y0, w, y1 - y0, c.accent);
  for (let i = 0; i <= 3; i++) R(x0 + i*sw - (i === 3 ? 2 : 0), y0, 2, y1 - y0, c.wood, `stroke="${K.lineOn(c.accent)}" stroke-width=".4"`);
  R(x0, y0, w, 2, c.wood); R(x0, y1 - 2, w, 3, c.wood);
  P(`M${x0 + 3} ${y0 + 10}h${sw - 6}`, c.metal, .8); clothes(x0 + 3, sw - 6, y0 + 10.5, Math.min(22, (y1 - y0)*.4));
  for (const y of [y0 + 18, y0 + 28, y0 + 38]) { R(x0 + sw + 2, y, sw - 4, 1, "#f3efe8"); stack(x0 + sw + 4, y, Math.min(10, sw*.35)); }
  for (const y of [y0 + 15, y0 + 25, y0 + 35, y0 + 45]) { R(x0 + 2*sw + 2, y, sw - 4, 1, "#f3efe8"); for (let sx = x0 + 2*sw + 3; sx < x0 + 3*sw - 6; sx += 6) R(sx, y - 2.2, 4.4, 2.2, ["#2f2c2a", "#e9e5de", "#8a6a4e"][Math.round(sx + y) % 3], 'rx="1"'); }
};
export const MODELS = {
  Lisland:{name:"Г-образна с остров", text:"Две стени с открита система и остров с чекмеджета", set:{shape:"L", island:true},
    sketch:K => {
      const {c, R, P, door, base, clothes, stack} = K;
      const x0 = 12, w = 96, y0 = 7, y1 = 60;
      R(x0, y0, w, y1 - y0, c.accent);
      for (const x of [x0, x0 + 32, x0 + 64, x0 + w - 2]) R(x, y0, 2, y1 - y0, c.wood, `stroke="${K.lineOn(c.accent)}" stroke-width=".4"`);
      R(x0, y0, w, 2, c.wood);
      for (const x of [x0 + 2, x0 + 34, x0 + 66]) R(x, 14, 30, 1, "#f3efe8");
      P(`M${x0 + 3} 18h28`, c.metal, .8); clothes(x0 + 3, 28, 18.5, 22);
      for (const y of [26, 36, 46]) { R(x0 + 34, y, 30, 1, "#f3efe8"); stack(x0 + 37, y, 10); stack(x0 + 50, y, 10); }
      for (const y of [22, 30, 38, 46, 54]) { R(x0 + 66, y, 28, 1, "#f3efe8"); for (let sx = x0 + 68; sx < x0 + 92; sx += 6) R(sx, y - 2.2, 4.4, 2.2, ["#2f2c2a", "#e9e5de", "#8a6a4e"][Math.round(sx + y) % 3], 'rx="1"'); }
      const ix = 36, iw = 48, iy = 52, baseY = K.legs ? 66 : 65.5;
      for (let col = 0; col < 3; col++) for (let r = 0; r < 2; r++) door(ix + col*iw/3, iy + r*(baseY - iy)/2, iw/3, (baseY - iy)/2, c.main, "drawer");
      R(ix - 1, iy - 2, iw + 2, 2, c.wood, 'stroke="rgba(0,0,0,.15)" stroke-width=".4"'); base(ix, iw, baseY);
    }},
  one:{name:"По една стена", text:"Цяла стена с открита система, без остров", set:{shape:"I", island:false},
    sketch:K => {
      const {R} = K;
      openWall(K, 10, 100, 7, 63);
      R(30, 72, 60, 4, "#d9cfc0", 'rx="2"'); R(88, 62, 14, 8, "#ebe5da", 'rx="3.5"');
    }},
  L:{name:"Г-образна", text:"Две стени, свободен център", set:{shape:"L", island:false},
    sketch:K => {
      const {c, R, P, F} = K;
      openWall(K, 32, 78, 7, 63);
      F("M4 9L27 12V68L4 73z", c.main, 'stroke="rgba(0,0,0,.15)" stroke-width=".4"');
      F("M7 16L23 18V34L7 36z", "#cfe3ee", 'stroke="rgba(255,255,255,.7)" stroke-width="1"');
      F("M5 52L26 56V67L5 71z", c.accent); F("M4 49L27 53L27 56L4 52z", c.wood);
      P("M5 59L26 62M5 65L26 67.5", "rgba(0,0,0,.25)", .6);
      R(46, 72, 48, 4, "#d9cfc0", 'rx="2"');
    }},
  U:{name:"П-образна с остров", text:"Три стени и остров в средата", set:{shape:"U", island:true},
    sketch:K => {
      const {c, R, P, F} = K;
      openWall(K, 28, 64, 7, 63);
      F("M4 8L26 11V66L4 72z", c.accent, 'stroke="rgba(0,0,0,.15)" stroke-width=".4"');
      F("M116 8L94 11V66L116 72z", c.accent, 'stroke="rgba(0,0,0,.15)" stroke-width=".4"');
      for (const y of [22, 34, 46, 58]) P(`M5 ${y - 1}L25 ${y + 2}M115 ${y - 1}L95 ${y + 2}`, "#f3efe8", 1.2);
      R(37, 58, 46, 2.4, c.wood); R(38, 60.4, 44, 9, c.main, 'stroke="rgba(0,0,0,.2)" stroke-width=".4"');
      P("M38 63.4h44M38 66.4h44M53 60.4v9M68 60.4v9", "rgba(0,0,0,.22)", .5);
    }},
  glass:{name:"Със стъклени витрини", text:"Затворени шкафове със стъклени врати и LED на главната стена, открита система отстрани и остров",
    set:{shape:"L", island:true},
    extra:n => [n*.5, n*.9, 0, n*.7, 0],
    sketch:K => {
      const {c, R, P, door, base, clothes, stack} = K;
      const x0 = 10, w = 100, y0 = 6, y1 = 56, sw = w/4;
      R(x0, y0, w, y1 - y0, "#efe9de");
      for (let i = 0; i <= 4; i++) R(x0 + i*sw - 1, y0, 2, y1 - y0, c.main);
      R(x0, y0, w, 2, c.main); R(x0, y1 - 2, w, 2.5, c.main);
      P(`M${x0 + 4} 16h${sw - 8}`, c.metal, .8); clothes(x0 + 4, sw - 8, 16.5, 22);
      for (const y of [22, 32, 42]) { R(x0 + sw + 2, y, sw - 4, 1, "#f3efe8"); stack(x0 + sw + 4, y, 9); stack(x0 + sw + 15, y, 8); }
      P(`M${x0 + 2*sw + 3} 14h${sw - 6}`, c.metal, .8); clothes(x0 + 2*sw + 3, sw - 6, 14.5, 12);
      P(`M${x0 + 2*sw + 3} 31h${sw - 6}`, c.metal, .8); clothes(x0 + 2*sw + 3, sw - 6, 31.5, 12);
      for (const y of [24, 31, 38, 45]) { R(x0 + 3*sw + 2, y, sw - 4, 1, "#f3efe8"); for (let sx = x0 + 3*sw + 3; sx < x0 + 4*sw - 6; sx += 7) R(sx, y - 2.4, 5.2, 2.4, ["#2f2c2a", "#e9e5de", "#8a6a4e"][Math.round(sx + y) % 3], 'rx="1"'); }
      for (let i = 0; i < 4; i++) {
        const gx = x0 + i*sw + 1;
        R(gx, y0 + 2, sw - 2, y1 - y0 - 4, "rgba(150,190,200,.3)", `stroke="${c.metal}" stroke-width="1"`);
        P(`M${i % 2 ? gx + 3 : gx + sw - 5} ${y0 + 20}v10`, c.metal, 1);
        P(`M${i % 2 ? gx + sw - 3.4 : gx + 2.4} ${y0 + 5}v${y1 - y0 - 10}`, "#ffe2a0", .8, 'opacity=".9"');
      }
      base(x0, w, y1 + .5);
      const ix = 38, iw = 44, iy = 61;
      for (let col = 0; col < 3; col++) for (let r = 0; r < 2; r++) door(ix + col*iw/3, iy + r*4.4, iw/3, 4.4, c.main, "drawer");
      R(ix - 1, iy - 2, iw + 2, 2, c.wood, 'stroke="rgba(0,0,0,.15)" stroke-width=".4"');
    }},
  vanity:{name:"С тоалетка", text:"Открита система на главната стена, тоалетка с голямо огледало с LED и тапицирана табуретка",
    set:{shape:"L", island:false},
    extra:() => [0, .5, 0, 0, 0],
    sketch:K => {
      const {c, R, P, F, O, door, clothes, stack} = K;
      const x0 = 8, w = 66, y0 = 7, y1 = 62;
      R(x0, y0, w, y1 - y0, c.accent);
      for (const x of [x0, x0 + 32, x0 + w - 2]) R(x, y0, 2, y1 - y0, c.wood, `stroke="${K.lineOn(c.accent)}" stroke-width=".4"`);
      R(x0, y0, w, 2, c.wood);
      P(`M${x0 + 3} 17h27`, c.metal, .8); clothes(x0 + 3, 27, 17.5, 22);
      P(`M${x0 + 3} 40h27`, c.metal, .8); clothes(x0 + 3, 27, 40.5, 16);
      for (const y of [24, 34, 44, 54]) { R(x0 + 34, y, 30, 1, "#f3efe8"); stack(x0 + 37, y, 10); stack(x0 + 50, y, 10); }
      R(x0, y1 - 3, w, 4, c.wood);
      R(80, 10, 29, 33, c.metal, 'rx="1"'); R(81.6, 11.6, 25.8, 29.8, "#cfd5d6"); P("M85 38l12 -22M92 40l14 -24", "#ffffff", 1, 'opacity=".5"');
      R(79.4, 10, 1, 33, "#ffe2a0"); R(108.6, 10, 1, 33, "#ffe2a0"); R(80, 9.4, 29, 1, "#ffe2a0"); R(80, 42.6, 29, 1, "#ffe2a0");
      F("M87 49c-.5 -3 1 -4 1.4 -6c.4 2 1.7 3 1.2 6z", "#f3efe8"); R(98, 47, 7, 2, "#c9b79c", 'rx=".6"');
      R(78, 49, 33, 2.2, c.wood); door(80, 51.2, 14.5, 4.2, c.main, "drawer"); door(95, 51.2, 14.5, 4.2, c.main, "drawer");
      P("M80.6 55.4v14.6M109.4 55.4v14.6", c.metal, 1.1);
      R(86, 58.5, 17, 3.4, "#b99d8a", 'rx="1.6"'); P("M88 62v8M101 62v8", c.metal, .9);
    }},
};
