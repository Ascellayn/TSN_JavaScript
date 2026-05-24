import { Config, Deco, Log, Misc, Safe, TSNDL, Strings, Time } from "../../TSNA/__init__.mjs";
import Component from "../__init__.mjs";





async function Generate_ID() {
	let ID;
	while (true) {
		ID = String(Misc.Random(32768));
		let Obj = await Component.Find(ID);
		if (Obj == undefined) { return ID; }
		Log.Debug(`Component → Generate_ID(): Collision! Got ${Obj} Retrying.`);
	};
};





export class BASE_OBJECT {
	constructor() {
		this.ID;
		this.Name = "TSNJS_BaseObject"; // HTML Name, added as a CSS Class
		this.Tag = "div"; // HTML Tag
		this.CSS = ""; // Style Property


		this.allowNested = true; // Allow an object to be created if the page is nested.
		this.Delete_Delay = 1000; // Value in MS of how long before an object gets deleted.

		this.Override_DOM = null; // Where the object should be forced to be created and placed in
		this.Override_Pseudo = null; // Literal["Before", "After", null], should the Object be placed before or after the element it's currently in.
		
		this.HTML = `<h1>Base TSNJS Component</h1>`;
		this.DOM;
	};

	async preInit() { this.ID = await Generate_ID(); };
	async Init() {};
	async Start(Reference) { this.Reference = Reference; };
	async Delete() {};
};










export default {
	Config, Deco, Log, Misc, Safe, TSNDL, String, Time,
	BASE_OBJECT
};
window.TSNJS.Component.Object = new Object;