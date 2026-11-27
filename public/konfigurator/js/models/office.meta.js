// Модели на домашния офис.
const lineStroke = (K, col) => `stroke="${K.lineOn(col)}" stroke-width=".5"`;
const monitor = (K, x, y, w, h) => { K.R(x, y, w, h, "#1b1b1b", 'rx=".8"'); K.R(x + w/2 - 1.6, y + h, 3.2, 2.2, "#1b1b1b"); };
const chairDot = (K, cx, cy) => { K.O(cx, cy, 6, 3.2, "#3f4144"); K.R(cx - 5, cy - 12, 10, 10, "#3f4144", 'rx="3"'); };

export const MODELS = {
  shelves:{name:"Бюро с рафтове", text:"Бюро с чекмеджета, рафтове и висок шкаф", set:{upper:"open", tall:true},
    sketch:K => {
      const {c, door, base, crown, R, books} = K;
      const baseY = K.legs ? 64 : 63, y0 = K.s.crown ? 9 : 5;
      R(8, y0, 22, 30, c.main, `stroke="${K.lineOn(c.main)}" stroke-width=".6"`);
      for (const y of [y0 + 10, y0 + 20, y0 + 30]) { R(9, y, 20, 1, K.lineOn(c.main)); books(10, y, 18); }
      door(8, y0 + 30, 22, baseY - y0 - 30, c.main, "door", "R");
      crown(8, y0, 22, c.main); base(8, 22, baseY);
      R(34, 44, 78, 2.4, c.accent); R(36, 46.4, 2, 23.6, c.accent);
      for (let r = 0; r < 3; r++) door(92, 46.4 + r*(baseY - 46.4)/3, 20, (baseY - 46.4)/3, c.main, "drawer");
      base(92, 20, baseY);
      R(54, 28, 22, 14, "#1b1b1b", 'rx=".8"'); R(63, 42, 4, 2, "#1b1b1b");
      for (const y of [14, 24]) { R(40, y, 50, 1.8, c.wood); books(44, y, 14); }
    }},
  cabinets:{name:"Бюро с шкафове отгоре", text:"Бюро с чекмеджета и горни шкафове с врати", set:{upper:"cabinets", tall:true},
    sketch:K => {
      const {c, door, base, crown, R} = K;
      const baseY = K.legs ? 64 : 63, y0 = K.s.crown ? 9 : 5;
      door(8, y0, 22, 24, c.main, "tall", "R"); door(8, y0 + 24, 22, baseY - y0 - 24, c.main, "tall", "R");
      crown(8, y0, 22, c.main); base(8, 22, baseY);
      for (let i = 0; i < 3; i++) door(34 + i*26, 16, 26, 20, c.main, "upper", i % 2 ? "L" : "R");
      R(34, 44, 78, 2.4, c.accent); R(36, 46.4, 2, 23.6, c.accent);
      for (let r = 0; r < 3; r++) door(92, 46.4 + r*(baseY - 46.4)/3, 20, (baseY - 46.4)/3, c.main, "drawer");
      base(92, 20, baseY);
      R(54, 29, 22, 14, "#1b1b1b", 'rx=".8"');
    }},
  library:{name:"Бюро в библиотека", text:"Бюро, вградено в стена от рафтове с долни шкафове и осветление", set:{},
    extra:n => [n, .3*n, .6*n, .8*n, -.4*n],
    sketch:K => {
      const {c, door, R, P, base, crown, books, O} = K;
      const y0 = K.s.crown ? 10 : 6, b = K.legs ? 64 : 63;
      R(5, y0, 110, b - y0, c.main, lineStroke(K, c.main));
      R(42, 26, 36, 20, c.accent);
      for (const y of [18, 26, 34, 42]) for (const x of [6, 82]) { R(x, y, 32, 1.4, c.wood); books(x + 2, y, 28); }
      for (const y of [14, 20]) { R(43, y, 34, 1.4, c.wood); books(45, y, 26); }
      P("M43 15.6h34", "#f6e7b8", 1);
      for (const x of [40, 77]) R(x, y0, 1.4, 40, c.main, lineStroke(K, c.main));
      for (let i = 0; i < 4; i++) door(5 + (i % 2)*17 + (i > 1 ? 75 : 0), 52, 17, b - 52, c.main, "door", i % 2 ? "L" : "R");
      R(41, 46, 38, 2.6, c.accent); R(43, 48.6, 2, 21.4, c.accent); R(75, 48.6, 2, 21.4, c.accent);
      R(52, 32, 16, 10, "#1b1b1b", 'rx=".8"'); R(59, 42, 2, 4, "#1b1b1b");
      crown(5, y0, 110, c.main); base(5, 34, b); base(81, 34, b);
      chairDot(K, 60, 64);
    }},
  corner:{name:"Ъглово бюро", text:"Г-образно бюро в ъгъла, шкафове отгоре и чекмеджета", set:{},
    extra:n => [1.5, .8, .6, .4*n, 0],
    sketch:K => {
      const {c, door, R, P, F, base, books} = K;
      const b = K.legs ? 64 : 63;
      for (let i = 0; i < 4; i++) door(30 + i*21, 14, 21, 18, c.main, "upper", i % 2 ? "L" : "R");
      P("M30 33.4h84", "#f6e7b8", 1);
      R(10, 20, 17, 1.8, c.wood);
      R(28, 46, 88, 2.6, c.accent);
      F("M5 62 L24 47 L36 47 L17 62z", c.accent, lineStroke(K, c.accent));
      R(5, 62, 12, 2.4, c.accent); R(5, 64.4, 1.6, 5.6, c.metal); R(15.4, 64.4, 1.6, 5.6, c.metal);
      for (let r = 0; r < 3; r++) door(94, 48.6 + r*(b - 48.6)/3, 20, (b - 48.6)/3, c.main, "drawer");
      base(94, 20, b);
      R(30, 48.6, 2, 21.4, c.accent);
      R(48, 31, 24, 14, "#1b1b1b", 'rx=".8"'); R(58, 45, 4, 1.6, "#1b1b1b");
      chairDot(K, 44, 64);
    }},
  bridge:{name:"Бюро между колони", text:"Бюро между два високи шкафа със шкаф-мост над него и LED", set:{},
    extra:n => [2 + .3*n, 1.6, 1.4, 1.5, -.2*n],
    sketch:K => {
      const {c, door, R, P, base, crown, slats} = K;
      const y0 = K.s.crown ? 10 : 6, b = K.legs ? 64 : 63;
      for (const [x, side] of [[5, "R"], [99, "L"]]) {
        door(x, y0, 16, 26, c.main, "upper", side); door(x, y0 + 26, 16, b - y0 - 26, c.main, "tall", side);
        crown(x, y0, 16, c.main); base(x, 16, b);
      }
      for (let i = 0; i < 2; i++) door(21 + i*39, y0 + 8, 39, 11, c.main, "upper");
      P(`M22 ${y0 + 20.4}h76`, "#f6e7b8", 1.2);
      slats(21, y0 + 21.5, 78, 46 - y0 - 21.5, c.accent);
      R(21, 46, 78, 2.6, c.accent);
      for (let r = 0; r < 2; r++) door(76, 48.6 + r*(b - 48.6)/2, 23, (b - 48.6)/2, c.main, "drawer");
      base(76, 23, b);
      R(22, 48.6, 2, 21.4, c.accent);
      R(44, 30, 22, 14, "#1b1b1b", 'rx=".8"'); R(54, 44, 3, 2, "#1b1b1b");
      chairDot(K, 50, 66);
    }},
  floating:{name:"Висящо бюро", text:"Дълго бюро на стената без крака, с чекмеджета, рафт и пано", set:{},
    extra:n => [-.6*n, -.2*n, -.3*n, -.4*n, 2 - n],
    sketch:K => {
      const {c, door, R, O, P, books} = K;
      R(10, 44, 100, 3.6, c.accent);
      for (let i = 0; i < 2; i++) door(70 + i*19, 47.6, 19, 7, c.main, "drawer");
      R(14, 22, 92, 1.8, c.wood); books(18, 22, 20); books(70, 22, 18); O(52, 19, 2.4, 3, "#e8e2d6");
      R(14, 28, 46, 14, c.accent);
      for (let x = 18; x < 58; x += 5) for (const y of [31, 36, 40]) O(x, y, .45, .45, "rgba(0,0,0,.35)");
      R(20, 32, 12, 1.2, c.main); R(40, 31, 9, 8, "#f4f0e8", 'rx=".5"');
      R(64, 36, 22, 8, "#1b1b1b", 'rx=".8"');
      P("M96 44v-6", "#8a7a68", .8); K.lampGlow(96, 36, 3);
      chairDot(K, 70, 62);
      R(14, 70, 92, 1.2, "rgba(0,0,0,.08)");
    }},
};
