/**
	This module from TSN Abstracter is in charge of providing ways to access elements without causing exceptions.

	## Examples
	>>> from TSN_Abstracter import Safe;
	>>> Array: list[str] = ["Arellayn was here"];
	>>> Safe.Index(Array, 0);
	"Arellayn was here"
	>>> Safe.Index(Array, 1);
	None
*/





/**
	Attempts to safely try to read an array's specified index.

	Arguments:
		@param {Array} Array The List that we want to check a specific index.
		@param {Number} Index The Index element we want to read.

	Returns:
		@returns {Object | null}: The returned item can be anything. In the case of a failed read, the return value will always be None.

	Examples:
		>>> Array: list[str] = ["Arellayn was here"];
		>>> Safe.Index(Array, 0);
		"Arellayn was here"
		>>> Safe.Index(Array, 1);
		None
*/
function Index(Array, Index) {
	if (Index > Array.length) { return null; };
	return Array[Index];
};



/**
	Returns the `Number` unless it is 0, in this case we return whatever `Default` is set to.

	Arguments:
		@param {Number} Number Which number we want to check if it's potentially null.
		@param {Number} Default What integer we replace `Number` with.

	Returns:
		@returns {Number} Either `Number` or `Default` depending on if `Number` is equal to zero.

	Examples:
		>>> 69/Safe.NotNull(0);
		69 # The 0 was replaced with a 1, resulting in no Exceptions!
		>>> 420/Safe.NotNull(0, 2);
		210 # 420/2 since a zero is a zero, shocking I know.
*/
function NotNull(Number, Default = 1) {
	return (Number == 0) ? Default : Number;
};



/**
	Safely retrieve the data from a nested dictionary, returns `Default` when the function fails due to a key not existing.

	Arguments:
		@param {Object} Dict The dictionary we wish to retrieve data from its sub-dictionaries.
		@param {Array} Keys A list of key strings we wish to go through in the Dictionary.
		@param {*} Default The value to return when no data from Dict[*Keys] can be retrieved.

	Returns:
		@returns {*} The data from `Dict[Keys[0]][Keys[1]][...]`

	Examples:
		>>> Safe.Nested_Dict({
			"Hello": {
				"ItAppearsThat": "I am very silly"
			}
		}, ["Hello", "ItAppearsThat"]);
		"I am very silly"
		>>> Safe.Nested_Dict({
			"Hello": {
				"ItAppearsThat": "I am very silly"
			}
		}, ["Hello", "WeHaveBeenTryingToReachYouAboutYourCarsExtendedWarranty"], "NO");
		"NO"
*/
function Nested_Dict(Dict, Keys, Default = null) {
	Keys.forEach(k => {
		if (Dict[k] == undefined) { return Default; }; // TSNJS: This looks stupid but that's JS for you
		Dict = Dict[k];
	});
	return Dict;
};










export default {
	Index,
	NotNull,
	Nested_Dict
}