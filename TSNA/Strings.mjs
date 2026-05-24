/**
	This module from TSN Abstracter is in charge of providing functions related to Strings.

	### Examples
	>>> from TSN_Abstracter import String;
	>>> String.Split_Length("The quick brown fox jumps over the lazy dog.", 16);
	['The quick brown ', 'fox jumps over ', 'the lazy dog.']
*/



/**
	This function takes in a String and then clears out all the ASCII Formatting according to the TF/FC/BC objects. Used for making Log files look cleaner.

	Arguments:
		@param {String} Text A "dirty" Log String that was supposed to be destined for printing on the Console.

	Returns:
		@returns {String} A "clean" Log String devoid of special ASCII Formatting text.
*/
function Clear_ASCII_Formatting(Text) {
	return Text.replace(/\[[\d;]*m/g, "");
};



//** A class containing numerous ASCII Escape Sequences to aid with formatting. */
class ASCII_Chrome {
	static Clear_Screen = "\x1b[2J";

	/** A class containing frequently used ASCII Escape Sequences combinaisons. */
	static Shortcut = class {
		static BSOD = "\x1b[48;2;40;0;255m\x1b[38;2;255;250;255m";
	};

	/** A class containing numerous ASCII Escape Sequences to aid with clearing lines of text. */
	static Line = class {
		static Return = "\x1b[1A\x1b[2K";
		static Clear = "\x1b[2K";
		static Erase_Forward = "\x1b[K";
	};

	/** A class containing numerous ASCII Escape Sequences to aid with text formatting. */
	static Text = class Text {
		static Reset = "\x1b[0m";
		static Reset_Color = "\x1b[39m\x1b[49m";


		static Bold = "\x1b[1m";
		static Bold_OFF = "\x1b[24m";

		static Dim = "\x1b[2m";
		static Dim_OFF = "\x1b[22m";

		static Underline = "\x1b[4m";
		static Underline_OFF = "\x1b[24m";

		static Blink = "\x1b[5m";
		static Blink_OFF = "\x1b[25m";

		static Reverse = "\x1b[7m";
		static Reverse_OFF = "\x1b[27m";

		static Hide = "\x1b[8m";
		static Hide_OFF = "\x1b[28m";
	};



	/** A class containing numerous ASCII Escape Sequences to aid with cursor movement. */
	static Cursor = class {
		/**
			Move the cursor to Line X and Column Y.

			Arguments:
				@param {Number} X The Line to go to.
				@param {Number} Y The Column to go to.
			
			Returns:
				@returns {String} An ASCII escape sequence that makes the cursor go to Line X and Column Y. */
		static Move(X, Y) {
			return `\x1b[${X};${Y}H`;
		};



		/**
			Move the cursor up `Lines` lines.

			Arguments:
				@param {Number} Lines The amount of lines we want to go up.
			
			Returns:
				@returns {String} An ASCII escape sequence that makes the cursor go up `Lines` lines.
		*/
		static Up(Lines) {
			return `\x1b[${Lines}A`;
		};
		/**
			Move the cursor dowb `Lines` lines.

			Arguments:
				@param {Number} Lines The amount of lines we want to go down.
			
			Returns:
				@returns {String} An ASCII escape sequence that makes the cursor go down `Lines` lines.
		*/
		static Down(Lines) {
			return `\x1b[${Lines}B`;
		};
		/**
			Move the cursor right `Columns` columns.

			Arguments:
				@param {Number} Columns The amount of columns we want to go right.
			
			Returns:
				@returns {String} An ASCII escape sequence that makes the cursor go right `Columns` characters.
		*/
		static Right(Columns) {
			return `\x1b[${Columns}C`;
		};
		/**
			Move the cursor left `Columns` columns.

			Arguments:
				@param {Number} Columns The amount of columns we want to go left.
			
			Returns:
				@returns {String} An ASCII escape sequence that makes the cursor go left `Columns` characters.
		*/
		static Left(Columns) {
			return `\x1b[${Columns}D`;
		};



		/**
			Save the current cursor position.

			Returns:
				@returns {String} An ASCII escape sequence that saves the current cursor position.
		 */
		static Save() { return "\x1b[s"; };
		/**
			Load the saved cursor position.

			Returns:
				@returns {String} An ASCII escape sequence that loads the last saved cursor position.
		 */
		static Load() { return "\x1b[u"; };
	};
};
/** Dummy version of ASCII because Firefox doesn't support ASCII escape codes for some reason */
class ASCII_Firefox {
	static Clear_Screen = "";
	static Shortcut = class {
		static BSOD = "";
	};
	static Line = class {
		static Return = "";
		static Clear = "";
		static Erase_Forward = "";
	};
	static Text = class Text {
		static Reset = "";
		static Reset_Color = "";
		static Bold = "";
		static Bold_OFF = "";
		static Dim = "";
		static Dim_OFF = "";
		static Underline = "";
		static Underline_OFF = "";
		static Blink = "";
		static Blink_OFF = "";
		static Reverse = "";
		static Reverse_OFF = "";
		static Hide = "";
		static Hide_OFF = "";
	};
	static Cursor = class {
		static Move(X, Y) { return ""; };
		static Up(Lines) { return ""; };
		static Down(Lines) { return ""; };
		static Right(Columns) { return "";};
		static Left(Columns) { return "";};
		static Save() { return ""; };
		static Load() { return ""; };
	};
};
if (navigator.userAgent.search("Firefox") > -1) {
	console.warn("[TSNA] - Firefox does NOT support ASCII Escape Codes, logging will be featureless.");
	var ASCII = ASCII_Firefox;
} else {
	var ASCII = ASCII_Chrome;
};










/**
	Transforms everything inside `Array` into strings.

	Arguments:
		@param {Array} Array The array we wish to turn all its items into strings.

	Returns:
		@returns {Array} A newly formed list with all of the elements of `Array` as strings.

	Examples:
		>>> String.ify_Array([1.9.4]);
		["1", "9", "4"]
*/ 
function ify_Array(Array) {
	return Array.map(x => String(x));
}





/**
	Bulk replaces every string in `String` to `New` or the 2nd element of a pair inside `Replacers`.

	Arguments:
		Replacers (list[tuple[str, str] | list[str] | str]*): A list of strings or a list of lists/tuples containing the first element being which element to replace within `String` to replace with the second element of the pair.
		String (str*): The string to replace stuff from.
		New (str = ""): If `Replacers` isn't in pairs of strings, the replaced string will have the value of `New`.

	Returns:
		str: The string with all its replacements done.

	Examples:
		>>> String.Bulk_Replace([
			("sanity away", "smile shinning bright"),
			"day"
		], "Hug a Mika a day keeps your sanity away.", "night");
		"Hug a Mika a night keeps your smile shinning bright."
*/
function Bulk_Replace(Replacers, String, New = "") {
	Replacers.forEach(item => {
		if (typeof item == "string") { String.replace(item, New) }
		else { String = String.replace(item[0], item[1])};
	});
	return String;
};





/**
	Adds trailing Zeros to a specified Number.

	Arguments:
		@param {Number} Number The Number we want to potentially add zeros at the start.
		@param {Number} Zeros The amount of digits we aim to have at the end.

	Returns:
		@returns {String}: The Number, now with its trailing zeros added if needed.

	Examples:
		>>> Time.Trailing_Zero(69, 3);
		"069"
*/
function Trailing_Zero(Number, Zeros = 2) {
	let maxDigits = String(Number).length;
	let Extra_Zeros = Zeros - maxDigits;

	if (maxDigits >= Zeros) { return String(Number); };
	return `${'0'*Extra_Zeros}${String(Number)}`;
};





/**
	Splits a string after a new line (unless there are no line breaks, in that case it will stop after a space, otherwise raw cuts through words if neither lines breaks nor spaces are present) into an array according to Max_Length.

	Arguments:
		@param {String} Text The string we want to split.
		@param {Number} Max_Length The maximum size of each string element.

	Returns:
		@returns {Array} A list containing the split text, each of around `Max_Length` in size.
*/
function Split_Length(Text, Max_Length) {
	function Raw_Split() { String_List.push(Text.slice(0,Max_Length)); };



	function Line_Split(PString) {
		let End = PString.length - PString.indexOf("\n");
		String_List.push(Text.slice(0, End));
		return End;
	};



	function Space_Split(PString) {
		let End = PString.length - PString.indexOf(" ");
		String_List.push(Text.slice(0, End));
		return End;
	};



	var String_List = [];
	while (Text != "") {
		let String_Current = Text.slice(0, Max_Length).split("").reverse().join("");
		if (String_Current.length != Text.length) {
			if (String_Current.includes("\n")) { Text = Text.slice(Line_Split(String_Current)); continue; };
			if (String_Current.includes(" ")) { Text = Text.slice(Space_Split(String_Current)); continue; };
		};
		Raw_Split(); Text = Text.slice(Max_Length);
	};

	return String_List;
};



/**
	Shortens end of text with `Abbreviate` if `Text` is longer than `Max_Length`

	Arguments:
		@param {String} Text The string we want to potentially abbreviate.
		@param {Number} Max_Length The maximum size of the string.
		@param {String} Abbreviate The string to replace the end of the text with.

	Returns:
		@returns {String}: The string with its end potentially replaced with `Abbreviate`
*/
function Abbreviate(Text, Max_Length, Abbreviate = "(...)") {
	if (Text.length > Max_Length) {
		Text = Text.slice(0, Max_Length - Abbreviate.length) + Abbreviate
	};
	return Text;
}
//










export default {
	Clear_ASCII_Formatting,
	ASCII,
	ify_Array,
	Bulk_Replace,
	Trailing_Zero,
	Split_Length,
	Abbreviate
};