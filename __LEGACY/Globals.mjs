// DOM
var Body, Background, Root, Base, Floating;

Body = document.body;
Background = document.getElementById("Background");
Root = document.getElementById("Root");
Base = document.getElementById("Base");
Floating = document.getElementById("Floating");



// Other
const Nested = window.self !== window.top;
let Generic = {};
Generic["Notification_Slots"] = [];
Generic["Default_BG"] = true;

export function Generic_Modify(Key, Value) {
	Generic[Key] = Value;
};


export {
	Body, Background, Root, Base, Floating,
	Nested, Generic
};

window.SNJS = Object;
window.SNJS.Body = Body;
window.SNJS.Background = Background;
window.SNJS.Root = Root;
window.SNJS.Base = Base;
window.SNJS.Floating = Floating;