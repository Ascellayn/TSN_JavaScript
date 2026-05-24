import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

import * as G from "../Globals.mjs";
export default class SNJS_Copyright {
	constructor() {
		this.allow_nested = true;

		this.name = "SNJS_Copyright";
		this.delete_delay = 1000;
		this.dom_override = G.Root;
		this.pseudo_override = "After";
		this.id = SNJS_Object.Generate_ID();

		this.html = `<a href="/contact"><p>The Sirio Network © 2022-2026 | All rights reserved.</p></a>`;

		this.element = SNJS_Object.Element(this.name, this.id, this.html);
	};
	async Start(Reference) {
		Log(`Started Object "${this.name}" (ID: ${this.id}).`);
		this.reference = Reference;
	};
	async Delete() { Log(`Deleting Object "${this.name}" (ID: ${this.id})...`) };
};

window.SNJS_Copyright = SNJS_Copyright;
