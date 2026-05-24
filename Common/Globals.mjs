import { Config, Deco, Log, Misc, Safe, TSNDL, Strings, Time } from "../TSNA/__init__.mjs";

// Other
export const isNested = window.self !== window.top;
export let useDefaultBG = true;
export let Notifications = [];



// DOM
export var BODY, BACKGROUND, ROOT, BASE, FLOATING;

Log.Debug("Common.Globals: Loading Core Variables...");
BODY = document.body;
BACKGROUND = document.getElementById("Background");
ROOT = document.getElementById("Root");
BASE = document.getElementById("Base");
FLOATING = document.getElementById("Floating");

window.TSNJS = new Object();
window.TSNJS.BODY = BODY;
window.TSNJS.BACKGROUND = BACKGROUND;
window.TSNJS.ROOT = ROOT;
window.TSNJS.BASE = BASE;
window.TSNJS.FLOATING = FLOATING;
Log.Awaited().OK();






export default {
	BODY, BACKGROUND, ROOT, BASE, FLOATING,
	isNested, useDefaultBG, Notifications
};