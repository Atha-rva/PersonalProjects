// Select Elements
const colorInput = document.getElementById("color-input");
const colorCode = document.getElementById("color-code");
const applyColorButton = document.getElementById("apply-color");
const colorDisplay = document.getElementById("color-display");
const hexValue = document.getElementById("hex-value");
const rgbValue = document.getElementById("rgb-value");

// Helper: Convert Hex to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

// Helper: Validate Hex or RGB
function isValidColor(value) {
  const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  return hexRegex.test(value) || rgbRegex.test(value);
}

// Update UI with selected color
function updateColor(color) {
  colorDisplay.style.backgroundColor = color;
  if (color.startsWith("#")) {
    hexValue.textContent = color;
    rgbValue.textContent = hexToRgb(color);
  } else {
    rgbValue.textContent = color;
    const [r, g, b] = color.match(/\d+/g).map(Number);
    hexValue.textContent = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)}`;
  }
}

// Event: Color Picker Input
colorInput.addEventListener("input", (e) => {
  const selectedColor = e.target.value;
  colorCode.value = selectedColor;
  updateColor(selectedColor);
});

// Event: Apply Button
applyColorButton.addEventListener("click", () => {
  const inputColor = colorCode.value.trim();
  if (isValidColor(inputColor)) {
    updateColor(inputColor);
  } else {
    alert("Please enter a valid hex or RGB color value!");
  }
});
