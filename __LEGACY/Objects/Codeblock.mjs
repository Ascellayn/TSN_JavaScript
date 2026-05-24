import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

export default class SNJS_Codeblock {
	constructor(Text, AllowCopy = true) {
		this.allow_nested = true;

		this.name = "SNJS_Codeblock";
		this.delete_delay = 0;
		this.dom_override = undefined;
		this.pseudo_override = undefined;
		this.id = SNJS_Object.Generate_ID();

		this.Text = "";

		let Lines = Text.split("\n");
		if (Lines[0] == "") { Lines.shift(); };
		if (Lines[Lines.length - 1] == "") { Lines.pop(); };

		let Code = ``;
		for (let Index = 0; Index < Lines.length; Index++) {
			if (Lines[Index] != "<br>") {
				Code += `<p>${Lines[Index]}</p>\n`;
			} else {
				Code += `<p></p>`;
			};
			this.Text += Lines[Index] + "\n";
		};
		
		let ExtraLeading;
		if (Lines.length > 99) { ExtraLeading = ` ExtraLeading`}
		else { ExtraLeading = "" }
		
		this.html = "";
		if (AllowCopy == true) {
			this.html += `<a href="#" class="SNDL-Button_Circle" title="Copy to Clipboard" onclick="SNJS.Clipboard_ID('${this.id}')"><p>📋</p></a>`;
		}
		this.html += `
<div class="Text_Marginless${ExtraLeading}" subid="${this.id}">
${Code}
</div>`;

		this.element = SNJS_Object.Element(this.name, this.id, this.html);
	};
	async Start(Reference) {
		Log(`Started Object "${this.name}" (ID: ${this.id}).`);
		this.reference = Reference;
	};
	async Delete() { Log(`Deleting Object "${this.name}" (ID: ${this.id})...`) };
};

window.SNJS_Codeblock = SNJS_Codeblock;