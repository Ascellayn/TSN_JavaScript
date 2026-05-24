import { BASE_OBJECT } from "../__init__.mjs";



export default class TSNJS_Videmage extends BASE_OBJECT {
	constructor(SRC, Auto, Loop, Mute, Style = "", Class = "") {
		super();
		this.Name = "TSNJS_Videmage";
		this.Delete_Delay = 0;


		this.SRC = SRC;
		this.Auto = Auto ? "autoplay" : "";
		this.Loop = Loop ? "loop" : "";
		this.Mute = Mute ? "muted" : "";
		this.Style = Style;
		this.Class = Class;

		if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
			this.HTML = `<img src="${this.SRC}_low.mp4" style="${this.Style}" class="${this.Class}">`;
		} else {
			this.HTML = `
<video ${this.Auto} ${this.Loop} ${this.Mute} playsinline style="${this.Style}" class="${this.Class}">
	<source src="${this.SRC}.webm">
	<source src="${this.SRC}.mp4">
	<source src="${this.SRC}.webp">
</video>`
		};
	};
};



window.TSNJS.Component.Object.Videmage = TSNJS_Videmage;