import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

import * as G from "../Globals.mjs";
export default class SNJS_Nested {
	constructor(URL) {
		this.allow_nested = true;

		this.name = "SNJS_Nested";
		this.delete_delay = 500;
		this.dom_override = G.Floating;
		this.pseudo_override = undefined;
		this.id = SNJS_Object.Generate_ID();

		this.url = URL;

		if (!G.Nested) {
			this.html = `
<a class="Floating_Full" onclick="SNJS.Delete(${this.id})"></a>
<iframe src="${this.url}"></iframe>
`;
		} else {
			let Args = {
				"Title": "You are already inside of a nested page.",
				"Description": "Lets not go further down this rabbit hole, instead lets probably jump to that page directly!",
				"Buttons": [
					{
						"Name": `Jump to ${this.url}`,
						"Color": "SNC-Blue",
						"HREF": this.url,
						"Click": `SNJS.Delete(${this.id})"}`
					}
				]
			}
			let Func = `SNJS_Alert`;
			this.html = `
<a class="Floating_Full" onclick="SNJS.Delete(${this.id})"></a>
<SNJS-Object obj='${Func}' args='${JSON.stringify(Args)}'></SNDL-Object>
`;
		};
		this.element = SNJS_Object.Element(this.name, this.id, this.html);
	};
	async Start(Reference) {
		Log(`Started Object "${this.name}" (ID: ${this.id}).`);
		this.reference = Reference;
	};
	async Delete() { Log(`Deleting Object "${this.name}" (ID: ${this.id})...`) };
};

window.SNJS_Nested = SNJS_Nested;