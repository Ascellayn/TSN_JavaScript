import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

import * as Theme from "../Common/Theme.mjs";
export default class SNJS_PageLoader {
	constructor() {
		this.allow_nested = true;

		this.name = "SNJS_PageLoader";
		this.delete_delay = 1000;
		this.dom_override = undefined;
		this.pseudo_override = undefined;
		this.id = 0;

		if (Theme.Get() == "Light") { this.GIF = "/Root/Icon/Cublodes/Light.webp"; }
		else { this.GIF = "/Root/Icon/Cublodes/Dark.webp"; };
		this.html = `<img class="Floating_Full" src="${this.GIF}"><div class="SNJS_ProgressBar"></div>`;

		this.element = SNJS_Object.Element(this.name, this.id, this.html);
	};

	async Start(Reference) {
		Log(`Started Object "${this.name}" (ID: ${this.id}).`);
		this.reference = Reference;
	};
	async Delete() { Log(`Deleting Object "${this.name}" (ID: ${this.id})...`) };
};

window.SNJS_PageLoader = SNJS_PageLoader;