// ==========================
// 90-DAY INTERACTIVE COUNTDOWN LOGIC
// ==========================
const TOTAL_DURATION_MS = 90 * 24 * 60 * 60 * 1000; // Exactly 90 days in milliseconds

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
    // Force a fresh 90-day timer starting precisely right now
    const newEndTime = new Date().getTime() + TOTAL_DURATION_MS;
    setStoredEndTime(newEndTime);
    runInterval(newEndTime);
}

function runInterval(endTime) {
    stopCountdown(); // Clear any existing ticker
    updateDisplay(endTime); // Update immediately so there's no 1-second delay
    
    countdownInterval = setInterval(() => {
        updateDisplay(endTime);
    }, 1000); // Tick every second reliably
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
    
    // Reset display back to default 90 days
    document.getElementById("days-count").textContent = "90";
    document.getElementById("hours-count").textContent = "00";
    document.getElementById("minutes-count").textContent = "00";
    document.getElementById("seconds-count").textContent = "00";
}

// Automatically pick up saved state when loaded in Notion
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
