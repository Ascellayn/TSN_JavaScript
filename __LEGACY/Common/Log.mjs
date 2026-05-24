import { Date_String } from "./Time.mjs";

export default function Log(Text) {
	console.log(`[${Date_String()}] ${Text}`);
	/*
	// Problem with libobject methods band-aid fix
	let Function_Name;
	if (Log.caller == null) { Function_Name = "unknown_function"; }
	else { Function_Name = Log.caller.name; };

	console.log(`[${Date_String()}] ${Function_Name}(): ${Text}`);
	*/
};