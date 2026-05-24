import { BASE_OBJECT } from "../__init__.mjs";



export default class TSNJS_Alert extends BASE_OBJECT {
	constructor(Options) {
		super();
		this.Name = "TSNJS_Alert";

		this.Options = JSON.parse(Options);
		this.Title = this.Options["Title"];
		this.Description = this.Options["Description"];

		this.HTML_Buttons = "";
		if ("Buttons" in this.Options) {
			let button;
			for (Index = 0; Index < this.Options["Buttons"].length; Index++) {
				button = this.Options["Buttons"][Index];
				this.HTML_Buttons += `
<a class="Button ${('Color' in button) ? button['Color'] : ""}" href="${('HREF' in button) ? button['HREF'] : '#'}" onclick="${button['Click']}">
	<h4>${button["Name"]}</h4>
</a>
`;
			};
		};

		this.HTML = `
<div>
	<div class="Alert_Header">
		<h1>!</h1>
	</div>
	<spacer></spacer>
	<div class="Alert_Content">
		<h3>${this.Title}</h3>
		<p>${this.Description}</p>
	</div>
	<div class="Alert_Options">
		${this.HTML_Buttons}
	</div>
</div>

`;
	};
};



window.TSNJS.Component.Object.Alert = TSNJS_Alert;