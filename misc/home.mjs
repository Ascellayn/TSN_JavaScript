import { Config, Deco, Log, Misc, Safe, TSNDL, Strings, Time } from "../TSNA/__init__.mjs";
import TSNJS from "../TSNJS/__init__.mjs";
import Common from "../Common/__init__.mjs";
import Component from "../Component/__init__.mjs";
import CompObj from "../Component/Object.mjs";
Component.Object = CompObj;



window.addEventListener("load", async function() {
	if (localStorage.getItem("Misc/Home/Seen") != "true") {
		let Blackout = document.querySelector("#Blackout");
		let SN_Video = new Component.Object.Videmage("/Media/Home/Showcase_TSN", true, false, true, "min-width: 100vw; min-height: 50vh; object-fit: cover; transition: opacity var(--SNDL-Transition_XSlow); opacity: 1;");
		Blackout.innerHTML = SN_Video.HTML;
		await Time.Sleep(6000);
	};
	//await Time.Sleep(1000);
	Blackout.style.opacity = 0;
	await TSNJS.Theme.Switch.Theme();
	await Time.Sleep(500);
	localStorage.setItem("Misc/Home/Seen", true);
});