// ==========================
// 90-DAY INTERACTIVE COUNTDOWN LOGIC
// ==========================
const TOTAL_DAYS = 90;
const TOTAL_DURATION_MS = TOTAL_DAYS * 24 * 60 * 60 * 1000; // 90 days in milliseconds

let countdownInterval = null;

function getStoredEndTime() {
    return localStorage.getItem("season_end_time");
}

function setStoredEndTime(time) {
    localStorage.setItem("season_end_time", time);
}

function updateDisplay(endTime) {
    const now = new Date().getTime();
    const diffTime = endTime - now;

    const daysElement = document.getElementById("days-count");
    const hoursElement = document.getElementById("hours-count");
    const minutesElement = document.getElementById("minutes-count");
    const secondsElement = document.getElementById("seconds-count");

    if (diffTime > 0) {
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        daysElement.textContent = days;
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    } else {
        daysElement.textContent = "0";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        stopCountdown();
    }
}

function startCountdownBtn() {
    // Sets a fresh 90-day target starting right now
    const newEndTime = new Date().getTime() + TOTAL_DURATION_MS;
    setStoredEndTime(newEndTime);
    
    runInterval(newEndTime);
}

function runInterval(endTime) {
    stopCountdown(); // Clear any existing timer
    updateDisplay(endTime);
    
    countdownInterval = setInterval(() => {
        updateDisplay(endTime);
    }, 1000); // Tick every second
}

function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

function resetCountdown() {
    stopCountdown();
    localStorage.removeItem("season_end_time");
    
    // Reset back to initial default state (90 days, 00 hours, 00 mins, 00 secs)
    document.getElementById("days-count").textContent = TOTAL_DAYS;
    document.getElementById("hours-count").textContent = "00";
    document.getElementById("minutes-count").textContent = "00";
    document.getElementById("seconds-count").textContent = "00";
}

// On page load, check if a countdown was already running
window.onload = function() {
    const savedEndTime = getStoredEndTime();
    if (savedEndTime) {
        const now = new Date().getTime();
        if (savedEndTime > now) {
            runInterval(parseInt(savedEndTime));
        } else {
            resetCountdown();
        }
    }
};
