import Log from "./Log.mjs";
import * as SNJS_Object from "../libObject.mjs";

import * as G from "../Globals.mjs";

export function Get() { return document.documentElement.getAttribute("SNDL-Theme"); };
export function Get_HC() {
	let Contrast = document.documentElement.getAttribute("HighContrast");
	return (Contrast) ? ((Contrast == "true") ? true : false) : false;
};

export async function Switch() {
	let Theme = Get(), Theme_New;
	Theme_New = (Theme == "Light") ? "Dark" : "Light";

	Log(`Switching Theme to ${Theme_New}...`);
	document.documentElement.setAttribute("SNDL-Theme", Theme_New);
	if (G.Generic["Default_BG"]) {
		await SNJS_Object.Delete("SNJS_Background");

		// ↓ Verify if we are using a wallpaper set
		for (let Object_Index = 0; Object_Index < Awaited_Objects.length; Object_Index++) {
			if (Awaited_Objects[Object_Index].length == 2){
				if (Awaited_Objects[Object_Index][0] == "SNJS_Background") {
					SNJS_Object.Append(new SNJS_Background(Awaited_Objects[Object_Index][1]));
					return;
				};
			};
		};

		// Otherwise just get the default backgrounds
		SNJS_Object.Append(new SNJS_Background());
	};
};

export async function Switch_HC() {
	let Contrast = Get_HC();
	if (Contrast) {
		Log(`Enabling High Contrast Mode...`);
		document.documentElement.setAttribute("HighContrast", "false");
	} else {
		Log(`Disabling High Contrast Mode...`);
		document.documentElement.setAttribute("HighContrast", "true");
	}
};

window.SNJS.ThemeSwitch = Switch;