import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

import * as G from "../Globals.mjs";
import * as Theme from "../Common/Theme.mjs";
export default class SNJS_Background {
	constructor(image = null) {
		this.allow_nested = true;

		this.name = "SNJS_Background";
		this.delete_delay = 1000;
		this.dom_override = G.Background;
		this.pseudo_override = undefined;
		this.id = SNJS_Object.Generate_ID();

		if (image == null) {
			if (Theme.Get() == "Light") { this.image = "/Root/backgrounds/static/starlight_aftermath/Default.jpg"; }
			else { this.image = "/Root/backgrounds/static/blacklight.png"; };
		} else {
			switch (image) {
				case "Black":
				case "Grey":
				case "White":
				case "Red":
				case "Orange":
				case "Yellow":
				case "Green":
				case "Cyan":
				case "Blue":
				case "Purple":
				case "Pink":
					if (Theme.Get() == "Light") { this.image = `/Root/backgrounds/static/starlight_aftermath/SNC_${image}.jpg`; }
					else { this.image = "/Root/backgrounds/static/email_dark.jpg"; };
					break;

				default: this.image = image; G.Generic_Modify("Default_BG", false); break;
			}
		};

		this.html = `<img src="${this.image}">`;
		this.element = SNJS_Object.Element(this.name, this.id, this.html);
	};
	async Start(Reference) {
		Log(`Started Object "${this.name}" (ID: ${this.id}).`);
		this.reference = Reference;

		// Parallax
		let X_Center, Y_Center, X, Y = 0;
		let Parallax_Pacifier = 8;
		var IMG = this.reference.lastChild;
		
		onmousemove = function(e){
			X_Center = window.screen.availWidth / 2;
			Y_Center = window.screen.availHeight / 2;
			X = e.clientX - X_Center; Y = e.clientY - Y_Center;
			
			let Aspect_C = window.screen.availWidth / window.screen.availHeight;
			let Aspect_I = IMG.naturalWidth / IMG.naturalHeight;
			let Diff = (window.screen.availHeight * 1.10) / IMG.naturalHeight;
			
			let Scaled_X = IMG.naturalWidth * Diff;
			let Scaled_Y = IMG.naturalHeight * Diff;
			
			let Pacified_X = window.screen.availWidth / Parallax_Pacifier;
			let Pacified_Y = window.screen.availHeight / Parallax_Pacifier;

			let Max_X = Math.min((Scaled_X - window.screen.availWidth) / 2, Pacified_X);
			let Max_Y = Math.min((Scaled_Y - window.screen.availHeight) / 2, Pacified_Y);
			
			let Trans_X = X / window.screen.availWidth * 2;
			let Trans_Y = Y / window.screen.availHeight * 2;

			/* Log(`X: ${X} (${Trans_X}) | Y: ${Y} (${Trans_Y}) - [${window.screen.availWidth}x${window.screen.availHeight}](${Aspect_C})
Scaled: ${Scaled_X}x${Scaled_Y} - Max: ${Max_X}x${Max_Y}
Translated: ${Trans_X * Max_X}px ${Trans_Y * Max_Y}px
${IMG.src} // [${IMG.naturalWidth}x${IMG.naturalHeight}](${Aspect_I})`);*/
			Reference.style = `translate: ${Trans_X * Max_X}px ${Trans_Y * Max_Y}px;`;
		};
	};
	async Delete() { Log(`Deleting Object "${this.name}" (ID: ${this.id})...`); };
};

window.SNJS_Background = SNJS_Background;