import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

import * as G from "../Globals.mjs";
export default class SNJS_Video {
	constructor(SRC, Auto, Loop, Mute, Style = "", Class = "") {
		this.allow_nested = true;

		this.name = "SNJS_Video";
		this.delete_delay = 0;
		this.dom_override = undefined;
		this.pseudo_override = undefined;
		this.id = SNJS_Object.Generate_ID();

		this.SRC = SRC;
		this.Auto = Auto ? "autoplay" : "";
		this.Loop = Loop ? "loop" : "";
		this.Mute = Mute ? "muted" : "";
		this.Style = Style;
		this.Class = Class;

		if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
			this.html = `<img src="${this.SRC}_low.mp4" style="${this.Style}" class="${this.Class}">`;
		} else {
			this.html = `
<video ${this.Auto} ${this.Loop} ${this.Mute} playsinline style="${this.Style}" class="${this.Class}">
	<source src="${this.SRC}.webm">
	<source src="${this.SRC}.mp4">
	<source src="${this.SRC}.webp">
</video>`
		};

		this.element = SNJS_Object.Element(this.name, this.id, this.html);
	};
	async Start(Reference) {
		Log(`Started Object "${this.name}" (ID: ${this.id}).`);
		this.reference = Reference;
	};
	async Delete() { Log(`Deleting Object "${this.name}" (ID: ${this.id})...`) };
};

window.SNJS_Video = SNJS_Video;