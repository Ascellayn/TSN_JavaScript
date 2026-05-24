import * as G from "./Globals.mjs";
import * as Misc from "./Common/Misc.mjs";
import * as Time from "./Common/Time.mjs";

import Log from "./Common/Log.mjs";



// SNJS Objects
import SNJS_Alert from "./Objects/Alert.mjs";
import SNJS_Background from "./Objects/Background.mjs";
import SNJS_Codeblock from "./Objects/Codeblock.mjs";
import SNJS_Copyright from "./Objects/Copyright.mjs";
import SNJS_Markdown from "./Objects/Markdown.mjs";
import SNJS_Navigation from "./Objects/Navigation.mjs";
import SNJS_Nested from "./Objects/Nested.mjs";
import SNJS_Notification from "./Objects/Notification.mjs";
import SNJS_PageLoader from "./Objects/PageLoader.mjs";
import SNJS_Settings from "./Objects/Settings.mjs";
import SNJS_Video from "./Objects/Video.mjs";
import SNJS_WorkInProgress from "./Objects/WorkInProgress.mjs";

export {
	SNJS_Alert,
	SNJS_Background,
	SNJS_Codeblock, SNJS_Copyright,
	SNJS_Markdown,
	SNJS_Navigation, SNJS_Nested, SNJS_Notification,
	SNJS_PageLoader,
	SNJS_Settings,
	SNJS_Video,
	SNJS_WorkInProgress
}


export var Active = [];
//setInterval(Dynamic, 100);
document.addEventListener("change", Dynamic);

// Handles objects inside objects or objects that have the <SNJS_Object> property.
export function Dynamic() {
	function Replace(SNJS_Object, Caller, Tag = "div") {
		O = document.createElement(Tag);
		O.id = SNJS_Object.id; O.classList.add(SNJS_Object.name);
		O.innerHTML = SNJS_Object.html;
		Caller.parentNode.replaceChild(O, Caller);
	};

	Log("libObject → Dynamic(): Finding changes...");
	var O, O_Args, SNJS_Object, Copy_Allowed;
	var O_Name, O_SRC, O_Auto, O_Loop, O_Mute, O_Style, O_Class;
	var FoundObjects = false;

	for (const C of Array.from(document.getElementsByTagName("SNJS-Object"))) {
		O_Name = C.getAttribute("obj");
		O_Args = C.getAttribute("args");
		Log(`libObject → Dynamic: ${O_Name}(${O_Args})`);

		SNJS_Object = new window[O_Name](O_Args);
		Append(SNJS_Object, C);
		Replace(SNJS_Object, C);
		FoundObjects = true;
	};



	for (const C of Array.from(document.getElementsByTagName("code"))) {
		Copy_Allowed = C.getAttribute("AllowCopy");
		if (Copy_Allowed == undefined) { Copy_Allowed = true; };

		Log(`libObject → Dynamic: SNJS_Codeblock()`);
		SNJS_Object = new SNJS_Codeblock(C.innerHTML, Copy_Allowed);
		Append(SNJS_Object, C);
		Replace(SNJS_Object, C);

		FoundObjects = true;
	};



	for (const C of Array.from(document.getElementsByTagName("markdown"))) {
		Log(`libObject → Dynamic: SNJS_Markdown()`);
		SNJS_Object = new SNJS_Markdown(C.innerHTML);
		Append(SNJS_Object, C);
		Replace(SNJS_Object, C);

		FoundObjects = true;
	};




	// Repair Videos for iOS because for some reason they don't work at all???
	for (const C of Array.from(document.getElementsByTagName("SNJS-Video"))) {
		Log(`libObject → Dynamic: SNJS_Video()`);
		O_SRC = C.getAttribute("src");
		O_Auto = C.hasAttribute("auto");
		O_Loop = C.hasAttribute("loop");
		O_Mute = C.hasAttribute("mute");
		O_Style = C.hasAttribute("style") ? C.getAttribute("style") : "";
		O_Class = C.hasAttribute("class") ? C.getAttribute("class") : "";

		SNJS_Object = new SNJS_Video(O_SRC, O_Auto, O_Loop, O_Mute, O_Style, O_Class);
		Append(SNJS_Object, C);
		Replace(SNJS_Object, C);
		FoundObjects = true;
	};



	Fix_Dashlists();
	if (FoundObjects) { Dynamic(); };
};

export function Fix_Dashlists() {
	// Dashlist issues where formatting fucks everything fix
	let Objects = [...document.getElementsByTagName("p"), ...document.getElementsByTagName("span"), ...document.getElementsByTagName("h1"), ...document.getElementsByTagName("h2"), ...document.getElementsByTagName("h3"), ...document.getElementsByTagName("h4"), ...document.getElementsByTagName("h5"), ...document.getElementsByTagName("h6")];
	let O_Caller;
	if (Objects.length != 0) {
		for (let Index = 0; Index < Objects.length; Index++) {
			O_Caller = Objects[Index];
			if (O_Caller.parentNode.tagName == "UL") {
				O_Caller.outerHTML = `<div class="SNDL-Dashlist_Fix">${O_Caller.outerHTML}</div>`
			};
		};
	};
}





// SNJS Object Dependencies
export function Generate_ID() {
	let ID, Obj;
	while (true) {
		ID = String(Misc.Randint(32768));
		Obj = Find(ID);
		if (Obj == null) { return ID; }
		Log("libObject → Generate_ID(): Retrying...");
	};
};


export function Element(Name, ID, HTML, Element_Tag = "div", CSS = "") {
	let Obj_Element = document.createElement(Element_Tag);
	Obj_Element.id = ID;
	Obj_Element.classList.add(Name);
	Obj_Element.style.cssText = CSS;
	Obj_Element.innerHTML = HTML;
	return Obj_Element;
};





/* Object & DOM Manipulation */
export function Append(Object, Parent = null, Pseudo = "Before") {
	let Parent_Name;
	if (!G.Nested || (G.Nested && Object.allow_nested)) {
		if (Object.dom_override) { Parent = Object.dom_override; };
		if (Object.pseudo_override) { Pseudo = Object.pseudo_override; };
		if (!Parent) { Log(`libObject → Append(): "${Object.name}" (${Object.id}) has no Parent!`); return; }

		if (!Parent.id) { Parent_Name = Parent.tagName; }
		else { Parent_Name = Parent.id; };

		Log(`libObject → Append(): "${Object.name}" (${Object.id}) in "${Parent_Name}".`);
		if (Pseudo == "Before") { Parent.insertBefore(Object.element, Parent.firstChild); }
		else { Parent.appendChild(Object.element); };
		
		Object.Start(document.getElementById(Object.id)).then();
		Active.push(Object);
	};
};


export async function Delete(ID) {
	const Obj = Find(ID);
	if (Obj != null) {
		let Obj_Element = document.getElementById(Obj.id);
		await Obj.Delete();
		Obj_Element.classList.add("SNJS-Deleting");
		await Time.Sleep(Obj.delete_delay);

		Obj_Element = document.getElementById(Obj.id);
		Obj_Element.remove();
		Active = Active.filter(I => I != Obj);
	} else { Log(`libObject → Delete(): "${ID}" not found!"`) };
};


export function Find(ID) {
	for (const O of Active) {
		if (O.id == ID || O.name == ID) {
			Log(`libObject → Delete(): ${O.name}(${O.id})`);
			return O;
		};
	};
	return null;
};





window.SNJS.Append = Append;
window.SNJS.Delete = Delete;
window.SNJS.Refresh = Dynamic;