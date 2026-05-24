import { Config, Deco, Log, Misc, Safe, TSNDL, Strings, Time } from "../../../TSNA/__init__.mjs";
import { BASE_OBJECT } from "../__init__.mjs";
import Common from "../../../Common/__init__.mjs";
import Component from "../../__init__.mjs";



export default class TSNJS_Notification extends BASE_OBJECT {
	constructor(Color, Text, Duration) {
		super();
		this.Name = "TSNJS_Notification";
		this.Override_DOM = Common.FLOATING;

		for (let Index = 0; Index < 100; Index++) {
			if (!Common.Notifications.includes(Index)) {
				this.css = `top: ${6 + Index * 5}rem;`;
				this.Notification = Index;
				Common.Notifications.push(Index);
				break;
			};
		};

		this.Color = Color;
		this.Text = Text;
		this.Duration = Duration;

		this.HTML = `
<div class="${this.Color}">
	<p>${this.Text}</p>
	<div style="animation-duration: ${this.Duration}ms;"></div>
</div>
`;
	};



	async Start(Reference) {
		Log.Info(`${this.Name} (ID: ${this.ID}) - START: [${this.Color}] ${this.Text} (${this.Duration}ms)".`);
		this.Reference = Reference;
		await Time.Sleep(this.Duration);
		await Component.Delete(this.id);
	};



	async Delete() {
		Log.Info(`${this.Name} (ID: ${this.ID}) - DELETE: [${this.Color}] ${this.Text} (${this.Duration}ms)".`);
		Common.Notifications = Common.Notifications.filter(I => I != this.Notification);
	};
};



window.TSNJS.Component.Object.Notification = TSNJS_Notification;