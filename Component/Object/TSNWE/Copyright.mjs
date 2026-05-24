import { BASE_OBJECT } from "../__init__.mjs";
import Common from "../../../Common/__init__.mjs";



export default class TSNJS_Copyright extends BASE_OBJECT {
	constructor(Extra = "") {
		super();
		this.Name = "TSNJS_Copyright";


		this.Override_DOM = Common.ROOT;
		this.Override_Pseudo = "After";

		this.HTML = `<a href="/contact"><p>The Sirio Network © 2022-2026 | All rights reserved.${(Extra != "") ? `</p><p>${Extra}` : ""}</p></a>`;
	};
};



window.TSNJS.Component.Object.Copyright = TSNJS_Copyright;