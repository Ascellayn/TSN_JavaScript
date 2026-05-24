import { BASE_OBJECT } from "../__init__.mjs";
import Common from "../../../Common/__init__.mjs";



export default class TSNJS_Unfinished extends BASE_OBJECT {
	constructor() {
		super();
		this.Name = "TSNJS_Unfinished";
		this.Delete_Delay = 500;
		this.Override_DOM = Common.FLOATING;
	};

	async Init() {
		this.HTML = `
<a class="Floating_Full" onclick="TSNJS.Component.Delete(${this.ID})"></a>
<div class="DynaPop Contain_Themed-Inverted">
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
	};
};



window.TSNJS.Component.Object.Unfinished = TSNJS_Unfinished;