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
		<button class="Invert"><a href="/login"><h3>🏗️ Configurator</h3></a></button>
		<button class="Invert"><a href="https://sirio-network.com/discord" target="_blank"><p title="TSN Discord">💬 TSN Discord</h3></a></button>
		<div></div>
		<button class="Circle Invert" onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Settings());"><p title="Settings">⚙️</h3></button>
	</div>
</div>
<div>
	<a href="/home"><img src="${this.URL_Logo}"></a>
	<div>
		<button class="Invert"><a href="/login"><p title="Configurator">🏗️</h3></a></button>
		<button class="Invert"><a href="https://sirio-network.com/discord" target="_blank"><p title="TSN Discord">💬</h3></a></button>
		<div></div>
		<button class="Circle Invert" onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Settings());"><p title="Settings">⚙️</h3></button>
	</div>
</div>`; break;
			default:
				this.HTML = `
<div>
	<a href="/home"><img src="${this.URL_Banner}"></a>
	<div>
		<button class="Invert"><a href="/youtube"><h3>🎥 YouTube</h3></a></button>
		<button class="Invert"><a href="/projects"><h3>🗺️ Projects</h3></a></button>
		<button class="Invert"><a href="/articles"><h3>📰 Articles</h3></a></button>
		<button class="Invert"><a onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Nested('/contact'));"><h3>📧 Contact</h3></a></button>
		<div></div>
		<button class="Circle Invert" onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Nested('/Seminar'));"><p title="Account">💾</h3></button>
		<button class="Circle Invert" onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Settings());"><p title="Settings">⚙️</h3></button>
	</div>
</div>
<div>
	<a href="/home"><img src="${this.URL_Logo}"></a>
	<div>
		<button class="Circle Invert"><a href="/youtube"><p title="YouTube">🎥</h3></a></button>
		<button class="Circle Invert"><a href="/projects"><p title="Projects">🗺️</h3></a></button>
		<button class="Circle Invert"><a href="/articles"><p title="Articles">📰</h3></a></button>
		<button class="Circle Invert"><a href="/contact"><p title="Contact">📧</h3></a></button>
		<div></div>
		<button class="Circle Invert"><a href="/Seminar"><p title="Account">💾</h3></a></button>
		<button class="Circle Invert" onclick="TSNJS.Component.Create(new TSNJS.Component.Object.Settings());"><p title="Settings">⚙️</h3></button>
	</div>
</div>`; break;
			}
	};
};

window.TSNJS.Component.Object.Navigation = TSNJS_Navigation;