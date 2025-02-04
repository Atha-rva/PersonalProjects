const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correct: 0,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correct: 1,
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1,
    },
  ];
  
  const quizBox = document.getElementById("quiz-box");
  const nextButton = document.getElementById("next-button");
  const finishButton = document.getElementById("finish-button");
  const resultBox = document.getElementById("result");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let selectedAnswer = null;
  
  // Display question
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizBox.innerHTML = `
      <h2>${currentQuestion.question}</h2>
      <ul>
        ${currentQuestion.options
          .map(
            (option, index) =>
              `<li><label><input type="radio" name="answer" value="${index}"> ${option}</label></li>`
          )
          .join("")}
      </ul>
    `;
  }
  
  // Check answer and move to the next question
  function handleNext() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
      alert("Please select an answer!");
      return;
    }
  
    selectedAnswer = parseInt(selectedOption.value);
  
    if (selectedAnswer === quizData[currentQuestionIndex].correct) {
      score++;
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      nextButton.style.display = "none";
      finishButton.style.display = "inline-block";
    }
  }
  
  // Display results
  function handleFinish() {
    quizBox.style.display = "none";
    finishButton.style.display = "none";
  
    let resultHTML = `<p>You scored ${score} out of ${quizData.length}.</p>`;
    resultHTML += `<h3>Correct Answers:</h3><ul>`;
    quizData.forEach((item, index) => {
      resultHTML += `<li>${item.question} - <span class="correct">${item.options[item.correct]}</span></li>`;
    });
    resultHTML += `</ul>`;
  
    resultBox.innerHTML = resultHTML;
    resultBox.style.display = "block";
  }
  
  // Event Listeners
  nextButton.addEventListener("click", handleNext);
  finishButton.addEventListener("click", handleFinish);
  
  // Initialize Quiz
  loadQuestion();
  