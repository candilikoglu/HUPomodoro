let startButton = document.querySelector('.start');
let stopButton = document.querySelector('.stop');
let resetButton = document.querySelector('.reset');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

let timerInterval;

let minuteContainer = document.getElementById('minute');
let secondContainer = document.getElementById('second');

let minute = parseInt(minuteContainer.innerText);
let second = parseInt(secondContainer.innerText);

let inputTime = document.getElementById('timeInput');
inputTime.addEventListener('change', updateInterval);

function updateInterval(e) {
    minuteContainer.innerHTML = e.target.value;
    minute = parseInt(minuteContainer.innerText);
}

function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {timer(); }, 1000);

    toogleVisibility(inputTime, false);
    
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    minute = inputTime.value;
    second = 0;
    document.getElementById('minute').innerText = inputTime.value;
    document.getElementById('second').innerText = '00';
    clearInterval(timerInterval);

    toogleVisibility(inputTime, true);
}

function timer() {
    if (minute <= 0 && second <= 0) {
        stopTimer();
    } else if (second == 0) {
        minute --;
        second = 59;
    } else {
        second --;
    }

    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
}

function returnData(data) {
    return data > 10 ? data : `0${data}`;
}

function toogleVisibility(element, resetTimer)  {
    if (element.style.display === "none" && resetTimer) {
        element.style.display = "block";
    } else if(!resetTimer){
        element.style.display = "none";
    }  
}