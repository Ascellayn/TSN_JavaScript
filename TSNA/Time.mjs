/**
	This module from TSN Abstracter is in charge of providing functions related to Time.

	### Examples
	>>> from TSN_Abstracter import Time;
	>>> Time.Get_Unix();
	441759600
*/
import String from "./Strings.mjs";



/**
	Converts a Datetime Object to a Unix Timestamp.

	Arguments:
		@param {Date} Object Datetime Object to be converted to an Integer or Float.
		@param {Boolean} Precise Boolean defining if we want a Precise Unix Time. Defaults to False.

	Returns:
		@returns {Number | null} The Unix Timestamp provided by the datetime object, or nothing if the object is invalid.
	
	Examples:
		>>> Time.Convert_Datetime(Timestamp);
		441759600
*/
function Convert_Datetime(Object, Precise = false) {
	if (Object == null) { return null; }; // For some reason we have to add this check because i dunno cosmic rays
	return (Precise) ? Object.getTime() : Math.round(Object.getTime());
};



/**
	Converts an Unix Timestamp to a datetime object.

	Arguments:
		@param {Number} Unix The Unix Timestamp.

	Returns:
		@returns {Date} The datetime object that we converted the Unix Timestamp from.

	>>> Examples:
		>>> Time.Convert_Unix(441759600);
		datetime.datetime(1984, 1, 1, 0, 0)
*/
function Convert_Unix(Unix) {
	return new Date(0).setSeconds(Unix);
};



/**
	Converts ISO 8601 Timestamps to datetime objects.

	Arguments:
		@param {String} ISO_8601 A timestamp in the ISO_8601 format.

	Returns:
		@returns {Date} The datetime object that we converted the ISO 8601 from.
	
	Examples:
		>>> Time.Convert_ISO("2023-07-14T17:00:00Z");
		datetime.datetime(2023, 7, 14, 17, 0, tzinfo=datetime.timezone.utc)
*/
function Convert_ISO8601(ISO_8601) {
	return new Date(ISO_8601);
};





// Time.Get_*
/**
	Get an Integer/Float representing Unix Time.

	Arguments:
		@param {Boolean} Precise Specify if we want a precise Unix Time.

	Returns:
		@returns {Number} The current Unix Time.

	Examples:
		>>> Time.Get_Unix();
		441759600
*/
function Get_Unix(Precise) {
	return Convert_Datetime(new Date(), Precise);
};



/**
	Get the first second of the day specified in the Unix Timestamp.

	Arguments:
		@param {Number} Unix The Unix Timestamp.

	Returns:
		@returns {Number} The Unix Timestamp of the first second of the specified day.

	Examples:
		>>> Time.Get_Dawn(441759743);
		441759600
*/
function Get_Dawn(Unix) {
	return Convert_Datetime(
		Convert_Unix(Unix).setHours(0, 0, 0, 0),
		((Unix - Math.round(Unix)) != 0) ? true : false
	);
};



/**
	Get the specified Timestamp's date and time string in the preferred format.

	Arguments:
		Timestamp (int/float/datetime*): The timestamp we wish to get readable strings from.

	Returns:
		tuple (str, str): Two strings containing the date in YYYY/MM/DD and HH:MM:SS format respectively.

	Examples:
		>>> Time.Get_DateStrings(441759600);
		('1984/01/01', '00:00:00')
*/
function Get_DateStrings(Timestamp) {
	let DT = (typeof(Timestamp) == Date) ? Timestamp : new Date(Timestamp);

	return [
		`${DT.getFullYear()}/${String.Trailing_Zero(DT.getMonth() + 1)}/${String.Trailing_Zero(DT.getDate())}`,
		`${String.Trailing_Zero(DT.getHours())}:${String.Trailing_Zero(DT.getMinutes())}:${String.Trailing_Zero(DT.getSeconds())}`
	];
};





// Time Functions that aid in String related functions.
const Unit_Short = {
	"Years": "Y",
	"Months": "M",
	"Days": "D",
	"Hours": "h",
	"Minutes": "m",
	"Seconds": "s",
	"Milliseconds": "ms",
	"Microseconds": "µs",
	"Nanoseconds": "ns"
}; // dict[str, str]


const Unit_Power = {
	"Years": 5,
	"Months": 4,
	"Days": 3,
	"Hours": 2,
	"Minutes": 1,
	"Seconds": 0,
	"Milliseconds": -1,
	"Microseconds": -2,
	"Nanoseconds": -3
}; // dict[str, int]


// ~~Class~~ Dict containing the amount of seconds required to pass to equate to a full unit.
const Unit_Unix = {
	Year: 31557600,
	Month: 2629800,
	Day: 86400,
	Hour: 86400,
	Minute: 3600
};






/**
	Get the maximum and minimum power units of a given Time Dict.

	Arguments:
		@param {Object} Time_Dict (dict[str, int]): TODO
	
	Returns:
		@returns {Array} The biggest then smallest units' powers present in the Time Dict.

	Raises:
		ValueError: A key in the Time_Dict is invalid or unknown to TSNA.

	Examples:
		TODO
*/
function Unit_Edges(Time_Dict) {
	let Biggest_Unit = -3; // int
	let Smallest_Unit = -3; // int

	Time_Dict.keys().forEach(k => {
		if (!Unit_Power.has(k)) { throw `[ValueError] - Invalid Key in Time Dict: \"${k}\".`; };
		
		if (Time_Dict[k] != 0) {
			if (Unit_Power[k] > Biggest_Unit) { Biggest_Unit = Unit_Power[k]; };
			Smallest_Unit = Unit_Power[k];
		};
	});

	return [Biggest_Unit, Smallest_Unit];
};





// Time Functions with Calculations
/**
	Calculate how much time since the Epoch has passed.  
	**NOTE**: Everything is calculated according to a year being **365.25 days** long. This function will breakdown the moment you reach into the days.

	Arguments:
		@param {Number} Unix Integer/Float representing the time since the Epoch.
	Returns:
		@returns {Object} Dictionary with every key containing an Integer correspond to how much [KEY NAME] has passed since the Epoch.
*/
function Elapsed_Time(Unix) {
	return { // The ints are required because otherwise we have a trailing ".X"
		"Years": Math.floor(Unix / 31557600),
		"Months": Math.floor((Unix / 2629800) % 12),
		"Days": Math.floor((Unix / 86400) % 30.4375),

		"Hours": Math.floor((Unix / 3600) % 24),
		"Minutes": Math.floor((Unix / 60) % 60),
		"Seconds": Math.floor(Unix % 60),

		// It gets ugly here
		"Milliseconds": Math.floor((Unix - Math.floor(Unix))*1000),
		"Microseconds": Math.floor(
			Math.floor(
				(
					(
						(Unix - Math.floor(Unix))*1000 - Math.floor((Unix - Math.floor(Unix))*1000)
					)
				)*1000
			)
		),
		"Nanoseconds": Math.floor(
			(
				(
					(
						(
							(Unix - Math.floor(Unix))*1000 - Math.floor((Unix - Math.floor(Unix))*1000)
						)
					)*1000
				)
				-
				Math.floor(
					(
						(
							(Unix - Math.floor(Unix))*1000 - Math.floor((Unix - Math.floor(Unix))*1000)
						)
					)*1000
				)
			)*100

		)
	};
};



/**
	Gives a dynamically sized string of the amount of time passed.

	Arguments:
		@param {Number} Time How much time has passed passed.
		@param {String} Delimiter What should separate each unit.
		@param {Boolean} Show_Bigger Should we still display units that are bigger than the smallest unit available?
		@param {Number} Show_Bigger_Starting At what "Unit Power" we should start displaying the time passed, even if the specified `Time` is too small to naturally display the unit.
		@param {Number} Show_Starting At what "Unit Power" we should start displaying the time passed.
		@param {Boolean} Show_Smaller Should we still display units that are smaller than the smallest unit available?
		@param {Number} Show_Until Until what "Unit Power" we should display the time passed.
		@param {Number} Trailing_Starting At what "Unit Power" we should start adding trailing Zeros.
		@param {Boolean} Display_Units Allow the display of units.
		@param {Boolean} Display_Units_Long Display full length units instead of just their short name.

	Returns:
		@returns {String} The amount of time that has passed in the format "X{Unit}{Delimiter}".

	Examples:
		>>> Time.Elapsed_String(69420, ":", Display_Units=False)
		"19:17:00"
*/
function Elapsed_String(
		Time,
		Delimiter = ", ",
		Show_Bigger = False, Show_Bigger_Starting = 2,
		Show_Starting = 6, Show_Smaller = True,
		Show_Until = 0,
		Trailing_Starting = 2,
		Display_Units = True, Display_Units_Long = False
	) {
	var Time_Dict = Elapsed_Time(Time);
	var Dynamic_String = "";

	var [Biggest_Unit, Smallest_Unit] = Unit_Edges(Time_Dict);
	if (Show_Smaller) { Smallest_Unit = Show_Until };

	Time_Dict.keys().forEach(k => {
		var Power = Unit_Power[k]; var Display = False;
		
		if (Time_Dict[k] != 0) { Display = True; }
		if (Show_Bigger && (Show_Bigger_Starting >= Power)) { Display = True; };
		if (Show_Smaller && (Biggest_Unit >= Power)) { Display = True; };
		if (Show_Starting < Power) { Display = False; };
		if (Show_Until > Power) { Display = False; };
		//console.log(`${Key}: ${Display} | Trailing: ${String.Trailing_Zero(Time_Dict[Key])}`);
		if (Display) {
			var Suffix = ((Power) != Smallest_Unit) ? Delimiter : "";
			
			// Tried my best to make this slightly readable, pretty sure I failed.
			Dynamic_String +=
`${
	(Trailing_Starting >= Power)
	?
	(
		(!["Milliseconds", "Microseconds", "Nanoseconds"].has(k))
		?
		String.Trailing_Zero(Time_Dict[k])
		:
		String.Trailing_Zero(Time_Dict[k], 4)
	)
	:
	Time_Dict[k]
}
${
	(Display_Units)
	?
	(
		(Display_Units_Long)
		?
		' ' + (
			(Time_Dict[k] > 1)
			?
			k.lower()
			:
			k.lower().slice(0, -1)
		)
		:
		Unit_Short[k]
	)
	:
	""
	}
	${Suffix}`;
		};
	});

	return Dynamic_String;
};





/***
	Get how much time has passed according to the passed string.

	Arguments:
		@param {String} Text A string in the format "X{Unit_Short} [...]".

	Returns:
		@returns {Number} The amount of time that has passed.

	Raises:
		ValueError: If the unit is invalid, this exception will get raised.

	Examples:
		>>> Time.String_Time("1D 1h");
		90000
*/
function String_Time(Text) {
	const DIGITS = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", ","];
	var Timestamp = 0;

	var Numbers = Text.split(" ");

	Numbers.forEach(n => {
		for (let i = 0; i < n.length; i++) {
			const char = n[i];
			if (!DIGITS.has(har)) {
				let T_Unit = n.slice(i);
				let T_Number = NumberString_Time(n.slice(0, i));
				switch (T_Unit) {
					case "Y": Timestamp += T_Number*31557600; break;
					case "M": Timestamp += T_Number*2629800; break;
					case "D": Timestamp += T_Number*86400; break;
					case "h": Timestamp += T_Number*3600; break;
					case "m": Timestamp += T_Number*60; break;
					case "s": Timestamp += T_Number; break;
					case "ms": Timestamp += T_Number/1000; break;
					case "µs": Timestamp += T_Number/10**6; break;
					case "ns": Timestamp += T_Number/10**9; break;
					default: throw `[ValueError] - Invalid Unit \"${T_Unit}\".`; break;
				};
			};
		};
	})
	return Timestamp;
};










// TSNJS Additions
/** Pause execution for x milliseconds. */
function Sleep(ms) {
	return new Promise(r => setTimeout(r, ms));
};










export default {
	Convert_Datetime,
	Convert_Unix,
	Convert_ISO8601,
	Get_Unix,
	Get_Dawn,
	Get_DateStrings,
	Unit_Power,
	Unit_Short,
	Unit_Unix,
	Unit_Edges,
	Elapsed_Time,
	Elapsed_String,
	String_Time,
	Sleep
};