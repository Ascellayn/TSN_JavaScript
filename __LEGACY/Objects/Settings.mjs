import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

import * as G from "../Globals.mjs";
export default class SNJS_Settings {
	constructor(URL) {
		this.allow_nested = true;

		this.name = "SNJS_Settings";
		this.delete_delay = 500;
		this.dom_override = G.Floating;
		this.pseudo_override = undefined;
		this.id = SNJS_Object.Generate_ID();

		this.url = URL;

		this.html = `
<a class="Floating_Full" onclick="SNJS.Delete(${this.id})"></a>
<div>
	<header class="SNDL-Flex_Between">
		<h1>Settings</h1>
		<a class="SNDL-Button_Circle" href="#" onclick="SNJS.Delete(${this.id})"><p>X</p></a>
	</header>
	<spacer></spacer>
	<div>
		<div>
			<h2>Whoops. It looks like this function is unfinished.</h2>
			<p>The Sirio Network Website Settings aren't available yet. It will come much, much later, after that the many dependencies for this feature are finally done..</p>
			<p>Anyways... While you wait, here's Akira boping around.</p>
			<p>She'll be there until this isn't finished.</p>
		</div>
		<a href="https://www.pixiv.net/en/artworks/108979706" target="_blank"><img src="/Root/108979706_p0-transparent.gif" style="max-width: 100%;"></a>
	</div>
	<spacer></spacer>
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

window.SNJS_Settings = SNJS_Settings;