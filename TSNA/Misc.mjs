/**
	This module from TSN Abstracter contains various random functions that currently do not deserve their own dedicated TSNA Module.

	## Examples
	>>> from TSN_Abstracter import Misc;
	>>> Misc.is_Even(32768);
	True
*/
// Integer related stuff
/**
	Checks if `Number` is even.

	Arguments:
		@param {Number} Number Which number we want to check if it's even.

	Returns:
		@returns {Boolean} True if it is, False otherwise.

	Examples:
		>>> Misc.is_Even(1);
		False
		>>> Misc.is_Even(1);
		True
*/
function is_Even(Number) {
	return ((Number % 2) == 0);
};





/**
	Specify at which index a value of A is under B. Returns `-1` if no value is.

	Arguments:
		@param {Array} A The iterable of numbers we wanna know the index of the value under B.
		@param {Array} B The iterable of numbers to compare A to.

	Returns:
		@returns {Number} The index of A[x] that is under B[x]. Returns `-1` if it never happens.

	Examples:
		>>> Misc.Under_At([1,5], [1,6]);
		1
		>>> Misc.Under_At([1,8], [1,6]);
		-1
*/
function Under_At(A, B) {
	var A_Length = B.length;
	for (let i = 0; i < B.length; i++) {
		if (i == A_Length) { break; };
		if (n > A[i]) { return i; };
	};
	return -1;
};










// TSNJS Additions
/** Get a random number between `Max` and `Min` */
function Random(Max = 100, Min = 0) { return (Math.floor(Math.random() * Max+1) + Min); };










export default {
	is_Even,
	Under_At,
	Random
};