import * as Time from "./Common/Time.mjs";
import * as Theme from "./Common/Theme.mjs";
import SNJS_Video from "./Objects/Video.mjs";

window.addEventListener("load", async function() {
	let Blackout = document.querySelector("#Blackout");
	let SN_Video = new SNJS_Video("/Media/Home/Showcase_TSN", true, false, true, "min-width: 100vw; min-height: 50vh; object-fit: cover; transition: opacity var(--SNDL-Transition_XSlow); opacity: 1;");
	Blackout.innerHTML = SN_Video.html;
	await Time.Sleep(6000);
	//await Time.Sleep(1000);
	Blackout.style.opacity = 0;
	await Time.Sleep(1000);
	await Theme.Switch();
});