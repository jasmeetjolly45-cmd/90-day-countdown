// ==========================
// CONFIGURATION: SET YOUR SEASON END DATE HERE (YYYY-MM-DD)
// ==========================
const SEASON_END_DATE = "2026-11-06"; 

let countdownInterval = null;

function updateCountdown() {
    const targetDate = new Date(SEASON_END_DATE + "T00:00:00");
    const now = new Date();
    const diffTime = targetDate - now;

    const daysElement = document.getElementById("days-count");
    const hoursElement = document.getElementById("hours-count");
    const minutesElement = document.getElementById("minutes-count");

    if (diffTime > 0) {
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

        daysElement.textContent = days;
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
    } else {
        daysElement.textContent = "0";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        stopCountdown();
    }
}

function startCountdown() {
    updateCountdown();
    if (!countdownInterval) {
        countdownInterval = setInterval(updateCountdown, 1000 * 30); // Update every 30 seconds
    }
}

function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

function resetCountdown() {
    stopCountdown();
    updateCountdown();
}

// Automatically start tracking when loaded
startCountdown();
