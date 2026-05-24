/* Sirio Network Javascript (SNJS) © 2024-2025 The Sirio Network | All Rights Reserved */
import * as G from "./Globals.mjs";

import Log from "./Common/Log.mjs";
import * as Clipboard from "./Common/Clipboard.mjs";
import * as Time from "./Common/Time.mjs";
import * as Theme from "./Common/Theme.mjs";

import * as SNJS_Object from "./libObject.mjs";
import * as SNJS_Trinity from "./libTrinity.mjs";





async function PageLoader_Update(Step, Steps) {
	let Bar = document.querySelector(`.SNJS_PageLoader > .SNJS_ProgressBar`);
	Bar.style.width = `${(Step / Steps) * 100}vw`;
}

async function Ignition() {
	// Ignition 2.0: Don't wait for the whole page to be already loaded to show the PageLoader
	// This was introduced as TSN_Yae would wait for every single image to be loaded before PageLoader did anything!
	while (true) {
		Log("SNJS Ignition failed: Globals haven't been loaded yet! // Retrying...")
		if (G.Background == undefined) { await Time.Sleep(1); }
		else { break; };
	};

	// Gather how many steps for PageLoader
	let Steps = 2 + Awaited_Objects.length + document.getElementsByTagName("img").length + 1;
	let Step = 0;

	// Hide what we're doing in the background
	SNJS_Object.Append(new SNJS_Object.SNJS_PageLoader(), G.Body);
	SNJS_Object.Append(new SNJS_Object.SNJS_Copyright(), G.Body);
	Step++; PageLoader_Update(Step, Steps);


	// Nested Flag
	document.documentElement.setAttribute("Nested", G.Nested);

	// Load requested by HTML objects
	for (let Object_Index = 0; Object_Index < Awaited_Objects.length; Object_Index++) {
		if (Awaited_Objects[Object_Index].length != 2){
			eval(`SNJS_Object.Append(new ${Awaited_Objects[Object_Index]}(), G.Body)`); // Jank but works
		} else { // ↑ Legacy
			eval(`SNJS_Object.Append(new ${Awaited_Objects[Object_Index][0]}("${Awaited_Objects[Object_Index][1]}"), G.Body)`);
		}; // ↑ For newer pages which have the ability to pass arguments
		
		Step++; PageLoader_Update(Step, Steps);
	};



	// Not every page is going to have an explicit background
	if (G.Background.innerHTML == "") {
		SNJS_Object.Append(new SNJS_Object.SNJS_Background(), G.Background);
	};
	Step++; PageLoader_Update(Step, Steps);



	// Theme Switching Keybind
	document.addEventListener("keyup", function(e) {
		if (e.ctrlKey && e.key == "t") {
			Theme.Switch();
		};
		if (e.ctrlKey && e.key == "h") {
			Theme.Switch_HC();
		}
	});
	Step++; PageLoader_Update(Step, Steps);


	// Make SURE we found every SNJS Objects and Fix dashlists
	SNJS_Object.Dynamic();
	Step++; PageLoader_Update(Step, Steps);

	// Show Pageloader still while all images are still loading
	await Wait_Images(Step, Steps);

	// When everything is done, we delete the loading screen.
	Step = Steps; PageLoader_Update(Step, Steps);
	SNJS_Object.Delete("SNJS_PageLoader");
};





async function Wait_Images(Step, Steps) {
	let Images_Loaded = Boolean;
	let Images = [];
	Log(`Running in a loop until all images are loaded...`)
	while (true) {
		// We never know if new images are going to be loaded so we do this
		Images_Loaded = true;
		Images = document.getElementsByTagName("img");
		let Loaded = new Set();
		for (let cycle = 0; cycle < Images.length; cycle++) {
			if (Images[cycle].complete == false) {
				Images_Loaded = false;
			} else {
				Loaded.add(Images[cycle].src);
				PageLoader_Update(Step + Loaded.size, Steps);
			};
		};
		if (Images_Loaded == true) { break; };
		await Time.Sleep(100); // Prevent everyone's shit from... Shitting
	};
};




Log("== Welcome to SNJS's Ignition ==\nSirio Network Javascript (SNJS) © 2024-2026 The Sirio Network | All Rights Reserved");
await Ignition();