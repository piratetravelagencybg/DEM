// Модели на гардероба. set се записва в state.furn.wardrobe; extra добавя към цената: [корпус, лице, гръб м², врати, чекмеджета].
export const MODELS = {
  hinged:{name:"Врати на панти", text:"Класически гардероб с врати до тавана", set:{doors:"hinged"},
    sketch:K => {
      const {c, door, base, crown, O, R} = K;
      const y0 = K.s.crown ? 9 : 5, baseY = K.legs ? 64 : 63, x0 = 22, w = 76;
      O(60, 75, 40, 4, "#e4dccf");
      for (let i = 0; i < 4; i++) door(x0 + i*w/4, y0, w/4, baseY - y0, c.main, "tall", i % 2 ? "L" : "R");
      crown(x0, y0, w, c.main); base(x0, w, baseY);
      R(92, 62, 14, 9, "#ebe5da", 'rx="4"');
    }},
  sliding:{name:"Плъзгащи врати", text:"Две или три плъзгащи врати, пестят място", set:{doors:"sliding"}},
  mirror:{name:"Плъзгащи с огледала", text:"Плъзгащи врати с огледала", set:{doors:"mirror"}},
  glass:{name:"Стъклени врати с LED", text:"Тонирано стъкло в алуминиева рамка и осветена вътрешност", set:{doors:"glass", led:true},
    extra:(n) => [0, 0, 0, .5*n, 0],
    sketch:K => {
      const {c, R, clothes, stack, base, crown} = K;
      const y0 = K.s.crown ? 9 : 5, baseY = K.legs ? 64 : 63, x0 = 22, w = 76, n = 4, dw = w/n, h = baseY - y0;
      R(x0, y0, w, h, "#2c2622");
      for (let i = 0; i < n; i++) {
        const x = x0 + i*dw;
        clothes(x + 1, dw - 2, y0 + 3, 30); stack(x + 2, baseY - 14, dw - 4); stack(x + 2, baseY - 4, dw - 4);
        R(x, y0, dw, h, "rgba(150,110,72,.5)", `stroke="${c.metal}" stroke-width="1"`);
        R(x + dw*.12, y0 + 2, 1.2, h*.55, "rgba(255,255,255,.28)");
        R(x + (i % 2 ? 2 : dw - 3), y0 + h*.4, .9, 9, c.metal);
      }
      for (let i = 0; i <= n; i++) R(x0 + i*dw - .5, y0 + 1.5, 1, h - 3, "#ffe6b0", 'opacity=".95"');
      crown(x0, y0, w, c.main); base(x0, w, baseY);
    }},
  openEnd:{name:"С отворен край", text:"Затворени секции и открити рафтове с подсветка в края", set:{doors:"hinged"},
    extra:() => [.8, 0, 0, 0, 0],
    sketch:K => {
      const {c, R, door, crown, base, books, stack} = K;
      const y0 = K.s.crown ? 9 : 5, baseY = K.legs ? 64 : 63, x0 = 20, w = 80, cw = 56;
      for (let i = 0; i < 3; i++) door(x0 + i*cw/3, y0, cw/3, baseY - y0, c.main, "tall", i % 2 ? "L" : "R");
      R(x0 + cw, y0, w - cw, baseY - y0, c.accent);
      R(x0 + cw + 1.5, y0 + 1.5, w - cw - 3, baseY - y0 - 3, "#2c2622");
      for (let i = 0; i < 5; i++) {
        const y = y0 + 1.5 + i*(baseY - y0 - 3)/5;
        R(x0 + cw + 1.5, y, w - cw - 3, 1.4, c.accent); R(x0 + cw + 1.5, y + 1.4, w - cw - 3, 1, "#ffe6b0", 'opacity=".8"');
        if (i % 3 === 0) books(x0 + cw + 3, y, 10); else if (i % 3 === 1) stack(x0 + cw + 3, y, 11);
      }
      crown(x0, y0, w, c.main); base(x0, w, baseY);
    }},
  vanity:{name:"С тоалетка", text:"Шкафове от двете страни и ниша с плот, чекмеджета и огледало", set:{doors:"hinged"},
    extra:() => [1.2, .4, .3, 0, 2],
    sketch:K => {
      const {c, R, O, door, crown, base} = K;
      const y0 = K.s.crown ? 9 : 5, baseY = K.legs ? 64 : 63, x0 = 14, w = 92, side = 32, nx = x0 + side, nw = w - 2*side;
      for (let i = 0; i < 2; i++) { door(x0 + i*side/2, y0, side/2, baseY - y0, c.main, "tall", i ? "L" : "R"); door(nx + nw + i*side/2, y0, side/2, baseY - y0, c.main, "tall", i ? "L" : "R"); }
      R(nx, y0, nw, baseY - y0, "#e8e2d8");
      door(nx, y0, nw/2, 14, c.main, "upper", "R"); door(nx + nw/2, y0, nw/2, 14, c.main, "upper", "L");
      R(nx + 3, y0 + 18, nw - 6, 19, "#dfe5e8", 'stroke="#ffe6b0" stroke-width="1.2"');
      R(nx, 49.5, nw, 2, c.accent); door(nx, 51.5, nw/2, 7, c.main, "drawer"); door(nx + nw/2, 51.5, nw/2, 7, c.main, "drawer");
      O(nx + nw/2, 66, 6, 2.4, "#cbbfad");
      crown(x0, y0, w, c.main); base(x0, side, baseY); base(nx + nw, side, baseY);
    }},
};
