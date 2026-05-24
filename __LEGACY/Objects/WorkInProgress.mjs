import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

import * as G from "../Globals.mjs";
export default class SNJS_WorkInProgress {
	constructor() {
		this.allow_nested = true;

		this.name = "SNJS_WorkInProgress";
		this.delete_delay = 500;
		this.dom_override = G.Floating;
		this.pseudo_override = undefined;
		this.id = SNJS_Object.Generate_ID();

		this.html = `
<a class="Floating_Full" onclick="SNJS.Delete(${this.id})"></a>
<div class="SNDL-Dynamic_Popup SNDL-Contain_Themed-Inverted">
	<div class="Text_Invert">
		<h1>Whoops. It looks like this page is unfinished.</h1>
		<p>The content of this page is not final, stuff may change or disappear the next day. You can still navigate around the page by closing this popup.</p>
		<p>Otherwise, well... That wasn't part of the plan. While you wait, here's Akira boping around.</p>
		<p>She'll be there until this page is finally finished.</p>
		<br>
		<p class="Quiet">click her if you want to to go the source of whoever made this excellent gif :D</p>
	</div>
	<div><a href="https://www.pixiv.net/en/artworks/108979706" target="_blank"><img src="/Root/108979706_p0-transparent.gif"></a></div>
</div>
`;

		this.element = SNJS_Object.Element(this.name, this.id, this.html);
	};
	async Start(Reference) {
		Log(`Started Object "${this.name}" (ID: ${this.id}).`);
		this.reference = Reference;
	};
	async Delete() { Log(`Deleting Object "${this.name}" (ID: ${this.id})...`) };
};

window.SNJS_WorkInProgress = SNJS_WorkInProgress;
