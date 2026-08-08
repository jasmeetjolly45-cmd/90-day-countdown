// ==========================
// CONFIGURATION: SET YOUR SEASON END DATE HERE (YYYY-MM-DD)
// ==========================
const SEASON_END_DATE = "2026-11-06"; 

function updateCountdown() {
    const countElement = document.getElementById("days-count");
    
    // Parse target date (set to midnight local time)
    const targetDate = new Date(SEASON_END_DATE + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate difference in full days
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
        countElement.textContent = diffDays;
    } else if (diffDays === 0) {
        countElement.textContent = "0";
    } else {
        // Tasteful message when season completes
        countElement.style.fontSize = "26px";
        countElement.style.letterSpacing = "1px";
        countElement.style.padding = "10px 0";
        countElement.textContent = "Season Complete";
    }
}

// Run on load
updateCountdown();
