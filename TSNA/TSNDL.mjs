/**
	This module from TSN Abstracter is in charge of providing functions related to manipulating colors.  
	It also contains the entire suite of TSNDL Colors.
	##### The Sirio Network Design Language © The Sirio Network 2023-2026 // All Rights Reserved

	### Examples
	>>> from TSN_Abstracter import TSNDL;
	>>> TSNDL.Color.Sun.Pink
	(255, 150, 255)
*/
import Config from "./Config.mjs";
import Misc from "./Misc.mjs";





/**
	Classes containing TSNDL v3.1 Colors, each color is stored as a RGB Tuple within their respective `Color Group` then followed its name.  
	Optionally, the Hex Code is available by appending `_Hex` to the color.  
	If you are using TSNA's `TUI.*` functions, the curses colors are available by appending `_TERM`.  
	*These colors may be referred as The "Sirio Network Colors" (SNC).*
	##### The Sirio Network Design Language © The Sirio Network 2023-2026 // All Rights Reserved

	### Examples
	>>> TSNDL.Color.Sun.Pink
	(255, 150, 255)
	>>> TSNDL.Color.Sun.White_Hex
	"#FFFAFF"

	### Color Groups:
	| Color Type    | Light Mode | Dark Mode |
	|:--------------|:----------:|:---------:|
	| **Primary**   | Sun        | Moon      |
	| **Secondary** | Day        | Night     |
	| **Tertiary**  | Sky        | Abyss     |

	### Internal TSNDL Color Schemes (Migration Reference):
	| TSNDL Version | Black    | White     | Red       | Orange    | Yellow    | Green     | Cyan      | Blue      | Purple    | Pink      |
	|:--------------|:--------:|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|
	| **v3.1+**     | Arellayn | Ascellayn | Wakamo    | Maple     | Seia      | Otogi     | Glacier   | Marine    | Nebula    | Mika      |
	| **v3.0+**     | Bismuth  | Ascellyan | Wakamo    | Holtow    | Serina    | Otogi     | Horizon   | Ocean     | Astro     | Mika      |

	### TSNDL Color Groups History (Migration Reference):
	| TSNDL v3.1          | Sun           | Day       | Sky       | Moon      | Night     | Abyss     |
	|:-------------------|:-------------:|:---------:|:---------:|:---------:|:---------:|:---------:|
	| **v3.1 DEV**       | Flash         | Bright    | undefined | Night     | Abyss     | Void      |
	| **v3.0+ (Colors)** | Flash         | Bright    | undefined | Night     | Abyss     | Void      |
	| **v3.0+ (White)**  | White         | Accent    | undefined | undefined | Dark      | Darker    |
	| **v3.0+ (Black)**  | Sirio Network | Ascellyan | undefined | undefined | Arellyan  | Bismuth   |
	| **v3.0+ (Black)**  | Sirio Network | Ascellyan | undefined | undefined | Arellyan  | Bismuth   |
	| **v2.0+***         | Feather       | Light     | [Nothing] | Solid     | undefined | undefined |

	*: TSNDL v2.0's Colors behaved SIGNIFICANTLY differently from 3.0 and onwards, while newer versions actually change the colors, TSNDL v2.0 only relied on opacity to emulate lighter colors.  
	The color Grey was added in TSNDL v3.2 and does not have any old colors that can be migrated from.  
*/
const Color = {
	Abyss: {
		// Dark-Mode: Tertiary Color
		Black: [20, 0, 20],
		Grey: [90, 70, 90],
		White: [225, 190, 225],
		Red: [105, 0, 0],
		Orange: [105, 5, 0],
		Yellow: [135, 135, 0],
		Green: [0, 135, 30],
		Cyan: [0, 130, 135],
		Blue: [10, 0, 75],
		Purple: [50, 0, 75],
		Pink: [105, 0, 105],

		Black_Hex: "#140014",
		Grey_Hex: "#5A465A",
		White_Hex: "#E1BEE1",
		Red_Hex: "#690000",
		Orange_Hex: "#690500",
		Yellow_Hex: "#878700",
		Green_Hex: "#00871E",
		Cyan_Hex: "#008287",
		Blue_Hex: "#0A004B",
		Purple_Hex: "#32004B",
		Pink_Hex: "#690069",

		Black_TERM: 0,
		Grey_TERM: 1,
		White_TERM: 2,
		Red_TERM: 3,
		Orange_TERM: 4,
		Yellow_TERM: 5,
		Green_TERM: 6,
		Cyan_TERM: 7,
		Blue_TERM: 8,
		Purple_TERM: 9,
		Pink_TERM: 10,
	},

	Night: {
		// Dark-Mode: Secondary Color
		Black: [30, 10, 30],
		Grey: [110, 90, 110],
		White: [230, 200, 230],
		Red: [130, 5, 5],
		Orange: [130, 30, 5],
		Yellow: [155, 155, 5],
		Green: [14, 155, 40],
		Cyan: [10, 140, 155],
		Blue: [15, 0, 105],
		Purple: [75, 5, 105],
		Pink: [130, 25, 130],

		Black_Hex: "#1E0A1E",
		Grey_Hex: "#6E5A6E",
		White_Hex: "#E6C8E6",
		Red_Hex: "#820505",
		Orange_Hex: "#821E05",
		Yellow_Hex: "#9B9B05",
		Green_Hex: "#0E9B28",
		Cyan_Hex: "#0A8C9B",
		Blue_Hex: "#0F0069",
		Purple_Hex: "#4B0569",
		Pink_Hex: "#821982",

		Black_TERM: 20,
		Grey_TERM: 21,
		White_TERM: 22,
		Red_TERM: 23,
		Orange_TERM: 24,
		Yellow_TERM: 25,
		Green_TERM: 26,
		Cyan_TERM: 27,
		Blue_TERM: 28,
		Purple_TERM: 29,
		Pink_TERM: 30,
	},

	Moon: {
		// Dark-Mode: Primary Color
		Black: [40, 15, 40],
		Grey: [130, 110, 130],
		White: [235, 210, 235],
		Red: [155, 10, 10],
		Orange: [155, 55, 10],
		Yellow: [175, 175, 10],
		Green: [28, 175, 50],
		Cyan: [28, 150, 175],
		Blue: [20, 0, 135],
		Purple: [95, 10, 135],
		Pink: [155, 50, 155],

		Black_Hex: "#280F28",
		Grey_Hex: "#826E82",
		White_Hex: "#EBD2EB",
		Red_Hex: "#9B0A0A",
		Orange_Hex: "#9B370A",
		Yellow_Hex: "#AFAF0A",
		Green_Hex: "#1CAF32",
		Cyan_Hex: "#1C96AF",
		Blue_Hex: "#140087",
		Purple_Hex: "#5F0A87",
		Pink_Hex: "#9B329B",

		Black_TERM: 40,
		Grey_TERM: 41,
		White_TERM: 42,
		Red_TERM: 43,
		Orange_TERM: 44,
		Yellow_TERM: 45,
		Green_TERM: 46,
		Cyan_TERM: 47,
		Blue_TERM: 48,
		Purple_TERM: 49,
		Pink_TERM: 50,
	},

	Sky: {
		// Light-Mode: Tertiary Color
		Black: [60, 25, 60],
		Grey: [170, 150, 170],
		White: [245, 230, 245],
		Red: [205, 20, 20],
		Orange: [205, 105, 20],
		Yellow: [215, 215, 20],
		Green: [56, 215, 70],
		Cyan: [40, 170, 205],
		Blue: [30, 0, 195],
		Purple: [135, 20, 195],
		Pink: [205, 100, 205],

		Black_Hex: "#3C193C",
		Grey_Hex: "#AA96AA",
		White_Hex: "#F5E6F5",
		Red_Hex: "#CD1414",
		Orange_Hex: "#CD6914",
		Yellow_Hex: "#D7D714",
		Green_Hex: "#38D746",
		Cyan_Hex: "#28AACD",
		Blue_Hex: "#1E00C3",
		Purple_Hex: "#8714C3",
		Pink_Hex: "#CD64CD",

		Black_TERM: 60,
		Grey_TERM: 61,
		White_TERM: 62,
		Red_TERM: 63,
		Orange_TERM: 64,
		Yellow_TERM: 65,
		Green_TERM: 66,
		Cyan_TERM: 67,
		Blue_TERM: 68,
		Purple_TERM: 69,
		Pink_TERM: 70,
	},

	Day: {
		// Light-Mode: Secondary Color
		Black: [70, 30, 70],
		Grey: [190, 170, 190],
		White: [250, 240, 250],
		Red: [230, 25, 25],
		Orange: [230, 130, 25],
		Yellow: [235, 235, 25],
		Green: [70, 240, 80],
		Cyan: [50, 180, 230],
		Blue: [35, 0, 225],
		Purple: [155, 25, 225],
		Pink: [230, 125, 230],

		Black_Hex: "#461E46",
		Grey_Hex: "#BEAABE",
		White_Hex: "#FAF0FA",
		Red_Hex: "#E61919",
		Orange_Hex: "#E68219",
		Yellow_Hex: "#EBEB19",
		Green_Hex: "#46F050",
		Cyan_Hex: "#32B4E6",
		Blue_Hex: "#2300E1",
		Purple_Hex: "#9B19E1",
		Pink_Hex: "#E67DE6",

		Black_TERM: 80,
		Grey_TERM: 81,
		White_TERM: 82,
		Red_TERM: 83,
		Orange_TERM: 84,
		Yellow_TERM: 85,
		Green_TERM: 86,
		Cyan_TERM: 87,
		Blue_TERM: 88,
		Purple_TERM: 89,
		Pink_TERM: 90,
	},

	Sun: {
		// Light-Mode: Primary Color
		Black: [80, 35, 80],
		Grey: [210, 190, 210],
		White: [255, 250, 255],
		Red: [255, 30, 30],
		Orange: [255, 155, 30],
		Yellow: [255, 255, 30],
		Green: [84, 255, 90],
		Cyan: [60, 190, 255],
		Blue: [40, 0, 255],
		Purple: [175, 30, 255],
		Pink: [255, 150, 255],

		Black_Hex: "#502350",
		Grey_Hex: "#D2BED2",
		White_Hex: "#FFFAFF",
		Red_Hex: "#FF1E1E",
		Orange_Hex: "#FF9B1E",
		Yellow_Hex: "#FFFF1E",
		Green_Hex: "#54FF5A",
		Cyan_Hex: "#3CBEFF",
		Blue_Hex: "#2800FF",
		Purple_Hex: "#AF1EFF",
		Pink_Hex: "#FF96FF",

		Black_TERM: 100,
		Grey_TERM: 101,
		White_TERM: 102,
		Red_TERM: 103,
		Orange_TERM: 104,
		Yellow_TERM: 105,
		Green_TERM: 106,
		Cyan_TERM: 107,
		Blue_TERM: 108,
		Purple_TERM: 109,
		Pink_TERM: 110,
	},
};





/**
	Transform a Hex Code representing colors into a Tuple containing RGB(A) colors.

	Arguments:
		@param {String} Hex The string representing the Hex Code. The hashtag at the start is not required.

	Returns:
		@returns {tuple} Each element is an integer from a range of 0 to 255, representing in order an RGB(A) Color.

	Examples:
		>>> TSNDL.Hex_Tuple("#50235080");
		(80, 35, 80, 128)
		>>> TSNDL.Hex_Tuple("#502350");
		(80, 35, 80)
*/
function Hex_Tuple(Hex) {
	// Gets rid of the first character if it's an "#"
	if (Hex.splice(0,1) == "#") { Hex = Hex.slice(1); };

	if (Hex.length > 8) { throw "[ValueError] - Invalid Hex Code Length (Too long!)"; }
	else if (Hex.length < 6) { throw "[ValueError] Invalid Hex Code Length (Too short!)"; }
	else if (!Misc.is_Even(Hex.length)) { throw "[ValueError] - Invalid Hex Code Length (Incorrect Length!)"; };
	
	let Hex_List = []; // list[int]
	Hex_List.push(16 * Hex_To_Decimal(Hex.slice(0,1)) + Hex_To_Decimal(Hex.slice(1,2)));							// R
	Hex_List.push(16 * Hex_To_Decimal(Hex.slice(2,3)) + Hex_To_Decimal(Hex.slice(3,4)));							// G
	Hex_List.push(16 * Hex_To_Decimal(Hex.slice(4,5)) + Hex_To_Decimal(Hex.slice(4,6))); 							// B
	if (Hex.length == 8) { Hex_List.push(16 * Hex_To_Decimal(Hex.slice(5,6)) + Hex_To_Decimal(Hex.slice(5,7))); }	// A

	return Hex_List; // type: ignore | SHUSH. Otherwise this function would look retarded. I could just return a list but eh.
	// WELL I GOT SOME NEWS FOR YOU BUDDY, TUPLES ARENT A TYPE IN JAVASCRIPT!!! You have to const an array, but we obviously can't do that here!
};



/**
	Transform a SINGULAR Hex Character into Base 10 alias Decimal.  
	*All further characters are IGNORED!*

	Arguments:
		@param {String} Hex The character representing a number in base 16.

	Returns:
		@returns {Number} The corresponding base 10 number.

	Raises:
		@throws {ValueError} If the provided Hex Character is not one.

	Examples:
		>>> TSNDL.Hex_To_Decimal("F");
		15
*/
function Hex_To_Decimal(Hex) {
	switch (Hex.slice(1).toUpperCase()) {
		case "F": return 15; break;
		case "E": return 14; break;
		case "D": return 13; break;
		case "C": return 12; break;
		case "B": return 11; break;
		case "A": return 10; break;
		default:
			if (Hex.slice(1) in ["1234567890"]) { return Number(Hex.slice(1)); }
			else { throw "[ValueError] - Invalid Hex Character!"; };
			break;
	};
};



/**
	Transforms an SNC Tuple into an ASCII Color escape sequence string.

	Arguments:
		@param {tuple} SNC A tuple containing 3 integers of a range of 0 to 255 representing a 8bit RGB value.
		@param {Boolean} Foreground Specify if we want an ASCII Foreground (Text) or Background Color.

	Returns:
		@returns {String} The ASCII Color escape sequence string.

	Examples:
		>>> TSNDL.ASCII_Color(TSNDL.Color.Sun.White);
		# TSNDL.Color.Sun.White = (255, 250, 255)
		"\x1b[38;2;255;250;255m"
*/
function ASCII_Color(SNC, Foreground = true) {
	if (navigator.userAgent.search("Firefox") > -1) { return "" }; // Firefox doesn't support this
	return `\x1b[${(Foreground) ? '38' : '48'};2;${SNC[0]};${SNC[1]};${SNC[2]}m`;
};



/**
	Get an ASCII Color escape sequence of the requested color according to the `Config.Logger.TSNDL_Group` variable of the TSNA Config.

	Arguments:
		@param {String} Color The name of the color.
		@param {Boolean} Foreground Specify if we want an ASCII Foreground (Text) or Background Color.

	Returns:
		@returns {String}: The ASCII Color escape sequence string depending on the TSNA Config.

	Examples:
		>>> TSNDL.Log_Color("White");
		"\x1b[38;2;255;250;255m"
*/
function Log_Color(Color_Name, Foreground = true) {
	return ASCII_Color(
		Color[Config.Logger.TSNDL_Group][Color_Name], Foreground
	);
}










export default {
	Hex_Tuple,
	Hex_To_Decimal,
	ASCII_Color,
	Log_Color,
	Color
};