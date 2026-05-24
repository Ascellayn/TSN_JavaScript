export function Date_String() {
	let Date_Object = new Date();
	function Leading_Zero(Number) {
		if (Number < 10) {
			Number = "0" + Number;
		}
		return Number;
	}
	// For some fucking reason, .getMonth starts at 0, not 1. Okay. Good one JavaSuck.
	return `${Date_Object.getFullYear()}/${Leading_Zero(Date_Object.getMonth()+1)}/${Leading_Zero(Date_Object.getDate())} - ${Leading_Zero(Date_Object.getHours())}:${Leading_Zero(Date_Object.getMinutes())}:${Leading_Zero(Date_Object.getSeconds())}:${Leading_Zero(Date_Object.getMilliseconds())}`;
};


export function Sleep(ms) { return new Promise(R => setTimeout(R, ms)); };
