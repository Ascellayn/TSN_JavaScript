/***
	This module from TSN Abstracter contains TSNA's logger and its associated derivative functions related to printing stuff on the screen.

	## Examples
	>>> from TSN_Abstracter import Log;
	>>> def MyFunction() -> None: Log.Info(f"Hello World!");
	>>> MyFunction();
	[2007/04/23 - 17:00:00] - Info: MyFunction → Hello World!
*/
import Config from "./Config.mjs";
import String from "./Strings.mjs";
import TSNDL from "./TSNDL.mjs";
import Time from "./Time.mjs";
// My hope is that the "await" status system is so fucking bad that I'm NEVER EVER ALLOWED TO TOUCH PYTHON CODE IN MY ENTIRE LIFE EVER AGAIN
	// TSNJS Update: This isn't Python code... So am I not allowed to touch JS either too now?
var Awaited_Logs = new Object(); // dict[str, list[Awaited_Log]]
var Awaited_Console = null; // str | None
var Awaited_File = null; // str | None





// Logging Dependencies
/**
	Returns if a Log can be display anywhere according to its importance level and TSNA's Config.

	Arguments:
		@param {Number} Level Integer corresponding to how severe the message is.

	Returns:
		@returns {Boolean} Whenever the Log Level and TSNA's Config can allow Logging to either the Console or File.
*/
function Can_Log(Level) {
	return (
		Config.Logger.Disable
		||
		(Level < Config.Logger.Print_Level && Level < Config.Logger.File_Level)
	) ? false : true;
};





/**
 Gives the name of the function who called the function where this function is executed OR the filename where the function was executed if the function returned is "module".
 
	Arguments:
		@param {Number} Depth How far we go back to get the function name.
		
		Returns:
		str: The name of the function or module name.
*/
function Get_Caller(Depth = 1) {
	try {
		return eval(`Get_Caller${".caller"*Depth}`); // This honestly is terrifying
	} catch (error) {
		return "IN_STRICT_MODE";
	};
};





/**
	Log a message depending on its Level, logging the Caller and Time if it was enabled or is possible into the Python Console or a File according to the TSNA Config.
	#### **DO NOT USE THIS FUNCTION DIRECTLY, USE THE FUNCTIONS SUCH AS Log.Info()!**  

	Arguments:
		@param {String} Text String corresponding to the message to Log.
		@param {Number} Level Integer corresponding to how severe the message is.
		@param {String} Caller Enforce the displayed function that called the Logger, if left empty, automatically figure out who called the Logger.
	
	Examples:
		>>> Log.Log("Hug a Mika a day, keeps your sanity away~", 30, "Ascellayn");
		[2007/04/23 - 17:00:00] - Warning: Ascellayn → Hug a Mika a day, keeps your sanity away~
*/
function Logger(Text, Level = 0, Caller = "") {
	if (!Can_Log(Level)) { return; };



	let Level_Color = ""; let Level_String = "";
	switch (Level) {
		case 50: Level_Color = TSNDL.Log_Color("Purple"); Level_String = String.ASCII.Text.Blink + "Critical" + String.ASCII.Text.Blink_OFF; break;
		case 40: Level_Color = TSNDL.Log_Color("Red"); Level_String = String.ASCII.Text.Blink + "Error" + String.ASCII.Text.Blink_OFF; break;
		case 30: Level_Color = TSNDL.Log_Color("Yellow"); Level_String = "Warning"; break;
		case 25: Level_Color = TSNDL.Log_Color("Blue"); Level_String = "Info"; break;
		case 20: Level_Color = TSNDL.Log_Color("White"); Level_String = "Stateless"; break;
		case 15: Level_Color = TSNDL.Log_Color("Cyan"); Level_String = "Debug"; break;
		case 10: Level_Color = TSNDL.Log_Color("Green"); Level_String = "TSN_Debug"; break;
		default: Level_Color = TSNDL.Log_Color("White"); Level_String = "Unknown"; break;
	};


	// Get function name that called the logger
	if (Caller == "") { Caller = Get_Caller(3); };
	
	// Detects if the logged text is going to await a status update and changes the terminator accordingly, includes prefix.
	let Awaited_Console = false;
	if (Text.length >= 3) { // Avoids Exception if Text is too short
		if ("..." == Text.slice(-3)) {
			if (Level >= Config.Logger.Print_Level) { Awaited_Console = Caller; };
		};
	};


	// Log Message Formatting
	let [Date_Str, Time_Str] = Time.Get_DateStrings(Time.Get_Unix());
	let Logged_Text = ""; // Prefix if previous log was Awaited

	if (Config.Logger.Display_Date) { Logged_Text += `${TSNDL.Log_Color("Grey")}[${Date_Str} - ${Time_Str}]${String.ASCII.Text.Reset} - `; }; // Date

	if (Level != 20) { // Check for Stateless before adding Caller
		Logged_Text += `${String.ASCII.Text.Bold}${Level_Color}${Level_String}${String.ASCII.Text.Reset}: `; // Log Level
		//if (Config.Logger.Display_Caller) { Logged_Text += `${String.ASCII.Text.Underline}${TSNDL.Log_Color("Grey")}${Caller}${String.ASCII.Text.Reset} → `; };
	};
	Logged_Text += Text; // Finally add the actual message we want to Log.

	// Verify for both the Console and File if the Level is high enough before logging. Also refuses to log if the TUI is currently enabled.
	if (Level >= Config.Logger.Print_Level) {
		switch (Level) {
			case 50: console.error(Logged_Text); break;
			case 40: console.error(Logged_Text); break;
			case 30: console.warn(Logged_Text); break;
			case 25: console.info(Logged_Text); break;
			case 20: console.log(Logged_Text); break;
			case 15: console.debug(Logged_Text); break;
			case 10: console.debug(Logged_Text); break;
			default: console.log(Logged_Text); break;
		};
	};

	if (Awaited_Console) {
		if (Caller != "¤" && Awaited_Logs[Caller] == undefined) {
			Awaited_Logs[Caller] = [];
		};
		Awaited_Logs[Caller].push(new Awaited_Log(Level, Caller, Text));
	};
};





// Simplified logging functions
/**
	Log a debug message for **Libraries** *(Level: 10)*.

	Arguments:
		@param {String} Text The string to be displayed in the Log.

	Examples:
		>>> def MyFunction() -> None: Log.TSN_Debug(f"Hello World!");
		>>> MyFunction();
		[2007/04/23 - 17:00:00] - TSN_Debug: MyFunction → Hello World!
*/
function TSN_Debug(Text) { Logger(Text, 10); };

/**
	Log a debug message for **TSNA Programs** *(Level: 15)*.

	Arguments:
		@param {String} Text The string to be displayed in the Log.

	Examples:
		>>> def MyFunction() -> None: Log.Debug(f"Hello World!");
		>>> MyFunction();
		[2007/04/23 - 17:00:00] - Debug: MyFunction → Hello World!
*/
function Debug(Text) { Logger(Text, 15); };

/**
	Log a message with only the time if it's enabled *(Level: 20)*.

	Arguments:
		@param {String} Text The string to be displayed in the Log.

	Examples:
		>>> def MyFunction() -> None: Log.Stateless(f"Hello World!");
		>>> MyFunction();
		[2007/04/23 - 17:00:00] - Hello World!
*/
function Stateless(Text) { Logger(Text, 20); };

/**
	Log a standard informal message *(Level: 25)*.

	Arguments:
		@param {String} Text The string to be displayed in the Log.

	Examples:
		>>> def MyFunction() -> None: Log.Debug(f"Hello World!");
		>>> MyFunction();
		[2007/04/23 - 17:00:00] - Debug: MyFunction → Hello World!
*/
function Info(Text) { Logger(Text, 25); };

/**
	Log a standard warning message *(Level: 30)*.

	Arguments:
		@param {String} Text The string to be displayed in the Log.

	Examples:
		>>> def MyFunction() -> None: Log.Debug(f"Hello World!");
		>>> MyFunction();
		[2007/04/23 - 17:00:00] - Debug: MyFunction → Hello World!
*/
function Warning(Text) { Logger(Text, 30); };

/**
	Log a standard error message *(Level: 40)*.

	Arguments:
		@param {String} Text The string to be displayed in the Log.

	Examples:
		>>> def MyFunction() -> None: Log.Debug(f"Hello World!");
		>>> MyFunction();
		[2007/04/23 - 17:00:00] - Debug: MyFunction → Hello World!
*/
function Error(Text) { Logger(Text, 40); };

/**
	Log a standard critical message *(Level: 50)*.

	Arguments:
		@param {String} Text The string to be displayed in the Log.

	Examples:
		>>> def MyFunction() -> None: Log.Debug(f"Hello World!");
		>>> MyFunction();
		[2007/04/23 - 17:00:00] - Debug: MyFunction → Hello World!
*/
function Critical(Text) { Logger(Text, 50); };





/**
 The Awaited Log System permits TSNA Programs to update the status of Log Entries dynamically.  
	They're used primarily for confirming the end of loading something.  

	Awaited Logs are automatically created when Log Entries end w$ith "...", changing the status of the log will replace said ellipsis with the new status.
*/
class Awaited_Log {
	/**
	 * @param {Number} Level 
	 * @param {String} Caller 
	 * @param {String} Text 
	 * 
	 * @returns {null}
	 */
	constructor(Level, Caller, Text) {
		this.Level = Level;
		this.Caller = Caller;

		if (Text == undefined) { console.error("Undefined Awaited Log"); this.Text = "Undefined"; return; };
		if (Text.slice(-4) == " ...") { this.Text = Text.slice(0, -3) }
		else { this.Text = Text.slice(0,-3) + " "};
	};




	/**
	 Replace the "..." part of the Awaited Log with the status of your choosing.

		Arguments:
			@param {String} Status The custom status to replace the ellipsis with.

		Examples:
			>>> Log.Info("Cooking Ascellayn...");
			[2016/05/20 - 17:00:00] - Info: Arellayn → Cooking Ascellayn...
			>>> Log.Awaited.Status_Update("[COOKED]");
			[2016/05/20 - 17:00:00] - Info: Arellayn → Cooking Ascellayn [COOKED]
	*/
	Status_Update(Status) {
		if (Can_Log(this.Level)) {
			// Update Console Log Entry
			if (this.Level >= Config.Logger.Print_Level) {
				Logger(`${this.Text}[${Status}]`, this.Level, "¤");
			};
		};
	};


	/**
		@param {str | null} Status

		>>> Log.Awaited.OK();
		[2016/05/20 - 17:00:00] - Info: setup_hook → Loading Kosaka [OK]
	*/
	OK(Status = null) {
		this.Status_Update(`${TSNDL.Log_Color("Green")}OK${(Status) ? `: ${Status}` : ``}${String.ASCII.Text.Reset}`);
	};



	/**
		@param {String} Status

		>>> Log.Awaited.OK();
		[2016/05/20 - 17:00:00] - Info: setup_hook → Loading Kosaka [OK]
		>>> Log.Awaited.WARNING("2 Modules Skipped");
		[2016/05/20 - 17:00:00] - Info: setup_hook → Loading Kosaka [WARNING: 2 Modules Skipped]
	*/
	WARNING(Status) {
		this.Level = 30;
		this.Status_Update(`${TSNDL.Log_Color("Yellow")}WARNING${(Status) ? `: ${Status}` : ``}${String.ASCII.Text.Reset}`);
	};



	/**
		@param {String} Status

		>>> Log.Awaited.ERROR("1 Outdated Module");
		[2016/05/20 - 17:00:00] - Info: setup_hook → Loading Kosaka [WARNING: 1 Outdated Module]
	*/
	ERROR(Status) {
		this.Level = 40;
		this.Status_Update(`${TSNDL.Log_Color("Red")}ERROR${(Status) ? `: ${Status}` : ``}${String.ASCII.Text.Reset}`);
	};


	/**
		@param {Exception} Except

		>>> Log.Awaited.EXCEPTION(Except);
		[2016/05/20 - 17:00:00] - Info: setup_hook → Loading Kosaka [EXCEPTION]
		Cannot divide by zero.
	*/
	EXCEPTION(Except) {
		this.Level = 50;
		this.Status_Update(`${TSNDL.Log_Color("Orange")}EXCEPTION${String.ASCII.Text.Reset}\n${String.ASCII.Shortcut.BSOD}${Except}${String.ASCII.Text.Reset}`);
	}
};




/**
	An Awaited Log that doesn't do anything, to be used when the Caller doesn't correspond to the awaited one.
*/
class Awaited_Dummy extends Awaited_Log {
	constructor() { super(); };
	Status_Update(Status) { return; };
	OK(Status = null) { return; };
	Warning(Status) { return; };
	ERROR(Status) { return; };
	EXCEPTION(Except) { return; };
};





/**
	Get the latest Awaited Log, you may specify a Custom Caller if you wish to handle the Log of another function.

	Arguments:
		@param {String} Custom_Caller The name of the caller.

	Returns:
		@returns {Awaited_Log | Awaited_Dummy} The corresponding Log Object or a Dummy one if it wasn't found.
*/
function Awaited(Custom_Caller = null) {
	let Caller = (!Custom_Caller) ? Get_Caller() : Custom_Caller;
	if (Awaited_Logs[Caller] != undefined) {
		let Awaited = Awaited_Logs[Caller].pop();
		//if (Awaited_Logs[Caller].length == 0) { delete Awaited_Logs[Caller]; };
		return Awaited;
	};
	return new Awaited_Dummy();
};










export default {
	Can_Log,
	Get_Caller,
	TSN_Debug,
	Debug,
	Info,
	Stateless,
	Warning,
	Error,
	Critical,
	Awaited
};