/* 
	TSN Abstracter, but not really. For JavaScript 
	Provides TSNA-Esque Functions that behave as similar as possible to their Python counterpart.
	DocStrings are nearly directly imported from TSNA and may be VERY inaccurate.

	Latest jsTSNA based off TSNA v6.1.5
*/
import Config from "./Config.mjs";
//import App from "./App.mjs"; // Probably useless to implement
import Deco from "./Deco.mjs";
import Log from "./Log.mjs";
//import File from "./File.mjs"; // Literally impossible to implement
import Misc from "./Misc.mjs";
import Safe from "./Safe.mjs";
import TSNDL from "./TSNDL.mjs";
import Strings from "./Strings.mjs"; // This had to be renamed...
import Time from "./Time.mjs";



export { Config, Deco, Log, Misc, Safe, TSNDL, Strings, Time };
window.TSNA = new Object();
TSNA.Config = Config;
TSNA.Deco = Deco;
TSNA.Log = Log;
TSNA.Misc = Misc;
TSNA.Safe = Safe;
TSNA.TSNDL = TSNDL;
TSNA.Strings = Strings;
TSNA.Time = Time;