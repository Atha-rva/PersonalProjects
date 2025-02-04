// Select Elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Variables to track calculation state
let currentInput = "";
let previousInput = "";
let operator = null;

// Update the display
function updateDisplay(value) {
  display.textContent = value || "0";
}

// Clear all inputs
function clearCalculator() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay("");
}

// Perform calculation based on the operator
function calculate() {
  if (operator && previousInput !== "" && currentInput !== "") {
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);

    switch (operator) {
      case "+":
        currentInput = (a + b).toString();
        break;
      case "-":
        currentInput = (a - b).toString();
        break;
      case "*":
        currentInput = (a * b).toString();
        break;
      case "/":
        currentInput = b !== 0 ? (a / b).toString() : "Error";
        break;
    }
    operator = null;
    previousInput = "";
    updateDisplay(currentInput);
  }
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("number")) {
      // Append number to current input
      if (value === "." && currentInput.includes(".")) return;
      currentInput += value;
      updateDisplay(currentInput);
    } else if (button.classList.contains("operator")) {
      // Save the operator and move current input to previous input
      if (operator && currentInput !== "") {
        calculate();
      }
      operator = value;
      previousInput = currentInput;
      currentInput = "";
    } else if (value === "C") {
      clearCalculator();
    } else if (value === "=") {
      calculate();
    }
  });
});
