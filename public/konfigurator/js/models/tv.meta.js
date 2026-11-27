// Модели на ТВ стената (холна секция).
const lineStroke = (K, col) => `stroke="${K.lineOn(col)}" stroke-width=".5"`;

export const MODELS = {
  floating:{name:"Висящ шкаф с ламели", text:"Ламели зад телевизора, висящ шкаф и рафтове", set:{panel:"slats", side:"shelves"},
    sketch:K => {
      const {c, door, R, slats, tvScreen, books} = K;
      slats(30, 6, 60, 64, c.accent);
      tvScreen(40, 16, 40, 23);
      for (let i = 0; i < 4; i++) door(20 + i*20, 50, 20, 10, c.main, "drawer");
      R(19, 49, 82, 1.2, c.main, `stroke="${K.lineOn(c.main)}" stroke-width=".3"`);
      for (const y of [16, 27, 38]) { R(96, y, 18, 1.6, c.wood); books(98, y, 9); }
    }},
  towers:{name:"С високи шкафове", text:"Две високи витрини отстрани, нисък шкаф и дълъг рафт над телевизора", set:{},
    extra:n => [3.6, 2.2, 2.2, 2, 0],
    sketch:K => {
      const {c, door, R, base, crown, tvScreen, books} = K;
      const y0 = K.s.crown ? 10 : 6, b = K.legs ? 64 : 63;
      for (const x of [5, 99]) {
        R(x + 1, y0, 14, 24, "#dfe8ea", lineStroke(K, c.main));
        books(x + 3, y0 + 11, 10); books(x + 3, y0 + 22, 10);
        door(x, y0 + 24, 16, b - y0 - 24, c.main, "tall", x < 50 ? "R" : "L");
        crown(x, y0, 16, c.main); base(x, 16, b);
      }
      R(21, 26, 78, 22, c.accent);
      R(21, 23.6, 78, 2.4, c.wood); books(26, 23.6, 16); books(76, 23.6, 14);
      tvScreen(42, 28, 36, 20);
      R(21, 49, 78, 2, c.top);
      for (let i = 0; i < 4; i++) door(21 + i*19.5, 51, 19.5, b - 51, c.main, i % 3 ? "drawer" : "door", "R");
      base(21, 78, b);
    }},
  wall:{name:"Стена от шкафове", text:"Шкафове от пода до тавана около телевизора, мост отгоре и чекмеджета отдолу", set:{},
    extra:n => [4 + .6*n, 2.4 + .4*n, 2.4 + .4*n, 3 + .3*n, 0],
    sketch:K => {
      const {c, door, R, P, base, crown, slats, tvScreen} = K;
      const y0 = K.s.crown ? 10 : 6, b = K.legs ? 64 : 63;
      for (const [x, side] of [[5, "R"], [99, "L"]]) {
        door(x, y0, 16, 28, c.main, "upper", side);
        door(x, y0 + 28, 16, b - y0 - 28, c.main, "tall", side);
        base(x, 16, b);
      }
      crown(5, y0, 110, c.main);
      for (let i = 0; i < 3; i++) door(21 + i*26, y0, 26, 11, c.main, "upper");
      slats(21, y0 + 11, 78, 31, c.accent);
      P(`M21.6 ${y0 + 11.4}v30.4M98.4 ${y0 + 11.4}v30.4`, "#f6e7b8", 1);
      tvScreen(40, y0 + 15, 40, 22.5);
      for (let i = 0; i < 3; i++) door(21 + i*26, y0 + 42, 26, b - y0 - 42, c.main, "drawer");
      base(21, 78, b);
    }},
  asym:{name:"Асиметрична", text:"Дълъг висящ шкаф, висока колона с рафтове и стенни кутии", set:{},
    extra:n => [1.8, .8, .8, 1, 0],
    sketch:K => {
      const {c, door, R, base, crown, tvScreen, books, O} = K;
      const y0 = K.s.crown ? 10 : 6, b = K.legs ? 64 : 63;
      // Колона вдясно с отворени рафтове горе.
      R(94, y0, 18, b - y0, c.main, lineStroke(K, c.main));
      for (const y of [y0 + 8, y0 + 16, y0 + 24]) { R(95, y, 16, 1.6, c.wood); books(97, y, 10); }
      O(103, y0 + 30, 3, 2.4, "#cfd8cf");
      door(94, 40, 18, b - 40, c.main, "tall", "L");
      crown(94, y0, 18, c.main); base(94, 18, b);
      // Нисък висящ шкаф.
      for (let i = 0; i < 3; i++) door(6 + i*27, 52, 27, 10, c.main, "drawer");
      R(5, 50.4, 83, 1.6, c.wood); R(8, 63, 77, 1.4, "rgba(0,0,0,.14)");
      tvScreen(30, 28, 32, 21);
      // Три кутии вляво.
      R(7, 34, 14, 7, c.accent, 'rx=".5"'); R(10, 22, 14, 7, c.accent, 'rx=".5"'); R(7, 10, 14, 7, c.accent, 'rx=".5"');
      books(8, 41, 10); O(17, 25, 2, 2.2, "#e8e2d6"); R(12, 12, 8, 4, "#c98b2a", 'rx="2"');
    }},
  fireplace:{name:"С камина", text:"Каменен панел с камина под телевизора, шкафове и рафтове отстрани", set:{},
    extra:n => [.5, 2.5, .2, 0, -.3*n],
    sketch:K => {
      const {c, door, R, F, base, tvScreen, books} = K;
      const b = K.legs ? 64 : 63;
      R(34, 4, 52, 66, c.top, 'stroke="rgba(0,0,0,.18)" stroke-width=".5"');
      for (let y = 10; y < 70; y += 9) R(34, y, 52, .5, "rgba(0,0,0,.14)");
      for (let y = 14; y < 66; y += 9) R(34 + ((y*7) % 12) + 6, y - 4.5, .5, 4.5, "rgba(0,0,0,.14)");
      tvScreen(44, 12, 32, 18);
      R(46, 44, 28, 12, "#1a1a1a", 'stroke="#2e2e2e" stroke-width="1"');
      F("M50 55c1-5 2-6 3-8 1 3 2 4 3 4 1-4 3-6 4-8 1 3 2 5 3 8 1-2 2-3 3-4 1 3 1 6 2 8z", "#ff8a1f");
      F("M55 55c1-3 2-4 3-5 1 2 2 3 2 5z", "#ffd25a");
      for (const [x, side] of [[6, "R"], [86, "L"]]) {
        door(x, 54, 14, b - 54, c.main, "door", side); door(x + 14, 54, 14, b - 54, c.main, "door", side === "R" ? "L" : "R");
        R(x - .5, 52.4, 29, 1.8, c.wood); base(x, 28, b);
        for (const y of [28, 40]) { R(x + 2, y, 24, 1.6, c.wood); books(x + 4, y, 12); }
      }
    }},
  library:{name:"Библиотека", text:"Рафтове от пода до тавана с ниша за телевизор и долни шкафове", set:{},
    extra:n => [1.8*n, .5*n, .6*n, .5*n, 0],
    sketch:K => {
      const {c, door, R, base, crown, tvScreen, books, O} = K;
      const y0 = K.s.crown ? 10 : 6, b = K.legs ? 64 : 63;
      R(5, y0, 110, 52 - y0 + 4, c.main, lineStroke(K, c.main));
      R(40, 26, 40, 22, c.accent); tvScreen(44, 28, 32, 18);
      const shelf = (x, w, y) => { R(x, y, w, 1.4, c.wood); books(x + 2, y, w - 4); };
      for (const y of [16, 24, 32, 40, 48]) { shelf(6, 33, y); shelf(81, 33, y); }
      shelf(41, 38, 17); R(40, 24.6, 40, 1.4, c.wood);
      for (const x of [39, 80, 22, 97]) R(x, y0, 1.2, 52 - y0 + 4, c.main, lineStroke(K, c.main));
      O(57, 22, 2, 2.4, "#d8d2c4"); O(24, 37, 2, 2.4, "#d8d2c4");
      for (let i = 0; i < 6; i++) door(5 + i*18.33, 56, 18.33, b - 56, c.main, "door", i < 3 ? "R" : "L");
      R(4, 54.4, 112, 1.8, c.wood);
      crown(5, y0, 110, c.main); base(5, 110, b);
    }},
};
