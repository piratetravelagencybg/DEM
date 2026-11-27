// 3D мебели извън кухнята: гардероб, гардеробна, спалня, ТВ стена, антре и домашен офис.
// Всяка мебел има няколко модела (разпределения) в js/models/<вид>.js; общите части са в parts.js.
import * as THREE from "three";
import {frontMaterial, carcassMaterial, metalMaterial} from "./materials.js";
import {reseed} from "./parts.js";
import {build as wardrobe} from "./models/wardrobe.js";
import {build as walkin} from "./models/walkin.js";
import {build as bedroom} from "./models/bedroom.js";
import {build as tv} from "./models/tv.js";
import {build as entry} from "./models/entry.js";
import {build as office} from "./models/office.js";

const BUILD = {wardrobe, walkin, bedroom, tv, entry, office};

export const FURN_DEFAULTS = {
  wardrobe:{model:"hinged", width:240, doors:"hinged", ceiling:true, led:true},
  walkin:{model:"Lisland", shape:"L", A:300, B:220, island:true, led:true},
  bedroom:{model:"slats", width:380, bed:"160", head:"panel", stands:"floating", storage:false, led:true},
  tv:{model:"floating", width:320, panel:"slats", side:"shelves", led:true},
  entry:{model:"closetBench", width:240, closet:true, bench:true, mirror:true, led:false},
  office:{model:"shelves", width:220, upper:"open", tall:true, led:true},
};

export function buildFurniture(s) {
  reseed(7);
  const f = {...FURN_DEFAULTS[s.type], ...(s.furn?.[s.type] || {})};
  const k = {s, root:new THREE.Group(), lights:[], leds:[], glows:[], bulbs:[], openers:[], gola:false, legs:s.base === "legs"};
  k.mats = {
    main:frontMaterial(s.fMain || s.front, s.profile), accent:frontMaterial(s.fAccent || s.tallFront, s.profile),
    mainFlat:frontMaterial(s.fMain || s.front, "flat"), accentFlat:frontMaterial(s.fAccent || s.tallFront, "flat"),
    metal:metalMaterial(s.finish), carcass:carcassMaterial(),
  };
  const H = s.height/100;
  (BUILD[s.type] || BUILD.wardrobe)(k, f, H);
  k.roomState = {...s, shape:k.roomShape || "I", walls:{A:k.size.A*100, B:(k.roomB || 2.6)*100, C:260}};
  return k;
}
