import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

export default class SNJS_Alert {
	constructor(options) {
		this.allow_nested = true;

		this.name = "SNJS_Alert";
		this.delete_delay = 1000;
		this.dom_override = undefined;
		this.pseudo_override = undefined;
		this.id = SNJS_Object.Generate_ID();

		this.options = JSON.parse(options);
		this.title = this.options["Title"];
		this.description = this.options["Description"];

		this.html_buttons = "";
		if ("Buttons" in this.options) {
			let button;
			for (Index = 0; Index < this.options["Buttons"].length; Index++) {
				button = this.options["Buttons"][Index];
				this.html_buttons += `
<a class="SNDL-Button ${('Color' in button) ? button['Color'] : ""}" href="${('HREF' in button) ? button['HREF'] : '#'}" onclick="${button['Click']}">
	<h4>${button["Name"]}</h4>
</a>
`;
			};
		};

		this.html = `
<div>
	<div class="Alert_Header">
		<h1>!</h1>
	</div>
	<spacer></spacer>
	<div class="Alert_Content">
		<h3>${this.title}</h3>
		<p>${this.description}</p>
	</div>
	<div class="Alert_Options">
		${this.html_buttons}
	</div>
</div>

`;
		this.element = SNJS_Object.Element(this.name, this.id, this.html);
	}
	async Start(Reference) {
		Log(`Started Object "${this.name}" (ID: ${this.id}).`);
		this.reference = Reference;
	}
	Delete() {
		Log(`Deleting Object "${this.name}" (ID: ${this.id})...`)
	}
};

window.SNJS_Alert = SNJS_Alert;