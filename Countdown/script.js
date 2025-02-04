// Set the event date (for example, New Year's)
const eventDate = new Date("January 1, 2025 00:00:00").getTime();

// Function to update the countdown
function updateCountdown() {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the difference between the event date and now
  const timeDifference = eventDate - now;

  // Time calculations for days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Display the countdown
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // If the countdown is over, display a message
  if (timeDifference < 0) {
    clearInterval(interval); // Stop the countdown
    document.getElementById("countdown").innerHTML =
      "<h2>Event has started!</h2>";
  }
}

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);

// Initialize the countdown
updateCountdown();
