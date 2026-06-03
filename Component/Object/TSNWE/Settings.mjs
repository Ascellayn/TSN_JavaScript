import { BASE_OBJECT } from "../__init__.mjs";
import Common from "../../../Common/__init__.mjs";



export default class TSNJS_Settings extends BASE_OBJECT {
	constructor() {
		super();
		this.Name = "TSNJS_Settings";
		this.Delete_Delay = 500;
		this.Override_DOM = Common.FLOATING;
	};

	async Init() {
		this.HTML = `
<a class="Floating_Full" onclick="TSNJS.Component.Delete(${this.ID})"></a>
<div>
	<header class="Flex_Between">
		<h1>Settings</h1>
		<a class="Button_Circle" href="#" onclick="TSNJS.Component.Delete(${this.ID})"><p>X</p></a>
	</header>
	<spacer></spacer>
	<div>
		<h2>TSNWE Theme Enforcement</h2>
		<div class="Flex Flex_ForceWidth" style="flex-direction: column; --Flex_ForceWidth: calc(100% - var(--UI_Padding) * 2);">
			<a class="Button" href="#" onclick="TSNJS.Theme.Switch.Theme('Light'); localStorage.setItem('TSNWE/forceTheme', 'Light');"><p>Force Light Theme</p></a>
			<a class="Button" href="#" onclick="TSNJS.Theme.Switch.Theme('Dark'); localStorage.setItem('TSNWE/forceTheme', 'Dark');"><p>Force Dark Theme</p></a>
			<a class="Button" href="#" onclick="localStorage.removeItem('TSNWE/forceTheme');"><p>Disable Theme Enforcing</p></a>
			<a class="Button" href="#" onclick="TSNJS.Theme.Switch.Contrasted('true'); localStorage.setItem('TSNWE/Contrasted', 'true');"><p>Enable High Contrast</p></a>
			<a class="Button" href="#" onclick="TSNJS.Theme.Switch.Contrasted('false'); localStorage.removeItem('TSNWE/Contrasted');"><p>Disable High Contrast</p></a>
		</div>
		<spacer></spacer>
		<div>
			<h2>Whoops. It looks like this function is still unfinished.</h2>
			<p>The Sirio Network Website Settings aren't fully done yet. It will be much, much later, after that the many dependencies for this feature are finally done..</p>
			<p>Anyways... While you wait, here's Akira boping around.</p>
			<p>She'll be there until this isn't finished.</p>
		</div>
		<a href="https://www.pixiv.net/en/artworks/108979706" target="_blank"><img src="/Root/108979706_p0-transparent.gif" style="max-width: 100%;"></a>
		<div class="Source">
			<p>Source of the GIF was deleted from Pixiv :( If someone knows the original artist please do link me to it</p>
		</div>
	</div>
</div>
`;
	};
};



window.TSNJS.Component.Object.Settings = TSNJS_Settings;