import * as SNJS_Object from "../libObject.mjs";
import Log from "../Common/Log.mjs";

export default class SNJS_Markdown {
	constructor(Text) {
		this.allow_nested = true;

		this.name = "SNJS_Markdown";
		this.delete_delay = 0;
		this.dom_override = undefined;
		this.pseudo_override = undefined;
		this.id = SNJS_Object.Generate_ID();



		// Man-made horrors.
		const H6 = /(?<=^###### ).*/g
		const H5 = /(?<=^##### ).*/g;
		const H4 = /(?<=^#### ).*/g;
		const H3 = /(?<=^### ).*/g;
		const H2 = /(?<=^## ).*/g;
		const H1 = /(?<=^# ).*/g;

		const Italic = /\*(.+?)\*/g;
		const Strong = /\*\*(.+?)\*\*/g;
		const Underline = /__(.+?)__/g;
		const SmallCode = /`(.+?)`/g;

		const List = /(?<=^[ \t]*- ).*/gm;
		const Tab = /\t*/g;



		let Code = ``; let Strongs; let Italics; let Underlines; let Lists; let Tabs; let SmallCodes;
		let Lines = Text.split("\n");
		if (Lines[0] == "") { Lines.shift(); };
		if (Lines[Lines.length - 1] == "") { Lines.pop(); };
		let ListDepth = -1;
		let inCode = false;



		for (let Index = 0; Index < Lines.length; Index++) {
			if (Lines[Index] == "```" && !inCode) { inCode = true; Code += "<code>"; continue; }
			else if (Lines[Index] == "```") { inCode = false; Code += "</code>"; continue; };
			if (inCode) { Code += Lines[Index] + "\n"; continue; };


			if (Lines[Index].match(H6) != null) { Lines[Index] = `<h6>${Lines[Index].match(H6)}</h6>`;}
			if (Lines[Index].match(H5) != null) { Lines[Index] = `<h5>${Lines[Index].match(H5)}</h5>`;}
			if (Lines[Index].match(H4) != null) { Lines[Index] = `<h4>${Lines[Index].match(H4)}</h4>`;}
			if (Lines[Index].match(H3) != null) { Lines[Index] = `<h3>${Lines[Index].match(H3)}</h3>`;}
			if (Lines[Index].match(H2) != null) { Lines[Index] = `<h2>${Lines[Index].match(H2)}</h2>`;}
			if (Lines[Index].match(H1) != null) { Lines[Index] = `<h1>${Lines[Index].match(H1)}</h1>`;}

			Strongs = Lines[Index].match(Strong); if (Strongs != null) {
				for (let Match = 0; Match < Strongs.length; Match++) {
					Lines[Index] = Lines[Index].replace(Strongs[Match], `<strong>${Strongs[Match].replace("**", "").replace("**", "")}</strong>`);
				};
			};
			Italics = Lines[Index].match(Italic); if (Italics != null) {
				for (let Match = 0; Match < Italics.length; Match++) {
					Lines[Index] = Lines[Index].replace(Italics[Match], `<i>${Italics[Match].replace("*", "").replace("*", "")}</i>`);
				};
			};
			Underlines = Lines[Index].match(Underline); if (Underlines != null) {
				for (let Match = 0; Match < Underlines.length; Match++) {
					Lines[Index] = Lines[Index].replace(Underlines[Match], `<u>${Underlines[Match].replace("__", "").replace("__", "")}</u>`);
				};
			};
			SmallCodes = Lines[Index].match(SmallCode); if (SmallCodes != null) {
				for (let Match = 0; Match < SmallCodes.length; Match++) {
					Lines[Index] = Lines[Index].replace(SmallCodes[Match], `<c>${SmallCodes[Match].replace("`", "").replace("`", "")}</c>`);
				};
			};


			Lists = Lines[Index].match(List); if (Lists != null) {
				Tabs = Lines[Index].match(Tab); if (Tabs == null) { Tabs = 0; } else { Tabs = Tabs[0].length};
				//console.log(Lists); console.log(Tabs);
				if (ListDepth == Tabs) {
					Lines[Index] = `</ul><ul><p>${Lists[0]}</p>`;
				} else {
					Lines[Index] = `<ul><p>${Lists[0]}</p>`;
				}

				ListDepth = Tabs;
			} else if (ListDepth != -1) {
				Lines[Index] = "</ul>".repeat(ListDepth+1);
				ListDepth = -1;
				//console.log(`Fixing... ${Lines[Index]}`);
			}

			if (Lines[Index] == "") { Lines[Index] = "<br>" };
			if (Lines[Index][0] != "<") { Lines[Index] = `<p>${Lines[Index]}</p>`};
			Code += Lines[Index];
		};

		this.html = Code;

		this.element = SNJS_Object.Element(this.name, this.id, this.html);
	};
	async Start(Reference) {
		Log(`Started Object "${this.name}" (ID: ${this.id}).`);
		this.reference = Reference;
	};
	async Delete() { Log(`Deleting Object "${this.name}" (ID: ${this.id})...`) };
};

window.SNJS_Markdown = SNJS_Markdown;