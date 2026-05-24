import { BASE_OBJECT } from "../__init__.mjs";



export default class TSNJS_Codeblock extends BASE_OBJECT {
	constructor(Text, AllowCopy = true) {
		super();
		this.Name = "TSNJS_Codeblock";
		this.Delete_Delay = 0;





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
		
		this.HTML = "";
		if (AllowCopy == true) {
			this.HTML += `<a href="#" class="Button_Circle" title="Copy to Clipboard" onclick="TSNJS.Clipboard.ID('${this.id}')"><p>📋</p></a>`;
		}
		this.HTML += `
<div class="Text_Marginless${ExtraLeading}" subid="${this.id}">
${Code}
</div>`;
	};
};



window.TSNJS.Component.Object.Codeblock = TSNJS_Codeblock;