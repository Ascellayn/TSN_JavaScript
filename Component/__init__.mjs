import { Config, Deco, Log, Misc, Safe, TSNDL, Strings, Time } from "../TSNA/__init__.mjs";
import Common from "../Common/__init__.mjs";





var Active = [];
var Refreshing = false;





async function Refresh() {
	if (Refreshing) {
		Log.Debug("TSNJS.Component.Refresh(): Already refreshing, skipping.");
		return;
	};
	Log.Debug("TSNJS.Component.Refresh(): Refreshing...");
	var doRefresh = false;
	Refreshing = true;



	Log.Debug("TSNJS.Component.Refresh(): Looking for \"TSNJS_Object\"...");
	for (const CompoDOM of Array.from(document.getElementsByTagName("TSNJS_Object"))) {
		let Component = CompoDOM.getAttribute("Component");
		let Arguments = CompoDOM.getAttribute("Arguments");
		
		Log.Info(`TSNJS.Component.Refresh(): new ${Component}`);
		let Compo = eval(`new window.TSNJS.Component.Object.${Component}(\`${Arguments}\`)`);
		await Create(Compo, CompoDOM.parentElement, "", CompoDOM);
		doRefresh = true;
	};
	Log.Awaited().OK();



	Log.Debug("TSNJS.Component.Refresh(): Looking for \"TSNJS_Codeblock\"...");
	for (const CompoDOM of Array.from(document.getElementsByTagName("Codeblock"))) {
		let allowCopy = CompoDOM.getAttribute("allowCopy");
		if (allowCopy == undefined) { allowCopy = false; };
		
		Log.Info("TSNJS.Component.Refresh(): new TSNJS_Codeblock()");
		let Compo = new window.TSNJS.Component.Object.Codeblock(CompoDOM.innerHTML, allowCopy);
		await Create(Compo, CompoDOM.parentElement, "", CompoDOM);
		doRefresh = true;
	};
	Log.Awaited().OK();



	Log.Debug("TSNJS.Component.Refresh(): Looking for \"Markdown\"...");
	for (const CompoDOM of Array.from(document.getElementsByTagName("Markdown"))) {
		Log.Info("TSNJS.Component.Refresh(): new TSNJS_Markdown()");
		let Compo = new window.TSNJS.Component.Object.Markdown(CompoDOM.innerHTML);
		await Create(Compo, CompoDOM.parentElement, "", CompoDOM);
		doRefresh = true;
	};
	Log.Awaited().OK();



	Log.Debug("TSNJS.Component.Refresh(): Looking for \"Videmage\"...");
	for (const CompoDOM of Array.from(document.getElementsByTagName("Videmage"))) {
		Log.Info("TSNJS.Component.Refresh(): new TSNJS_Videmage()");
		
		let SRC = CompoDOM.getAttribute("src");
		let Auto = CompoDOM.hasAttribute("auto");
		let Loop = CompoDOM.hasAttribute("loop");
		let Mute = CompoDOM.hasAttribute("mute");
		let Style = CompoDOM.hasAttribute("style") ? CompoDOM.getAttribute("style") : "";
		let Class = CompoDOM.hasAttribute("class") ? CompoDOM.getAttribute("class") : "";

		let Compo = new window.TSNJS.Component.Object.Videmage(SRC, Auto, Loop, Mute, Style, Class);
		await Create(Compo, CompoDOM.parentElement, "", CompoDOM);
		doRefresh = true;
	};
	Log.Awaited().OK();



	Log.Awaited().OK();
	Refreshing = false;
	if (doRefresh) {
		Log.Info("TSNJS.Component.Refresh(): Recursive Refreshing...");
		await Refresh();
		Log.Awaited().OK();
	};
	return;
};










async function Compile(Component) {
	Log.Debug(`TSNJS.Component.Compile(): Running Component preInit...`);
	await Component.preInit();
	Log.Awaited().OK();

	Log.Debug(`TSNJS.Component.Compile(): Running Component Init...`);
	await Component.Init();
	Log.Awaited().OK();

	Log.Debug(`TSNJS.Component.Compile(): Compilling ${Component.Name} (ID: ${Component.ID})...`);
	let DOM = document.createElement(Component.Tag);
	DOM.id = Component.ID;
	DOM.classList.add(Component.Name);
	DOM.style.cssText = Component.CSS;
	DOM.innerHTML = Component.HTML;
	Component.DOM = DOM;
	Log.Awaited().OK();
};





async function Find(ID) {
	Log.Debug(`TSNJS.Component.Find(): ${ID}...`);
	for (const Component of Active) {
		if (Component.ID == ID || Component.Name == ID) {
			Log.Awaited().Status_Update("FOUND");
			return Component;
		};
	};

	Log.Awaited().Status_Update("NOT FOUND");
	return null;
};



async function Delete(ID) {
	let Component = await Find(ID);
	if (Component == null) {
		Log.Error(`TSNJS.Component.Delete(): Unable to delete ${ID} as it was not found.`);
		return;
	};

	Log.Debug(`TSNJS.Component.Delete(): Deleting ${ID} in ${Component.Delete_Delay}ms...`);
	const Component_DOM = document.getElementById(Component.ID);
	await Component.Delete();
	Component_DOM.classList.add("DELETING");
	await Time.Sleep(Component.Delete_Delay);

	Component_DOM.remove();
	Active = Active.filter(C => C != Component);

	Log.Awaited().OK();
};



async function Create(Component, Parent = null, Pseudo = "Before", Replaced = null) {
	await Compile(Component);
	Log.Info(`TSNJS.Component.Create(): ${Component.Name} (ID: ${Component.ID})...`);
	if (Common.isNested && !Component.allowNested) {
		Log.Awaited().ERROR("Nested Webpages Unallowed");
		return;
	};

	if (Component.Override_DOM) { Parent = Component.Override_DOM; };
	if (Component.Override_Pseudo) { Pseudo = Component.Override_Pseudo; };
	if (!Parent) { Log.Awaited().ERROR("Parent-less"); return; };

	const PARENT_NAME = (!Parent.id) ? Parent.tagName : Parent.id;

	if (Replaced != null) { Parent.replaceChild(Component.DOM, Replaced); }
	else {
		if (Pseudo == "Before") { Parent.insertBefore(Component.DOM, Parent.firstChild) }
		else { Parent.appendChild(Component.DOM) };
	};

	Component.Start(document.getElementById(Component.ID)); // Intentionally NOT await this
	Active.push(Component);
	Log.Awaited().OK();
};










export default {
	Config, Deco, Log, Misc, Safe, TSNDL, Strings, Time,
	Common,
	Refresh,
	Compile,
	Find,
	Delete,
	Create
};
window.TSNJS.Component = new Object();
window.TSNJS.Component.Create = Create;
window.TSNJS.Component.Delete = Delete;
window.TSNJS.Component.Refresh = Refresh;