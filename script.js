// ==========================
// CONFIGURATION: SET YOUR SEASON END DATE HERE (YYYY-MM-DD)
// ==========================
const SEASON_END_DATE = "2026-11-06"; 

let countdownInterval = null;

function calculateDays() {
    const targetDate = new Date(SEASON_END_DATE + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = targetDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function updateDisplay(days) {
    const countElement = document.getElementById("days-count");
    
    if (days > 0) {
        countElement.style.fontSize = "64px";
        countElement.textContent = days;
    } else if (days === 0) {
        countElement.style.fontSize = "64px";
        countElement.textContent = "0";
    } else {
        countElement.style.fontSize = "22px";
        countElement.style.letterSpacing = "1px";
        countElement.textContent = "Season Complete";
    }
}

function startCountdown() {
    // Run immediately, then check daily
    updateDisplay(calculateDays());
    
    if (!countdownInterval) {
        countdownInterval = setInterval(() => {
            updateDisplay(calculateDays());
        }, 1000 * 60 * 60); // Check every hour
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
    updateDisplay(calculateDays());
}

// Automatically start tracking when loaded
startCountdown();
