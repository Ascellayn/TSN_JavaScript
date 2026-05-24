/**
	This module from TSN Abstracter is in charge of providing Python Decorators, mostly to time the execution of functions or doing light processing.

	### Examples
	>>> from TSN_Abstracter import Deco;
	>>> X = [...]
	>>> P = Deco.Progresser(len(X));
	>>> for y in X:
	>>>	...
	>>>	P.Count();
*/
import Time from "./Time.mjs";
import Log from "./Log.mjs";
import Safe from "./Safe.mjs";





/**
	Automatic carriage-based progression display, if you have a task that has a set amount of operations to do this will be useful to show the progression of it.
	TSNJS: WARNING - Does not use Carriage Returns for JS TSNA

	Arguments:
		@param {Number} Size The amount of total tasks to complete.
		@param {String} Template The format of the progression text.
		@param {Number} Delay The __*minimum*__ delay before the progresser has a chance to display its text.

	## Methods:
		@method Count() → Increment the Progresser, automatically displays the text whenever applicable.

	### PLACEHOLDERS:
		`Progresser()` supports placeholders in the `Template` variable to slightly customize the look of the progression text.
		- `{Done}` → How many tasks have been completed.
		- `{Size}` → How many tasks there is to complete in total.
		- `{Operations}` → The amount of completed tasks done every second.
		- `{ETA}` → An estimation of when all tasks will be finished.
*/
class Progresser {
	constructor(Size, Template = "Progression: {Done}/{Size} - ({Operations} OP/s) | ETA: {ETA}", Delay = 1) {
		this.Size = Size;
		this.Delay = Delay;
		this.Template = Template;

		this.Done = 0;
		this.Done_Cycle = 0;
		this.Cycles = []; // list[int]

		this.__Precise = ((Delay - Math.floor(Delay)) != Delay) ? True : false;
		this._Unix_Last = Time.Get_Unix(this.__Precise);
	};



	/** Retrieve the text to print out */
	__Text() {
		var OPs = Math.round(
			(
				this.Cycles.reduce((a, b) => a + b, 0)
				/
				Safe.NotNull(this.Cycles.length)
			)
			/
			Safe.NotNull(this.Delay)
			, 2
		);

		var ETA = Time.Elapsed_String(
			Math.round(
				this.Size / OPs
			),
		);

		return this.Template
.replace("{Done}", String(this.Done))
.replace("{Size}", String(this.Size))
.replace("{Operations}", String(OPs))
.replace("{ETA}", String(ETA));
	};





	/**
		Increment the progression counter. Automatically displays progress whenever applicable.

		Arguments:
			@param {Number} Increment The amount of tasks to add as complete.
	 */
	Count(Increment = 1) {
		this.Done += Increment; this.Done_Cycle += Increment;
		if ((this._Unix_Last + this.Delay) > Time.Get_Unix(this.__Precise)) { return; };

		this.Cycles.push(this.Done_Cycle);
		this.Done_Cycle = 0;
		this._Unix_Last = Time.Get_Unix(this.__Precise);

		Log.Info(this.__Text()); // Carriage returns are unsupported in JS Console so, standard Log it is.
	};
};










export default {
	Progresser
}