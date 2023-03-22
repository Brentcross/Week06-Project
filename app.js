const questions = [
    { question: "Question 1", options: ["A", "B", "C", "D"], correctAnswer: "A" },
    { question: "Question 2", options: ["A", "B", "C", "D"], correctAnswer: "B" },
    { question: "Question 3", options: ["A", "B", "C", "D"], correctAnswer: "C" },
    { question: "Question 4", options: ["A", "B", "C", "D"], correctAnswer: "A" },
    { question: "Question 5", options: ["A", "B", "C", "D"], correctAnswer: "B" },
    { question: "Question 6", options: ["A", "B", "C", "D"], correctAnswer: "C" },
    { question: "Question 7", options: ["A", "B", "C", "D"], correctAnswer: "A" },
    { question: "Question 8", options: ["A", "B", "C", "D"], correctAnswer: "B" },
    { question: "Question 9", options: ["A", "B", "C", "D"], correctAnswer: "C" },
    { question: "Question 10", options: ["A", "B", "C", "D"], correctAnswer: "C" },
  ];
  
  const quizQuestion = document.getElementById("quiz-question");
  const optionsContainer = document.getElementById("options-container");
  const correctAnswerDisplay = document.getElementById("correct-answer");
  const nextButton = document.getElementById("next-button");
  
  let currentQuestionIndex = 0;
  
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
        alert("Quiz completed!");
        currentQuestionIndex = 0;
        displayQuestion();
      }
    };
    
    displayQuestion();
    