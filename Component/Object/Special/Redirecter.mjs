import { Config, Deco, Log, Misc, Safe, TSNDL, Strings, Time } from "../../../TSNA/__init__.mjs";
import { BASE_OBJECT } from "../__init__.mjs";
import Common from "../../../Common/__init__.mjs";
import Component from "../../__init__.mjs";



export default class TSNJS_Redirecter extends BASE_OBJECT {
	constructor(URL, Delay = 10) {
		super();
		this.Name = "TSNJS_Redirecter";
		this.Override_DOM = Common.FLOATING;


		this.URL = URL;
		this.Delay = Delay;
		this.HTML = `
<div>
	<header class="Contain_Blur" style="border-radius: var(--UI_Border-Radius_Alt); padding: calc(var(--UI_Padding) * 4);">
		<h1 class="Super">Redirecting</h1>
		<h2 class="Quiet TCenter">You are about to leave The Sirio Network.</h2>
		<br>
		<p><a href="${this.URL}"><code>The Sirio Network → ${this.URL}</code></a></p>
	</header>
	<div class="Redirecter-StripeTop"></div>
	<div class="Redirecter-StripeBot"></div>
	<div class="Redirecter-Countdown"><h1 class="Red">10</h1></div>
</div>
`;
	};



	async Start(Reference) {
		Log.Info(`${this.Name} (ID: ${this.ID}) - START: [${this.Delay}] ${this.URL}`);
		this.Reference = Reference;
		const COUNTDOWN = Reference.querySelector(".Redirecter-Countdown > h1");
		let Countdown = this.Delay;
		COUNTDOWN.style = "animation: Countdown_Bounce 1s var(--Curve_SlashBounce) infinite;";
		while (Countdown != -1) {
			COUNTDOWN.innerHTML = Strings.Trailing_Zero(Countdown, String(this.Delay).length);
			Countdown -= 1;
			await Time.Sleep(1000);
		};
		COUNTDOWN.innerHTML = "GO";
		await Time.Sleep(500);
		COUNTDOWN.style = "";
		window.location.href = this.URL;
	};
};



window.TSNJS.Component.Object.Redirecter = TSNJS_Redirecter;