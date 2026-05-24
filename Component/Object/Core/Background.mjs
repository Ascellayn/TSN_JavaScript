import { Config, Deco, Log, Misc, Safe, TSNDL, Strings, Time } from "../../../TSNA/__init__.mjs";
import { BASE_OBJECT } from "../__init__.mjs";
import TSNJS from "../../../TSNJS/__init__.mjs";
import Common from "../../../Common/__init__.mjs";



export default class TSNJS_Background extends BASE_OBJECT {
	constructor(Image = null) {
		super();
		this.Name = "TSNJS_Background"; // HTML Name, added as a CSS Class
		this.Override_DOM = Common.BACKGROUND;



		if (Image == null) {
			if (TSNJS.Theme.Get.Theme() == "Light") { this.Image = "/Root/backgrounds/static/starlight_aftermath/Default.jpg"; }
			else { this.Image = "/Root/backgrounds/static/blacklight.png"; };
		} else {
			switch (Image) {
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
					if (TSNJS.Theme.Get.Theme() == "Light") { this.Image = `/Root/backgrounds/static/starlight_aftermath/SNC_${Image}.jpg`; }
					else { this.Image = "/Root/backgrounds/static/email_dark.jpg"; };
					break;

				default: this.Image = Image; Common.useDefaultBG = false; break;
			}
		};

		this.HTML = `<img src="${this.Image}">`;
	};



	async Start(Reference) {
		Log.Info(`${this.Name} (ID: ${this.ID}): Started "${this.Image}".`);
		this.Reference = Reference;

		// Parallax
		let X_Center, Y_Center, X, Y = 0;
		let Parallax_Pacifier = 8;
		var IMG = this.Reference.lastChild;
		
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
};



window.TSNJS.Component.Object.Background = TSNJS_Background;