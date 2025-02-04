document.addEventListener("DOMContentLoaded", () => {
  const hoursInput = document.getElementById("hours");
  const minutesInput = document.getElementById("minutes");
  const secondsInput = document.getElementById("seconds");
  const startButton = document.getElementById("start-timer");
  const timerDisplay = document.getElementById("timer-display");
  const timerMessage = document.getElementById("timer-message");
  const bellSound = document.getElementById("bell-sound");

  let timerInterval;

  const startTimer = () => {
    const hours = parseInt(hoursInput.value, 10) || 0;
    const minutes = parseInt(minutesInput.value, 10) || 0;
    const seconds = parseInt(secondsInput.value, 10) || 0;

    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalTimeInSeconds <= 0) {
      alert("Please enter a valid time.");
      return;
    }

    timerMessage.textContent = "";
    updateDisplay(totalTimeInSeconds);

    clearInterval(timerInterval);
    let timeRemaining = totalTimeInSeconds;

    timerInterval = setInterval(() => {
      timeRemaining--;

      updateDisplay(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        timerMessage.textContent = "Time's Up!";
        bellSound.play();
      }
    }, 1000);
  };

  const updateDisplay = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
  };

  startButton.addEventListener("click", startTimer);
});
