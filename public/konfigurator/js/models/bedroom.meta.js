// Модели на спалнята.
const TONE = "#cbbfad";
// Легло отпред: рамка, матрак, завивка и две възглавници.
const bed = (K, cx, w, frame = "#cbbfad") => {
  const {R} = K, x = cx - w/2;
  R(x, 60, w, 8, frame, 'rx="1.5"'); R(x + .5, 53.5, w - 1, 8, "#f4f1ec", 'rx="2"'); R(x + .5, 57.5, w - 1, 4, "#9aa48f", 'rx="1.5"');
  R(x + 3, 49.5, (w - 9)/2, 5, "#ffffff", 'rx="2.5" stroke="rgba(0,0,0,.08)" stroke-width=".4"'); R(x + w/2 + 1.5, 49.5, (w - 9)/2, 5, "#ffffff", 'rx="2.5" stroke="rgba(0,0,0,.08)" stroke-width=".4"');
};
const LED = "#ffe6b0";
export const MODELS = {
  slats:{name:"Ламели и висящи шкафчета", text:"Стена с ламели, висящи нощни шкафчета и LED", set:{head:"panel", stands:"floating"},
    sketch:K => {
      const {c, R, O, door, slats, lampGlow, P} = K;
      slats(24, 8, 72, 50, c.accent);
      O(60, 74, 46, 5, "#e4dccf");
      R(30, 56, 60, 10, c.wood, 'rx="1.5"'); R(31, 50, 58, 8, "#f4f1ec", 'rx="2"'); R(31, 55, 58, 4, "#9aa48f", 'rx="1.5"');
      R(36, 46, 20, 6, "#ffffff", 'rx="3" stroke="rgba(0,0,0,.08)" stroke-width=".4"'); R(64, 46, 20, 6, "#ffffff", 'rx="3" stroke="rgba(0,0,0,.08)" stroke-width=".4"'); R(52, 48, 16, 4, "#6e2f35", 'rx="2"');
      for (const x of [9, 97]) { door(x, 44, 14, 9, c.main, "drawer"); lampGlow(x + 7, 38); P(`M${x + 7} 41.4v2.6`, "#8a7a68", .8); }
    }},
  upholstered:{name:"Тапицирана стена", text:"Мека тапицирана стена зад леглото, подсветена полица и аплици", set:{head:"upholstered", stands:"floating", led:true},
    extra:(n, h, f) => [0, Math.max(0, n*.9*1.4 - (Number(f.bed || 160)/100 + .2)*1.2), 0, 0, 0],
    sketch:K => {
      const {c, R, door, lampGlow, P} = K;
      for (let i = 0; i < 12; i++) R(7 + i*8.8, 31, 8.2, 39, TONE, 'rx="2"');
      for (let i = 1; i < 12; i++) R(6.5 + i*8.8, 31, .5, 39, "rgba(80,60,40,.18)");
      R(7, 29, 106, 2.4, c.accent); R(7, 31.4, 106, 1.8, LED, 'opacity=".75"');
      bed(K, 60, 46, TONE);
      for (const x of [14, 96]) { door(x, 50, 12, 6, c.main, "drawer"); lampGlow(x + 6, 42, 2.6); P(`M${x + 6} 44.6v3.4`, "#8a7a68", .8); }
    }},
  bridge:{name:"Шкафове над леглото", text:"Гардероби от двете страни и мост от шкафове над леглото", set:{head:"upholstered", stands:"floating", led:true},
    extra:(n, h, f) => {
      const bw = Number(f.bed || 160)/100, tw = Math.min(1.8, Math.max(.45, (n - bw - .5)/2)), bl = Math.max(.8, n - 2*tw), u = Math.min(h, 2.4);
      return [2*tw*u*1.45 + bl*1.2, 2*tw*u + bl*.5, 2*tw*u + bl*.5, Math.round(2*tw*1.67 + bl/.7), 0];
    },
    sketch:K => {
      const {c, R, door, crown, base, lampGlow} = K;
      const y0 = K.s.crown ? 10 : 6, by = K.legs ? 64 : 63;
      R(30, 52, 60, 18, TONE, 'rx="3"');
      door(6, y0, 24, by - y0, c.main, "tall", "R"); door(90, y0, 24, by - y0, c.main, "tall", "L");
      for (let i = 0; i < 3; i++) door(30 + i*20, 18, 20, 12, c.main, "upper", "R");
      R(30, 30, 60, 1.6, LED, 'opacity=".85"'); lampGlow(60, 34, 3);
      crown(6, y0, 108, c.main); base(6, 24, by); base(90, 24, by);
      bed(K, 60, 44, TONE);
      door(31, 49, 8, 5, c.main, "drawer"); door(81, 49, 8, 5, c.main, "drawer");
    }},
  niche:{name:"Табла с ниша и LED", text:"Широка табла с вградена подсветена ниша и конзолни нощни шкафчета", set:{head:"wood", stands:"floating", led:true},
    extra:(n, h, f) => { const bw = Number(f.bed || 160)/100; return [.6, Math.max(0, (bw + 1.4)*1.25 - (bw + .2)*1.2), 0, 0, 0]; },
    sketch:K => {
      const {c, R, door, lampGlow, books} = K;
      R(12, 28, 96, 38, c.accent, 'rx="1.5"');
      R(20, 40, 80, 5.5, "#2b2622", 'rx=".8"'); R(20, 45, 80, 1.3, LED, 'opacity=".9"'); R(20, 45.8, 80, 1.2, "rgba(255,230,176,.35)");
      R(30, 36, 3, 4, "#e7e0d4", 'rx="1"'); R(35, 37.5, 2.2, 2.6, "#9aa48f", 'rx="1"'); books(66, 40.2, 10);
      bed(K, 60, 44, c.wood);
      for (const x of [14, 94]) { door(x, 50, 12, 6, c.main, "drawer"); lampGlow(x + 6, 46, 2.4); }
    }},
  wardrobeWall:{name:"Стена от гардероби", text:"Гардероби по цялата стена и мека ниша за леглото в средата", set:{head:"upholstered", stands:"floating", led:true},
    extra:(n, h, f) => {
      const bw = Number(f.bed || 160)/100, tw = Math.min(3, Math.max(.45, n - bw - .9)), u = Math.min(h, 2.6);
      return [tw*u*1.45, tw*u, tw*u + (bw + .9)*u*.6, Math.round(tw*1.67), Math.round(tw*.67)];
    },
    sketch:K => {
      const {c, R, door, crown, base, slats, lampGlow} = K;
      const y0 = K.s.crown ? 9 : 5, by = K.legs ? 64 : 63;
      for (let i = 0; i < 3; i++) door(4 + i*11, y0, 11, by - y0, c.main, "tall", i % 2 ? "L" : "R");
      for (let i = 0; i < 3; i++) door(83 + i*11, y0, 11, by - y0, c.main, "tall", i % 2 ? "L" : "R");
      crown(4, y0, 33, c.main); crown(83, y0, 33, c.main); base(4, 33, by); base(83, 33, by);
      for (let i = 0; i < 6; i++) R(37 + i*7.7, y0, 7.2, by - y0 + 6, TONE, 'rx="1.5"');
      R(37, y0, 46, 2.2, c.accent); R(37, y0 + 2.2, 46, 1.4, LED, 'opacity=".85"');
      bed(K, 60, 34, TONE);
      R(39, 52, 5.5, 1.8, c.accent); R(75.5, 52, 5.5, 1.8, c.accent); lampGlow(41.8, 49, 2.2); lampGlow(78.2, 49, 2.2);
    }},
  vanity:{name:"С тоалетка", text:"Мека табла с крила, нощно шкафче и тоалетка с огледало", set:{head:"upholstered", stands:"standing"},
    extra:() => [1, .6, .4, 0, 2],
    sketch:K => {
      const {c, R, O, door, base, lampGlow, P} = K;
      R(14, 28, 52, 34, TONE, 'rx="5"'); R(10, 31, 5, 31, TONE, 'rx="2"'); R(65, 31, 5, 31, TONE, 'rx="2"');
      bed(K, 40, 44, TONE);
      door(2, 52, 8, 16, c.main, "drawer"); R(1, 50.6, 10, 1.6, c.accent); lampGlow(6, 45, 2.4);
      R(76, 52, 38, 2, c.accent); door(78, 54, 17, 7, c.main, "drawer"); door(95, 54, 17, 7, c.main, "drawer"); if (K.legs) { P("M79 54v16M111 54v16", c.metal, 1); }
      O(95, 34, 12, 12, "#dfe5e8", 'stroke="' + c.metal + '" stroke-width="1.2"'); P("M88 30l6-5", "rgba(255,255,255,.8)", 1.2);
      lampGlow(81, 47, 2.4); O(95, 66, 6, 2.2, TONE);
    }},
};
