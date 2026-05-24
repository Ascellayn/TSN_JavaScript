import { Config, Deco, Log, Misc, Safe, TSNDL, Strings, Time } from "../TSNA/__init__.mjs";
import Common from "../Common/__init__.mjs";
import Component from "../Component/__init__.mjs";
import * as CompObj from "../Component/Object.mjs"
Component.Object = CompObj;


class Get {
	static Constrasted() {
		const Contrasted = document.documentElement.getAttribute("Contrasted");
		return (Contrasted) ? ((Contrasted == "true") ? true : false) : false;
	};



	static Theme() {
		return document.documentElement.getAttribute("Theme");
	};
};



class Switch {
	static async Theme(Force = null) {
		if (localStorage.getItem("TSNWE/forceTheme") != undefined) { Force = localStorage.getItem("TSNWE/forceTheme"); };
		if (Force) {
			Log.Info(`TSNJS.Theme.Switch.Theme(): Forcing switch to "${Force}".`);
			document.documentElement.setAttribute("Theme", Force);
			return;
		};
		const Theme = Get.Theme();
		const Theme_New = (Theme == "Light") ? "Dark" : "Light";

		Log.Info(`TSNJS.Theme.Switch: Transitioning to ${Theme_New} mode...`);
		document.documentElement.setAttribute("Theme", Theme_New);

		// Handle Background Switching
		if (!Common.useDefaultBG) { return; };
		await Component.Delete("TSNJS_Background");

		// ↓ Verify if we are using a wallpaper set
		for (const Compo of TSNJS_Components) {
			let CompoName, CompoArgs;
			if (Array.isArray(Compo)) {
				CompoName = Compo[0];
				CompoArgs = Compo.slice(1);
			};
			if (CompoName != "Background") { continue; };
			Log.Info(`TSNJS.Theme.Switch.Theme(): Wallpaper Set "${CompoName}" with Arguments "${CompoArgs}".`);
			await Component.Create(new Component.Object[CompoName](...CompoArgs), TSNJS.BODY);
			return;
		};


		
		// Otherwise just get the default backgrounds
		Log.Awaited().OK("Default");
		await Component.Create(new Component.Object.Background());
	};



	static async Contrasted(Force = null) {
		if (localStorage.getItem("TSNWE/Contrasted") != undefined) { Force = localStorage.getItem("TSNWE/Contrasted"); };
		if (Force) {
			Log.Info(`TSNJS.Theme.Switch.Contracted(): Forcing switch to "${Force}".`);
			document.documentElement.setAttribute("Contrasted", Force);
			return;
		};

		const Contrasted = Get.Constrasted();
		if (Contrasted) {
			Log.Info("TSNJS.Theme.Switch.Contracted(): Disabling High Contrast.");
			document.documentElement.setAttribute("Contrasted", "false");
			return;
		};
		Log.Info("TSNJS.Theme.Switch.Contracted(): Enabling High Contrast.");
		document.documentElement.setAttribute("Contrasted", "true");
	};
};










export default {
	Get, Switch
};
window.TSNJS.Theme = new Object();
window.TSNJS.Theme.Get = Get;
window.TSNJS.Theme.Switch = Switch;