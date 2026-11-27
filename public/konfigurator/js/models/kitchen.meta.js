// Модели (разпределения) на кухнята. set се прилага върху състоянието; стилът не ги променя.
import {kitchenSketch} from "../sketchkit.js";
export const MODELS = {
  island:{name:"Права с остров", text:"Шкафове по една стена и остров с места за сядане",
    set:{shape:"I+island", islandFunc:"prep", island:{len:240, depth:100, seats:3}}, sketch:K => kitchenSketch(K, {island:true})},
  L:{name:"Г-образна", text:"Две стени, много работен плот, без остров",
    set:{shape:"L"}, sketch:K => kitchenSketch(K, {L:true})},
  Lisland:{name:"Г-образна с остров", text:"Две стени и остров с мивка",
    set:{shape:"L+island", islandFunc:"sink", island:{len:220, depth:100, seats:3}}, sketch:K => kitchenSketch(K, {L:true, island:true})},
  U:{name:"П-образна", text:"Три стени и много място за съхранение",
    set:{shape:"U"}, sketch:K => kitchenSketch(K, {U:true})},
  cook:{name:"Остров с готвене", text:"Плотът за готвене е на острова, аспиратор от тавана",
    set:{shape:"I+island", islandFunc:"hob", hood:"ceiling", island:{len:260, depth:110, seats:2}}, sketch:K => kitchenSketch(K, {island:true, hob:true})},
  open:{name:"Без горни шкафове", text:"Високи колони, рафт и остров: открита и лека",
    set:{shape:"I+island", islandFunc:"prep", uppers:"none", pantry:true, island:{len:240, depth:100, seats:3}}, sketch:K => kitchenSketch(K, {island:true, noUpper:true})},
};
// Ключове, които моделът определя (стилът не ги презаписва).
export const LAYOUT_KEYS = ["shape", "islandFunc", "island", "hood", "uppers", "pantry"];
