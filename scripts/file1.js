let questions = [];
const quizQuestion = document.getElementById("quiz-question");
const optionsContainer = document.getElementById("options-container");
const correctAnswerDisplay = document.getElementById("correct-answer");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

async function fetchQuestions() {
  try {
    const response = await fetch("questions.json");
    const data = await response.json();
    questions = shuffleArray(data);
    displayQuestion();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
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
    score++;
  } else {
    correctAnswerDisplay.style.color = "red";
  }

  nextButton.disabled = false;
}

const restartButton = document.getElementById("restart-button");

function endQuiz() {
  const finalScoreDisplay = document.getElementById("final-score");
  finalScoreDisplay.textContent = `Quiz completed! Your score: ${score}/${questions.length}`;

  quizQuestion.textContent = "";
  optionsContainer.innerHTML = "";
  correctAnswerDisplay.textContent = "";
  nextButton.style.display = "none";

  restartButton.style.display = "block";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  fetchQuestions();

  restartButton.style.display = "none";
  document.getElementById("final-score").textContent = "";

  nextButton.style.display = "block";
}

nextButton.onclick = () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
};

restartButton.onclick = () => {
  restartQuiz();
};

fetchQuestions();
