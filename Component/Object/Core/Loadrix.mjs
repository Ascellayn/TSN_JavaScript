import { BASE_OBJECT } from "../__init__.mjs";
import TSNJS from "../../../TSNJS/__init__.mjs";



export default class TSNJS_Loadrix extends BASE_OBJECT {
	constructor() {
		super();
		this.Name = "TSNJS_Loadrix"; // HTML Name, added as a CSS Class
	};
	
	async Init() {
		const Theme = await TSNJS.Theme.Get.Theme();
		if (Theme == "Light") { this.GIF = "/Root/Icon/Cublodes/Light.webp"; }
		else { this.GIF = "/Root/Icon/Cublodes/Dark.webp"; };
		this.HTML = `<img class="Floating_Full" src="${this.GIF}"><div class="TSNJS_Bar"></div>`;
	};

	async Delete() {
		this.Reference.style.width = "100%";
	};
};



window.TSNJS.Component.Object.Loadrix = TSNJS_Loadrix;