async function Redirect(Link) {
	URL = "https://" + Link;

	A = document.querySelector("a");
	P = document.querySelector("p");
	Timer = document.getElementById("Timer");
	TimerHeader = Timer.querySelector("h1");
	A.href = URL;
	
	P.innerHTML = `The Sirio Network → ${Link[0].toUpperCase() + Link.slice(1)}`;

	TimerHeader.innerHTML = "05"; await sleep(1000);
	TimerHeader.innerHTML = "04"; await sleep(1000);
	TimerHeader.innerHTML = "03"; await sleep(1000);
	TimerHeader.innerHTML = "02"; await sleep(1000);
	TimerHeader.innerHTML = "01"; await sleep(1000);
	
	TimerHeader.innerHTML = "GO"; 
	await sleep(1000);
	window.location.href = URL;
};

var sleepSetTimeout_ctrl; // I have no idea what the fuck this does I randomly copied this somewhere a long time ago
function sleep(ms) { clearInterval(sleepSetTimeout_ctrl); return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms)); };
