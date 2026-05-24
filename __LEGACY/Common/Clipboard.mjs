import Log from "./Log.mjs";
import { Find, Append, SNJS_Notification } from "../libObject.mjs";

export function ID(ID) {
	let O = Find(ID);
	if (O) {
		let Copied = O.Text;
		navigator.clipboard.writeText(Copied);
		Log(`The following text has been copied to your clipboard: \n\n${Copied}`);
		Append(new SNJS_Notification("Green", `Copied to Clipboard ${O.Text.length} characters`, 5000));
	} else {
		Append(new SNJS_Notification("Red", `Failed to copy to clipboard!`, 5000));
	};
};

window.SNJS.Clipboard_ID = ID;