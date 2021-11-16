let startButton = document.querySelector('.start');
let stopButton = document.querySelector('.stop');
let resetButton = document.querySelector('.reset');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

let timerInterval;

let minuteContainer = document.getElementById('minute');
let secondContainer = document.getElementById('second');

var minute = parseInt(minuteContainer.innerText);
var second = parseInt(secondContainer.innerText);

let inputTime = document.getElementById('timeInput');
inputTime.addEventListener('change', updateInterval);

function updateInterval(e) {
    let time  = `${returnData(e.target.value)}:${returnData(0)}`;
    storeTimer("time", time);
    updateDisplay(time);
}

function startTimer() {
    timerInterval = setInterval(() => {timer(); }, 1000);
    toogleVisibility(inputTime, false);
}

function stopTimer() {
    clearInterval(timerInterval);
    localStorage.removeItem('dateInMS');
}

function resetTimer() {
    minute = 0;
    second = 0;
    document.getElementById('minute').innerText =  returnData(minute);
    document.getElementById('second').innerText =  returnData(second);
    clearInterval(timerInterval);
    toogleVisibility(inputTime, true);
    localStorage.removeItem('dateInMS');
}

function timer() {
    if (minute <= 0 && second <= 0) {
        resetTimer();
    } else if (second == 0) {
        minute --;
        second = 59;
    } else {
        second --;
    }
    let time = `${returnData(minute)}:${returnData(second)}`;
    storeTimer("time", time);
    updateDisplay(time);  

    localStorage.setItem("dateInMS", Date.now());
}

function returnData(data) {
    return data >= 10 ? data : `0${data}`;
}

function toogleVisibility(element, resetTimer)  {
    if (element.style.display === "none" && resetTimer) {
        element.style.display = "inline";
    } else if(!resetTimer){
        element.style.display = "none";
    }
}

// intializing the timer 
function initialize() {
    var gettingStoredValue = browser.storage.local.get(null);
    gettingStoredValue.then((results) => {
    var key = Object.keys(results);
    var storedTime = results[key];
    updateDisplay(storedTime);
    if (localStorage.getItem("dateInMS") != null) {
        var oldTime = localStorage.getItem("dateInMS");
        getNewTime(oldTime);
    }
    }, onError);   
}

function getNewTime(oldTime) {
    let timePassed = Math.floor((Date.now() - oldTime) / 1000);
    let secondPassed = timePassed % 60;
    second = second - secondPassed;
    second = second > 0 ? second : 59 + second;
    secondContainer.innerText = returnData(second);

    startTimer();
}


function updateDisplay(storedTime) {
    let minuteAndSecond = storedTime.split(":");
    
    minuteContainer.innerText = minuteAndSecond[0];
    secondContainer.innerText = minuteAndSecond[1];

    minute = parseInt(minuteAndSecond[0]);
    second = parseInt(minuteAndSecond[1]);
}

function storeTimer(title, value) {
    browser.storage.local.clear();
    var storingTime = browser.storage.local.set({title : value});
}

/* generic error handler */
function onError(error) {
    console.log(error);
}

window.onload = (event) => {
    initialize();
  };