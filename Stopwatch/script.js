class StopwatchLogic {
    constructor() {
        this.milliseconds = 0;
        this.subMiliseconds = 0;
        this.lapCount = 0;
        this.subTimer;
        this.timer;
    }

    start() {
        clearInterval(this.timer);
        this.timer = setInterval( () => {
            this.milliseconds += 10;
            let timer = new Date(this.milliseconds);
            this.watch.textContent =
                ('0'+timer.getUTCHours()).slice(-2) + ':' +
                ('0'+timer.getUTCMinutes()).slice(-2) + ':' +
                ('0'+timer.getUTCSeconds()).slice(-2) + ':' +
                ('0'+timer.getUTCMilliseconds()/10).slice(-2);
        },10);
    
        this.startButton.classList.add('invisible');
        this.stopButton.classList.remove('invisible');
        this.lapButton.classList.remove('invisible');
    };
    
    startLap() {
        clearInterval(this.subTimer);
        this.subTimer = setInterval( () => {
            this.subMiliseconds += 10;
            let subTimer = new Date(this.subMiliseconds);
            this.subWatch.textContent =
                ('0'+subTimer.getUTCHours()).slice(-2) + ':' +
                ('0'+subTimer.getUTCMinutes()).slice(-2) + ':' +
                ('0'+subTimer.getUTCSeconds()).slice(-2) + ':' +
                ('0'+subTimer.getUTCMilliseconds()/10).slice(-2);
        },10);
    }
    
    pause() {
        clearInterval(this.timer);
        clearInterval(this.subTimer);
    
        this.stopButton.classList.add('invisible');
        this.lapButton.classList.add('invisible');
        this.contButton.classList.remove('invisible');
        this.resetButton.classList.remove('invisible');
    };
    
    cont() {
        this.start()
        if (this.subWatch.textContent) {   
            this.startLap();
        }
    
        this.contButton.classList.add('invisible');
        this.resetButton.classList.add('invisible');
        this.stopButton.classList.remove('invisible');
        this.lapButton.classList.remove('invisible');
    }
    
    reset() {
            clearInterval(this.timer);
            clearInterval(this.subTimer);
            this.milliseconds = 0;
            this.subMiliseconds = 0;
            this.watch.textContent = '00:00:00:00';
            this.subWatch.textContent = ''; 
            this.lapList.innerHTML = '';
            this.totalTime.innerHTML = '';
            this.lapsList.innerHTML = '';
            this.lapCount = 0;
    
            this.startButton.classList.remove('invisible');
            this.contButton.classList.add('invisible');
            this.resetButton.classList.add('invisible');
            this.lapsTitle.classList.add('invisible');
            this.totalTitle.classList.add('invisible');
            this.lapTitle.classList.add('invisible');
    };
    
    addLap() {
        this.subMiliseconds = 0;
        this.startLap()
        if(!this.lapsList.innerHTML) {
            this.lapsList.innerHTML = this.lapsList.innerHTML +`<div class="newLap">${this.watch.textContent}</div>`;
        } else {
            this.lapsList.innerHTML = this.lapsList.innerHTML +`<div class="newLap">${this.subWatch.textContent}</div>`;
        }
        this.lapList.innerHTML = this.lapList.innerHTML + `<div class="newLap">${this.lapCount += 1}</div>`
        this.totalTime.innerHTML = this.totalTime.innerHTML + `<div class="newLap">${this.watch.textContent}</div>`;
    
        this.lapsTitle.classList.remove('invisible')
        this.totalTitle.classList.remove('invisible')
        this.lapTitle.classList.remove('invisible')
    }
}

class Stopwatch extends StopwatchLogic {
    constructor() {
        super()
        this.stopwatches = document.querySelector('.stopwatches');
        this.stopwatch = document.createElement('div');
        this.watch = document.createElement('h2');
        this.subWatch = document.createElement('h3');
        this.stopwatchInfo = document.createElement('div');
        this.lapCounter = document.createElement('div');
        this.laps = document.createElement('div');
        this.total = document.createElement('div');
        this.lapTitle = document.createElement("h4");
        this.lapsTitle = document.createElement("h4");
        this.totalTitle = document.createElement("h4");
        this.lapList = document.createElement("div");
        this.lapsList = document.createElement("div");
        this.totalTime = document.createElement("div");
        this.stopwatchButtons = document.createElement('div')
        this.startButton = document.createElement("button");
        this.stopButton = document.createElement("button");
        this.contButton = document.createElement("button");
        this.resetButton = document.createElement("button");
        this.lapButton = document.createElement("button");
    }
    render() {
        this.stopwatch.classList.add('stopwatch')
        this.watch.classList.add('stopwatch__displaytime')
        this.subWatch.classList.add('stopwatch__laptime')
        this.stopwatchInfo.classList.add('stopwatch__info')
        this.lapCounter.classList.add('lapCounter')
        this.laps.classList.add('laps')
        this.total.classList.add('total')
        this.lapTitle.classList.add('lapCounter__title', 'invisible')
        this.lapsTitle.classList.add('laps__title', 'invisible')
        this.totalTitle.classList.add('total__title', 'invisible')
        this.lapList.classList.add('lap__list')
        this.lapsList.classList.add('laps__list')
        this.totalTime.classList.add('total__time')

        this.stopwatchButtons.classList.add('stopwatch__buttons')
        this.startButton.classList.add('start', 'button');
        this.stopButton.classList.add('stop', 'button', 'invisible');
        this.contButton.classList.add('cont', 'button', 'invisible');
        this.resetButton.classList.add('reset', 'button', 'invisible');
        this.lapButton.classList.add('lap', 'button', 'invisible');

        this.watch.textContent = '00:00:00:00';
        this.lapTitle.textContent = 'Lap';
        this.lapsTitle.textContent = 'Lap Time';
        this.totalTitle.textContent = 'Total Time';

        this.startButton.textContent = 'start';
        this.stopButton.textContent = 'stop';
        this.contButton.textContent = 'continue';
        this.resetButton.textContent = 'reset';
        this.lapButton.textContent = 'lap';

        this.lapCounter.append(this.lapTitle, this.lapList);
        this.laps.append(this.lapsTitle, this.lapsList);
        this.total.append(this.totalTitle, this.totalTime);
        this.stopwatchInfo.append(this.lapCounter, this.laps, this.total);
        this.stopwatchButtons.append(this.startButton, this.stopButton, this.contButton, this.resetButton, this.lapButton);
        this.stopwatch.append(this.watch, this.subWatch, this.stopwatchInfo, this.stopwatchButtons);
        this.stopwatches.append(this.stopwatch);

        this.startButton.addEventListener('click', this.start.bind(this));
        this.stopButton.addEventListener('click', this.pause.bind(this));
        this.contButton.addEventListener('click', this.cont.bind(this));
        this.resetButton.addEventListener('click', this.reset.bind(this));
        this.lapButton.addEventListener("click", this.addLap.bind(this))
    }
}
const addButton = document.querySelector('.addSW')
addButton.addEventListener('click', function() {
   new Stopwatch().render()
})