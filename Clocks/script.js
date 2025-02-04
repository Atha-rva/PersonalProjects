// Select elements
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const toggleDarkModeButton = document.getElementById("toggle-dark-mode");

// Update time and date
function updateClock() {
  const now = new Date();
  
  // Format time as HH:MM:SS
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  
  // Format date as Day, Month DD, YYYY
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = now.toLocaleDateString(undefined, options);
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Event Listener for Dark Mode Toggle
toggleDarkModeButton.addEventListener("click", toggleDarkMode);

// Start the clock
setInterval(updateClock, 1000);
updateClock(); // Initialize clock immediately
