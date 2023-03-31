let questions = [];
const quizQuestion = document.getElementById("quiz-question");
const optionsContainer = document.getElementById("options-container");
const correctAnswerDisplay = document.getElementById("correct-answer");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function fetchQuestions() {
  return fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      questions = shuffleArray(data);
      displayQuestion();
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
    });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
  function displayQuestion() {
    quizQuestion.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = "";
  
    questions[currentQuestionIndex].options.forEach((option, index) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;
      optionButton.onclick = () => handleOptionClick(option);
      optionsContainer.appendChild(optionButton);
    });
  
    nextButton.disabled = true;
    correctAnswerDisplay.textContent = "";
  }
  
  function handleOptionClick(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    correctAnswerDisplay.textContent = `Correct answer: ${correctAnswer}`;
  
    if (selectedOption === correctAnswer) {
      correctAnswerDisplay.style.color = "green";
      score++; // Increment the score if the answer is correct
    } else {
      correctAnswerDisplay.style.color = "red";
    }
  
    nextButton.disabled = false;
  }
  
  nextButton.onclick = () => {
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      alert(`Quiz completed!\nYour score: ${score}/${questions.length}`);
      currentQuestionIndex = 0;
      score = 0; // Reset the score
      displayQuestion();
    }
  };
  
  fetchQuestions();

    