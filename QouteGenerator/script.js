// Quotes array
const quotes = [
    "The best way to predict the future is to create it. – Peter Drucker",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "Act as if what you do makes a difference. It does. – William James",
    "It always seems impossible until it’s done. – Nelson Mandela",
    "Dream big and dare to fail. – Norman Vaughan",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson"
  ];
  
  // DOM Elements
  const quoteElement = document.getElementById("quote");
  const generateButton = document.getElementById("generate-btn");
  const copyButton = document.getElementById("copy-btn");
  
  // Generate Random Quote
  function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
  }
  
  // Copy Quote to Clipboard
  function copyToClipboard() {
    const quoteText = quoteElement.textContent;
    navigator.clipboard.writeText(quoteText).then(() => {
      alert("Quote copied to clipboard!");
    }).catch(err => {
      alert("Failed to copy the quote. Try again.");
      console.error(err);
    });
  }
  
  // Event Listeners
  generateButton.addEventListener("click", generateQuote);
  copyButton.addEventListener("click", copyToClipboard);
  