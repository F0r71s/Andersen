const watch = document.querySelector('.stopwatch__displaytime');
const subWatch = document.querySelector('.stopwatch__laptime');
const laplist = document.querySelector(".laps__list");
const totalTime = document.querySelector(".total__time");
const lapsTitle = document.querySelector(".laps__title");
const totalTitle = document.querySelector(".total__title");
const lapTitle = document.querySelector(".lapCounter__title");
const lap = document.querySelector(".lap__list");

const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const contButton = document.querySelector(".cont");
const resetButton = document.querySelector(".reset");
const lapButton = document.querySelector(".lap");

let milliseconds = 0;
let timer;
let subMiliseconds = 0;
let subTimer;
let lapCounter = 0;

function start() {
    watch.classList.remove('paused');
	clearInterval(timer);
	timer = setInterval( () => {
		milliseconds += 10;
		let timer = new Date(milliseconds);
		watch.textContent =
			('0'+timer.getUTCHours()).slice(-2) + ':' +
			('0'+timer.getUTCMinutes()).slice(-2) + ':' +
			('0'+timer.getUTCSeconds()).slice(-2) + ':' +
			('0'+timer.getUTCMilliseconds()).slice(-3,-1);
	},10);

	startButton.classList.add('invisible');
	stopButton.classList.remove('invisible');
	lapButton.classList.remove('invisible');
};

function startLap() {
    clearInterval(subTimer);
	subTimer = setInterval( () => {
		subMiliseconds += 10;
		let subTimer = new Date(subMiliseconds);
		subWatch.textContent =
			('0'+subTimer.getUTCHours()).slice(-2) + ':' +
			('0'+subTimer.getUTCMinutes()).slice(-2) + ':' +
			('0'+subTimer.getUTCSeconds()).slice(-2) + ':' +
			('0'+subTimer.getUTCMilliseconds()).slice(-3,-1);
	},10);
}

function pause() {
    watch.classList.add('paused');
    clearInterval(timer);
    clearInterval(subTimer);

	stopButton.classList.add('invisible');
	lapButton.classList.add('invisible');
	contButton.classList.remove('invisible');
	resetButton.classList.remove('invisible');
};

function cont() {
    start()
    if (subWatch.textContent) {   
        startLap();
    }

	contButton.classList.add('invisible');
	resetButton.classList.add('invisible');
	stopButton.classList.remove('invisible');
	lapButton.classList.remove('invisible');
}

function reset() {
    if (watch.classList.contains('paused')) {
	    clearInterval(timer);
        clearInterval(subTimer);
	    milliseconds = 0;
        subMiliseconds = 0;
	    watch.textContent = '00:00:00:00';
        subWatch.textContent = ''; 
        laplist.innerHTML = '';
        totalTime.innerHTML = '';
		lap.innerHTML = '';
		lapCounter = 0;

		startButton.classList.remove('invisible');
		contButton.classList.add('invisible');
		resetButton.classList.add('invisible');
		lapsTitle.classList.add('invisible');
		totalTitle.classList.add('invisible');
		lapTitle.classList.add('invisible');
    }
};

function addLap() {
	subMiliseconds = 0;
	startLap()
    if(!laplist.innerHTML) {
        laplist.innerHTML = laplist.innerHTML +`<div class="newLap">${watch.textContent}</div>`;
    } else {
        laplist.innerHTML = laplist.innerHTML +`<div class="newLap">${subWatch.textContent}</div>`;
    }
	lap.innerHTML = lap.innerHTML + `<div class="newLap">${lapCounter += 1}</div>`
    totalTime.innerHTML = totalTime.innerHTML + `<div class="newLap">${watch.textContent}</div>`;

	lapsTitle.classList.remove('invisible')
	totalTitle.classList.remove('invisible')
	lapTitle.classList.remove('invisible')
}


document.querySelector('.start').addEventListener('click', () => start());
document.querySelector('.stop').addEventListener('click', () => pause());
document.querySelector('.reset').addEventListener('click', () => reset());
document.querySelector('.cont').addEventListener('click', () => cont());
document.querySelector(".lap").addEventListener("click", () => addLap())