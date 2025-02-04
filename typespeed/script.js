// Array of random paragraphs
const paragraphs = [
  `Typing is an essential skill in the modern digital world. From writing emails to coding complex algorithms, typing quickly and accurately can save time and improve productivity. Developing typing skills is not just about speed; it's also about maintaining accuracy under pressure. The ability to type without looking at the keyboard, known as touch typing, can significantly enhance your efficiency.`,

  `The beauty of nature is unparalleled. From towering mountains to deep blue oceans, the world is full of breathtaking landscapes. The sound of rustling leaves and the chirping of birds creates a peaceful environment. Spending time in nature can help reduce stress, boost creativity, and improve overall well-being.`,

  `Technology has revolutionized the way we live, work, and communicate. Smartphones, the internet, and artificial intelligence have made information more accessible than ever. However, the rapid pace of technological advancements also raises ethical questions about privacy and the use of data. Striking a balance between innovation and ethics is crucial for sustainable progress.`,

  `The art of storytelling has existed for centuries, evolving with each generation. From oral traditions to written texts and now digital platforms, storytelling remains a powerful tool for sharing knowledge and connecting people. Whether it's a novel, a movie, or a podcast, a good story has the power to inspire, educate, and entertain.`,

  `Healthy living requires a balance of physical activity, a nutritious diet, and mental well-being. Regular exercise strengthens the body, while a diet rich in fruits and vegetables provides essential nutrients. Equally important is taking care of mental health by practicing mindfulness, managing stress, and building strong relationships with friends and family.`,
];

// Function to get a random paragraph
function getRandomParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[randomIndex];
}

// Select DOM elements
const textToType = document.getElementById("text-to-type");
const typingArea = document.getElementById("typing-area");
const timerDisplay = document.getElementById("timer");
const wordCountDisplay = document.getElementById("word-count");
const accuracyDisplay = document.getElementById("accuracy");
const restartButton = document.getElementById("restart-btn");

// Test content and variables
let timer = 60;
let timerRunning = false;
let interval;
let wordsTyped = 0;
let correctChars = 0;

// Initialize the test
function initializeTest() {
  timer = 60;
  timerRunning = false;
  wordsTyped = 0;
  correctChars = 0;

  typingArea.value = "";
  typingArea.disabled = false;

  // Pick a random paragraph for the test
  const randomText = getRandomParagraph();
  textToType.innerHTML = getHighlightedText("", randomText);

  timerDisplay.textContent = timer;
  wordCountDisplay.textContent = wordsTyped;
  accuracyDisplay.textContent = "100";

  typingArea.focus();
}

// Start the timer
function startTimer() {
  if (!timerRunning) {
    timerRunning = true;
    interval = setInterval(() => {
      timer--;
      timerDisplay.textContent = timer;

      if (timer === 0) {
        clearInterval(interval);
        endTest();
      }
    }, 1000);
  }
}

// Generate highlighted text
function getHighlightedText(typed, original) {
  let highlightedText = "";
  for (let i = 0; i < original.length; i++) {
    const char = original[i];
    const typedChar = typed[i] || "";
    if (typedChar === char) {
      highlightedText += `<span class="correct">${char}</span>`;
    } else if (typedChar !== "") {
      highlightedText += `<span class="incorrect">${char}</span>`;
    } else {
      highlightedText += char;
    }
  }
  return highlightedText;
}

// Update the highlighted text and stats
function updateText() {
  const typedText = typingArea.value;
  const correctText = textToType.innerText.slice(0, typedText.length);

  // Update highlights
  textToType.innerHTML = getHighlightedText(typedText, textToType.innerText);

  // Update stats
  const typedWords = typedText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
  wordsTyped = typedWords;

  correctChars = typedText
    .split("")
    .filter((char, i) => char === correctText[i]).length;
  const accuracy = (correctChars / typedText.length) * 100 || 0;

  wordCountDisplay.textContent = wordsTyped;
  accuracyDisplay.textContent = Math.round(accuracy);
}

// End the test
function endTest() {
  typingArea.disabled = true;
  alert(
    `Time's up! You typed ${wordsTyped} words with ${accuracyDisplay.textContent}% accuracy.`
  );
}

// Event listeners
typingArea.addEventListener("input", () => {
  startTimer();
  updateText();
});

restartButton.addEventListener("click", initializeTest);

// Initialize on load
initializeTest();
