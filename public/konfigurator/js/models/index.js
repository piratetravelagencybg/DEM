// Регистър на моделите (без 3D код): имена, настройки, скици и добавки към цената.
import {MODELS as kitchen} from "./kitchen.meta.js";
import {MODELS as wardrobe} from "./wardrobe.meta.js";
import {MODELS as walkin} from "./walkin.meta.js";
import {MODELS as bedroom} from "./bedroom.meta.js";
import {MODELS as tv} from "./tv.meta.js";
import {MODELS as entry} from "./entry.meta.js";
import {MODELS as office} from "./office.meta.js";
export const MODELS = {kitchen, wardrobe, walkin, bedroom, tv, entry, office};
export const firstModel = type => Object.keys(MODELS[type])[0];
