import { BASE_OBJECT } from "../__init__.mjs";
import Common from "../../../Common/__init__.mjs";



export default class TSNJS_Navigation extends BASE_OBJECT {
	constructor(Project = "TSN") {
		super();
		this.Name = "TSNJS_Navigation";
		this.allowNested = false;
		this.Override_DOM = Common.ROOT;

		this.Project = Project;
		this.URL_Banner = `/Root/Banner/${this.Project}.png`;
		this.URL_Logo = `/Root/Logo/${this.Project}.png`;
		
		switch (Project) {
			case "Misono":
				this.HTML = `
<div>
	<a href="/home"><img src="${this.URL_Banner}"></a>
	<div>
		<a class="Button Invert" href="/login"><p>🏗️ Configurator</p></a>
		<a class="Button Invert" href="https://sirio-network.com/discord" target="_blank"><p title="TSN Discord">💬 TSN Discord</p></a>
		<div></div>
		<a class="Button Invert" href="#" onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Settings());"><p title="Settings">⚙️</p></a>
	</div>
</div>
<div>
	<a href="/home"><img src="${this.URL_Logo}"></a>
	<div>
		<a class="Button Invert" href="/login"><p title="Configurator">🏗️</p></a>
		<a class="Button Invert" href="https://sirio-network.com/discord" target="_blank"><p title="TSN Discord">💬</p></a>
		<div></div>
		<a class="Button Invert" href="#" onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Settings());"><p title="Settings">⚙️</p></a>
	</div>
</div>`; break;
			default:
				this.HTML = `
<div>
	<a href="/home"><img src="${this.URL_Banner}"></a>
	<div>
		<a class="Button Invert" href="/youtube"><p>🎥 YouTube</p></a>
		<a class="Button Invert" href="/projects"><p>🗺️ Projects</p></a>
		<a class="Button Invert" href="/articles"><p>📰 Articles</p></a>
		<a class="Button Invert" href="#" onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Nested('/contact'));"><p>📧 Contact</p></a>
		<div></div>
		<a class="Button Invert" href="#" onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Nested('/Seminar'));"><p title="Account">💾</p></a>
		<a class="Button Invert" href="#" onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Settings());"><p title="Settings">⚙️</p></a>
	</div>
</div>
<div>
	<a href="/home"><img src="${this.URL_Logo}"></a>
	<div>
		<a class="Button Invert" href="/youtube"><p title="YouTube">🎥</p></a>
		<a class="Button Invert" href="/projects"><p title="Projects">🗺️</p></a>
		<a class="Button Invert" href="/articles"><p title="Articles">📰</p></a>
		<a class="Button Invert" href="/contact"><p title="Contact">📧</p></a>
		<div></div>
		<a class="Button Invert" href="/Seminar"><p title="Account">💾</p></a>
		<a class="Button Invert" href="#" onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Settings());"><p title="Settings">⚙️</p></a>
	</div>
</div>`; break;
			}
	};
};

window.TSNJS.Component.Object.Navigation = TSNJS_Navigation;