import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

import * as G from "../Globals.mjs";
export default class SNJS_Navigation {
	constructor(Project = "TSN") {
		this.allow_nested = false;

		this.name = "SNJS_Navigation";
		this.delete_delay = 1000;
		this.dom_override = G.Root;
		this.pseudo_override = undefined;
		this.id = SNJS_Object.Generate_ID();

		this.Project = Project;

		this.Banner_URL = `/Root/Banner/${this.Project}.png`;
		this.Logo_URL = `/Root/Logo/${this.Project}.png`;
		
		switch (Project) {
			case "Misono":
				this.html = `
<div>
	<a href="/home"><img src="${this.Banner_URL}"></a>
	<div>
		<a class="SNDL-Button SNC-Invert" href="/login"><p>🏗️ Configurator</p></a>
		<a class="SNDL-Button SNC-Invert" href="https://sirio-network.com/discord" target="_blank"><p title="TSN Discord">💬 TSN Discord</p></a>
		<div></div>
		<a class="SNDL-Button SNC-Invert" href="#" onclick="SNJS.Append(new SNJS_Settings());"><p title="Settings">⚙️</p></a>
	</div>
</div>
<div>
	<a href="/home"><img src="${this.Logo_URL}"></a>
	<div>
		<a class="SNDL-Button SNC-Invert" href="/login"><p title="Configurator">🏗️</p></a>
		<a class="SNDL-Button SNC-Invert" href="https://sirio-network.com/discord" target="_blank"><p title="TSN Discord">💬</p></a>
		<div></div>
		<a class="SNDL-Button SNC-Invert" href="#" onclick="SNJS.Append(new SNJS_Settings());"><p title="Settings">⚙️</p></a>
	</div>
</div>`; break;
			default:
				this.html = `
<div>
	<a href="/home"><img src="${this.Banner_URL}"></a>
	<div>
		<a class="SNDL-Button SNC-Invert" href="/youtube"><p>🎥 YouTube</p></a>
		<a class="SNDL-Button SNC-Invert" href="/projects"><p>🗺️ Projects</p></a>
		<a class="SNDL-Button SNC-Invert" href="/articles"><p>📰 Articles</p></a>
		<a class="SNDL-Button SNC-Invert" href="#" onclick="SNJS.Append(new SNJS_Nested('/contact'));"><p>📧 Contact</p></a>
		<div></div>
		<a class="SNDL-Button SNC-Invert" href="#" onclick="SNJS.Append(new SNJS_Nested('/Seminar'));"><p title="Account">💾</p></a>
		<a class="SNDL-Button SNC-Invert" href="#" onclick="SNJS.Append(new SNJS_Settings());"><p title="Settings">⚙️</p></a>
	</div>
</div>
<div>
	<a href="/home"><img src="${this.Logo_URL}"></a>
	<div>
		<a class="SNDL-Button SNC-Invert" href="/youtube"><p title="YouTube">🎥</p></a>
		<a class="SNDL-Button SNC-Invert" href="/projects"><p title="Projects">🗺️</p></a>
		<a class="SNDL-Button SNC-Invert" href="/articles"><p title="Articles">📰</p></a>
		<a class="SNDL-Button SNC-Invert" href="/contact"><p title="Contact">📧</p></a>
		<div></div>
		<a class="SNDL-Button SNC-Invert" href="/Seminar"><p title="Account">💾</p></a>
		<a class="SNDL-Button SNC-Invert" href="#" onclick="SNJS.Append(new SNJS_Settings());"><p title="Settings">⚙️</p></a>
	</div>
</div>`; break;
			}

		this.element = SNJS_Object.Element(this.name, this.id, this.html, "nav");
	};

	async Start(Reference) {
		Log(`Started Object "${this.name}" (ID: ${this.id}).`);
		this.reference = Reference;
	};
	async Delete() { Log(`Deleting Object "${this.name}" (ID: ${this.id})...`) };
};

window.SNJS_Navigation = SNJS_Navigation;