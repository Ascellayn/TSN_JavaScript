import { BASE_OBJECT } from "../__init__.mjs";
import Common from "../../../Common/__init__.mjs";



export default class TSNJS_Nested extends BASE_OBJECT {
	constructor(URL) {
		super();
		this.Name = "TSNJS_Nested";
		this.Delete_Delay = 500;
		this.Override_DOM = Common.FLOATING;


		this.URL = URL;
	};



	async Init() {
		if (!Common.isNested) {
			this.HTML = `
	<a class="Floating_Full" onclick="TSNJS.Component.Delete(${this.ID})"></a>
	<iframe src="${this.URL}"></iframe>
	`;
		} else {
			let Args = {
				"Title": "You are already inside of a nested page.",
				"Description": "Lets not go further down this rabbit hole, instead lets probably jump to that page directly!",
				"Buttons": [
					{
						"Name": `Jump to ${this.URL}`,
						"Color": "Blue",
						"HREF": this.URL,
						"Click": `TSNJS.Component.Delete(${this.ID})"}`
					}
				]
			}
			let Func = `TSNJS_Alert`;
			this.HTML = `
	<a class="Floating_Full" onclick="TSNJS.Component.Delete(${this.ID})"></a>
	<SNJS-Object obj='${Func}' args='${JSON.stringify(Args)}'></SNDL-Object>
	`;
		};
	};
};



window.TSNJS.Component.Object.Nested = TSNJS_Nested;