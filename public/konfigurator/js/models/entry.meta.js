// Модели на антрето.
export const MODELS = {
  closetBench:{name:"Шкаф, пейка и закачалки", text:"Висок шкаф, пейка за обувки, закачалки и огледало", set:{closet:true, bench:true, mirror:true},
    sketch:K => {
      const {c, door, base, crown, R, F, P} = K;
      const baseY = K.legs ? 64 : 63, y0 = K.s.crown ? 9 : 5;
      door(8, y0, 15, baseY - y0, c.main, "tall", "R"); door(23, y0, 15, baseY - y0, c.main, "tall", "L");
      crown(8, y0, 30, c.main); base(8, 30, baseY);
      R(46, 14, 34, 26, c.accent); R(46, 12, 34, 2, c.wood);
      F("M52 18l-5 4v14h12v-14z", "#8e857a"); P("M72 18v14", "#b5654a", 3);
      door(46, 52, 17, 11, c.main, "door", "R"); door(63, 52, 17, 11, c.main, "door", "L");
      R(46, 49, 34, 3, "#ebe5da", 'rx="1.2"'); R(46, 63, 34, 7, "rgba(0,0,0,.3)");
      R(88, 10, 18, 52, c.accent); R(90, 12, 14, 48, "#cfd5d6");
      P("M92 16l8 -3M92 22l10 -4", "#ffffff", .8, 'opacity=".6"');
    }},
  niche:{name:"Шкаф с ниша", text:"Шкафове до тавана с отворена ниша: пейка, обувки, закачалки и рафт със светлина", set:{},
    extra:(n, h) => { const u = Math.min(h, 2.6); return [-n*u*.2, -n*u*.25, -n*u*.1, -.35*n, 0]; },
    sketch:K => {
      const {c, door, base, crown, R, F, P, slats} = K;
      const baseY = K.legs ? 64 : 63, y0 = K.s.crown ? 9 : 5;
      door(8, y0, 14, baseY - y0, c.main, "tall", "R"); door(22, y0, 14, baseY - y0, c.main, "tall", "L");
      door(78, y0, 17, baseY - y0, c.main, "tall", "R"); door(95, y0, 17, baseY - y0, c.main, "tall", "L");
      crown(8, y0, 104, c.main); base(8, 28, baseY); base(78, 34, baseY);
      R(36, y0, 42, 64 - y0, c.accent); slats(36, y0 + 9, 42, 55 - y0, c.accent);
      door(36, y0, 42, 9, c.main, "upper", "R");
      R(37, 19, 40, 1.8, c.wood); R(40, 15.5, 2, 3.5, "#9aa293"); R(43, 14.5, 2, 4.5, "#c4a47e"); R(66, 13, 5, 6, "#ebe5da", 'rx="1"');
      for (const x of [44, 57, 70]) R(x - 1, 25, 2, 1.2, c.metal);
      F("M44 26l-5 3v13h10v-13z", "#8e857a"); R(52, 30, 9, 8, "#8a6a4e", 'rx="1.5"'); P("M70 27v13", "#b5654a", 3);
      R(37, 52.5, 40, 3.4, "#ebe5da", 'rx="1.4"'); R(36.5, 55.5, 41, 2.2, c.wood);
      R(37, 63.2, 40, 1.2, c.wood);
      for (const sx of [39, 48, 57, 66]) { R(sx, 60.2, 6.5, 3, ["#2f2c2a", "#e9e5de", "#8a6a4e", "#4b4f54"][sx % 4], 'rx="1.2"'); R(sx + 1, 66.6, 6.5, 3.2, ["#e9e5de", "#2f2c2a", "#c9b79c", "#8a6a4e"][sx % 4], 'rx="1.2"'); }
    }},
  shoeMirror:{name:"Обувки и огледало", text:"Висящ шкаф за обувки с дървен плот, голямо огледало и стенен рафт със закачалки", set:{},
    extra:(n, h) => { const u = Math.min(h, 2.6); return [-n*u*.55, -n*u*.6, -n*u*.65, -.55*n, -.3*n]; },
    sketch:K => {
      const {c, door, R, F, P, O} = K;
      R(14, 9, 40, 28, c.metal, 'rx=".8"'); R(15.4, 10.4, 37.2, 25.2, "#cfd5d6"); P("M20 30l12 -16M28 33l16 -20", "#ffffff", 1, 'opacity=".55"');
      door(8, 41, 31, 25, c.main, "door", "R"); door(39, 41, 31, 25, c.main, "door", "L");
      R(7, 38.5, 64, 2.6, c.wood); R(9, 66.6, 60, 1.6, "rgba(0,0,0,.22)");
      F("M20 38.5q-1 -6 1.5 -7q2.5 1 1.5 7z", "#f3efe8"); R(34, 34.6, 8, 3.9, "#c9b79c", 'rx="1"'); R(56, 29, 6, 9.5, "#f2ebdf", 'rx="1"');
      R(78, 20, 33, 2, c.wood); R(78, 23, 33, 3.2, c.accent);
      for (const x of [86, 97, 105]) R(x - 1, 26.2, 2, 1.6, c.metal);
      F("M86 27.5l-6 3.5v16h12v-16z", "#3e4347"); P("M97 28v11", "#d9c4a6", 2.6); R(78.5, 15.6, 7, 4.4, "#7e6b59");
      R(16, 72, 88, 4.5, "#d9cfc0", 'rx="2"');
    }},
  open:{name:"Отворена система", text:"Стенен панел със закачалки, рафт, пейка с кошници и обувки, без шкаф", set:{},
    extra:(n, h) => { const u = Math.min(h, 2.6); return [-n*u*.9, -n*u*.65, -n*u*.5, -1.2*n, -.5*n]; },
    sketch:K => {
      const {c, R, F, P, slats, stack} = K;
      R(16, 17, 88, 40, c.accent); slats(16, 17, 88, 40, c.accent);
      [[28, "#8e857a"], [46, "#b5654a"], [64, "#6e5b4b"], [82, "#8a6a4e"], [97, "#7d8a74"]].forEach(([x, col], i) => {
        R(x - 1, 22, 2, 1.4, c.metal);
        if (i % 2 === 0) F(`M${x} 23l-5 3v${i === 2 ? 22 : 16}h10v-${i === 2 ? 22 : 16}z`, col); else if (i === 1) P(`M${x} 24v12`, col, 3); else R(x - 5, 28, 10, 8, col, 'rx="1.5"');
      });
      R(16, 15, 88, 2, c.wood); stack(20, 15, 14); stack(37, 15, 14); R(66, 9.5, 14, 5.5, "#8a6a4e", 'rx="2"'); stack(86, 15, 14);
      R(16, 57, 88, 2.4, c.wood); R(17, 53.6, 86, 3.4, "#ebe5da", 'rx="1.5"');
      P("M19 59.4v10.6M101 59.4v10.6", c.metal, 1.1);
      R(18, 64, 84, 1.2, c.wood);
      [22, 44, 66, 86].forEach((x, i) => R(x, 59.6, 15, 4.4, ["#d9cfc0", "#b7a58c", "#9aa48f", "#cbbfad"][i], 'rx="2"'));
      [24, 38, 52, 66, 80].forEach((x, i) => R(x, 66.6, 7, 3.2, ["#2f2c2a", "#e9e5de", "#8a6a4e", "#4b4f54", "#c9b79c"][i], 'rx="1.2"'));
    }},
  mirrorCloset:{name:"Гардероб с огледала", text:"Гардероб до тавана с огледални врати и подсветка, пуф отпред", set:{},
    extra:(n, h) => { const u = Math.min(h, 2.6); return [0, n*u*.25, 0, 0, 0]; },
    sketch:K => {
      const {c, door, base, crown, R, P, O} = K;
      const baseY = K.legs ? 64 : 63, y0 = K.s.crown ? 9 : 5, dw = 104/6;
      for (let i = 0; i < 6; i++) {
        const x = 8 + i*dw;
        door(x, y0, dw, baseY - y0, c.main, "tall", i % 2 ? "L" : "R");
        R(x + 2, y0 + 2.5, dw - 4, baseY - y0 - 5, "#cfd5d6", 'opacity=".95"');
        P(`M${x + 4} ${baseY - 10}l${dw - 9} -${(baseY - y0)*.55}`, "#ffffff", 1.2, 'opacity=".5"');
      }
      crown(8, y0, 104, c.main); base(8, 104, baseY);
      P(`M9 ${y0 + .6}h102`, "#ffe2a0", 1);
      R(88, 62, 15, 8, "#ebe5da", 'rx="4"'); R(22, 72, 70, 4, "#cfc6b6", 'rx="2"');
    }},
  slim:{name:"Тесен коридор", text:"Плитки вградени шкафове до тавана, осветена ниша и една отворена колона със закачалки", set:{},
    extra:(n, h) => { const u = Math.min(h, 2.6); return [-n*u*.2, -n*u*.1, -n*u*.1, -.15*n, 0]; },
    sketch:K => {
      const {c, door, base, crown, R, F, P, books} = K;
      const baseY = K.legs ? 64 : 63, y0 = K.s.crown ? 9 : 5;
      for (let i = 0; i < 4; i++) {
        const x = 8 + i*19.5;
        door(x, 45, 19.5, baseY - 45, c.main, "door", i % 2 ? "L" : "R");
        door(x, y0, 19.5, 31 - y0, c.main, "upper", i % 2 ? "L" : "R");
      }
      R(8, 33, 78, 12, c.accent); R(8, 31.6, 78, 1.8, c.main); R(8, 44.4, 78, 1.6, c.main);
      P("M10 32.6h74", "#ffe2a0", 1.2); R(14, 42.6, 12, 1.4, c.wood); R(15, 41, 3, 1.6, c.metal);
      books(60, 44.4, 14); for (const x of [38, 44, 50]) R(x, 36, 1.6, 4, c.metal);
      crown(8, y0, 104, c.main); base(8, 78, baseY);
      R(90, y0, 22, baseY - y0, c.accent); R(90, y0, 22, baseY - y0, "rgba(0,0,0,.16)"); R(110, y0, 2, baseY - y0, c.main);
      R(90, 20, 20, 1.6, c.wood); R(93, 13, 7, 7, "#8a6a4e", 'rx="1.5"'); R(102, 14, 6, 6, "#d9cfc0", 'rx="1.5"');
      R(97, 25, 2, 1.4, c.metal); F("M98 26l-5 3v18h10v-18z", "#8e857a");
      R(90, 55, 20, 1.2, c.wood); R(90, baseY - .4, 20, 1.2, c.wood);
      for (const sx of [92, 101]) { R(sx, 52, 6.5, 3, "#2f2c2a", 'rx="1.2"'); R(sx, baseY - 3.4, 6.5, 3, "#e9e5de", 'rx="1.2"'); }
    }},
};
