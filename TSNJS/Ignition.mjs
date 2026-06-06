import { Config, Deco, Log, Misc, Safe, TSNDL, Strings, Time } from "../TSNA/__init__.mjs";
import TSNJS from "../TSNJS/__init__.mjs";
import Common from "../Common/__init__.mjs";
import Component from "../Component/__init__.mjs";
import CompObj from "../Component/Object.mjs";
Component.Object = CompObj;



async function Update_Loadrix(Step, Steps) { // TODO: Move to Misc as a different generalized function
	const BAR = document.querySelector(`.TSNJS_Loadrix > .TSNJS_Bar`);
	BAR.style.width = `${(Step / Steps) * 100}%`;
};



async function Ignition() {
	Log.Stateless("The Sirio Network JavaScript (TSNJS) © (2024-2026) - The Sirio Network | `TSN License 2.2 - Strict`");
	Log.Info("TSNJS.Ignition(): Starting...");

	// Ignition Steps
	let Steps = TSNJS_Components.length; // Add Page Components
	Steps += document.getElementsByTagName("img").length; // Image Loading
	Steps += 4; // Load Base Components & Other, Keybinds, Components.Refresh, User Preferences

	let Step = 1;



	// User Preferences
	const forceTheme = localStorage.getItem("TSNWE/forceTheme");
	const Contrasted = localStorage.getItem("TSNWE/Contrasted");
	if (forceTheme) {
		if (forceTheme != TSNJS.Theme.Get.Theme()) {
			TSNJS.Theme.Switch.Theme()
		};
	}
	if (Contrasted) {
		if (Boolean(Contrasted) != TSNJS.Theme.Get.Constrasted()) {
			TSNJS.Theme.Switch.Contrasted()
		};
	}
	Steps++;



	// Loadrix: Hide any Component Changes
	await Component.Create(new Component.Object.Loadrix(), Common.BODY);
	try {
		await Component.Create(new Component.Object.Copyright((typeof TSNJS_Copyright !== "undefined") ? TSNJS_Copyright : ""));

		// Nested Flag
		document.documentElement.setAttribute("Nested", Common.isNested);
		Step++; await Update_Loadrix(Step, Steps);



		// Load Awaited Objects
		for (const Compo of TSNJS_Components) {
			let CompoName, CompoArgs;

			if (Array.isArray(Compo)) {
				CompoName = Compo[0];
				CompoArgs = Compo.slice(1);
			} else {
				CompoName = Compo,
				CompoArgs = []
			};
			Log.Info(`TSNJS.Ignition(): Awaited Component "${CompoName}" with Arguments "${CompoArgs}".`);
			await Component.Create(new Component.Object[CompoName](...CompoArgs), TSNJS.BODY);
			Step++;
		};



		// Default Background
		if (Common.BACKGROUND.innerHTML == "") {
			await Component.Create(new Component.Object.Background());
		};
		Step++; Update_Loadrix(Step, Steps);



		// Theme Switching Keybind
		document.addEventListener("keyup", function(e) {
			if (e.ctrlKey && e.key == "t") {
				TSNJS.Theme.Switch.Theme();
			};
			if (e.ctrlKey && e.key == "h") {
				TSNJS.Theme.Switch.Contrasted();
			}
		});
		Step++; Update_Loadrix(Step, Steps);

		await Component.Refresh();
		Step++; Update_Loadrix(Step, Steps);

		await Images(Step, Steps);
		await Component.Delete("TSNJS_Loadrix");
	} catch(E0) {
		// Failsafe if Ignition fails
		try {
			await Component.Delete("TSNJS_Loadrix");
		} catch {
			// Ok shit has truly hit the fan now
			var Loadrix = document.getElementsByClassName("TSNJS_Loadrix");
			Loadrix.forEach(element => {
				element.remove();
			});
		};
		try {
			await Component.Create(new Component.Object.Notification("Red", `<b>TSNJS: IGNITION FAILURE</b>\nReport this as soon as possible to Ascellayn, something has gone HORRIBLY wrong!\nSome elements on this page might have not loaded properly.\n\n<code>ERROR: ${E0}</code>`, 30000));
		} catch(E1) {
			// Now it really is.
			document.documentElement.innerHTML = `<div class="Banner Red" style="z-index: 6948; display: block;"><h1>TSNJS: SEVERE IGNITION FAILURE</h1><p>Report this as soon as possible to Ascellayn, something has gone SO HORRIBLY BAD that TSNJS' component system failed entirely!\nMany elements on this page might be broken or have not loaded!\n\n<code>ERROR (Ignition): ${E0}</code>\n<code>ERROR (TSNJS.Components): ${E1}</code></p></div>${document.documentElement.innerHTML}`
		};
	};
};



async function Images(Step, Steps) {
	let allLoaded;
	let Images = [];
	Log.Debug(`Waiting for images to all load...`);
	while (true) {
		// We never know if new images are going to be loaded so we do this
		allLoaded = true;
		Images = document.getElementsByTagName("img");
		let Loaded = new Set();
		for (let cycle = 0; cycle < Images.length; cycle++) {
			if (Images[cycle].complete == false) {
				allLoaded = false;
			} else {
				Loaded.add(Images[cycle].src);
				Update_Loadrix(Step + Loaded.size, Steps);
			};
		};
		if (allLoaded == true) { break; };
		await Time.Sleep(100); // Prevent everyone's shit from... Shitting
	};
	Log.Awaited().OK();
};



document.addEventListener("DOMContentLoaded", await Ignition());
export default {};