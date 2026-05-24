import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

import * as G from "../Globals.mjs";
import * as Time from "../Common/Time.mjs";
export default class SNJS_Notification {
	constructor(snc, text, length) {
		this.allow_nested = true;

		this.name = "SNJS_Notification";
		this.delete_delay = 1000;
		this.dom_override = G.Floating;
		this.pseudo_override = undefined;
		this.id = SNJS_Object.Generate_ID();

		let Notification_Slots = G.Generic["Notification_Slots"];

		for (let Index = 0; Index < 100; Index++) {
			if (!Notification_Slots.includes(Index)) {
				this.css = `top: ${6 + Index * 5}rem;`;
				this.Notification = Index;
				Notification_Slots.push(Index);
				G.Generic_Modify("Notification_Slots", Notification_Slots);
				break;
			};
		};

		this.length = length;

		this.html = `
<div class="SNC-${snc}">
	<p>${text}</p>
	<div style="animation-duration: ${this.length}ms;"></div>
</div>
`;

		this.element = SNJS_Object.Element(this.name, this.id, this.html, "div", this.css);
	};

	async Start(Reference) {
		Log(`Started Object "${this.name}" (ID: ${this.id}).`);
		this.reference = Reference;
		await Time.Sleep(this.length);
		Log(`DEL "${this.name}" (ID: ${this.id}).`);
		await SNJS_Object.Delete(this.id);
	};
	async Delete() { 
		Log(`Deleting Object "${this.name}" (ID: ${this.id})...`);
		let Notification_Slots = G.Generic["Notification_Slots"];
		Notification_Slots = Notification_Slots.filter(I => I != this.Notification);
		G.Generic_Modify("Notification_Slots", Notification_Slots);
	};
};

window.SNJS_Notification = SNJS_Notification;