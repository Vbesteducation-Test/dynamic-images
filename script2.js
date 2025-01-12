document.addEventListener("DOMContentLoaded", () => {
    const startQuizButton = document.getElementById("start-quiz");
    const quizContainer = document.getElementById("quiz-container");
    const questionContainer = document.getElementById("question-container");
    const timerDisplay = document.createElement("div");
    const submitButton = document.createElement("button");

    let questions = [];
    let totalQuestions = 0;
    let remainingTime = 0;
    let timer;
    let score = 0;

    // Sample questions (replace with API/database fetch if needed)
    const sampleQuestions = [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
        { question: "What is the capital of France?", options: ["Paris", "Berlin", "Rome", "Madrid"], answer: 0 },
        { question: "What is 5 x 5?", options: ["20", "25", "30", "35"], answer: 1 },
        { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], answer: 2 },
        { question: "What is the largest planet?", options: ["Mars", "Earth", "Jupiter", "Venus"], answer: 2 },
    ];

    startQuizButton.addEventListener("click", (event) => {
        event.preventDefault();

        // Get user inputs
        totalQuestions = parseInt(document.getElementById("question-count").value);
        const difficulty = document.getElementById("difficulty").value;

        // Select appropriate number of questions (mock filter for simplicity)
        questions = sampleQuestions.slice(0, totalQuestions);

        // Calculate total time based on difficulty
        if (difficulty === "medium") {
            remainingTime = totalQuestions * 45; // 45 seconds per question
        } else if (difficulty === "hard") {
            remainingTime = totalQuestions * 60; // 60 seconds per question
        } else {
            remainingTime = totalQuestions * 30; // Default to 30 seconds for easy
        }

        // Set up timer display
        timerDisplay.id = "timer-display";
        timerDisplay.innerHTML = `Time Left: <span id="time-left">${formatTime(remainingTime)}</span>`;
        quizContainer.insertBefore(timerDisplay, questionContainer);

        // Display quiz questions
        quizContainer.style.display = "block";
        displayQuestions();

        // Add submit button
        submitButton.textContent = "Submit Quiz";
        submitButton.id = "submit-button";
        submitButton.addEventListener("click", endQuiz);
        quizContainer.appendChild(submitButton);

        // Start the timer
        startTimer();
    });

    function startTimer() {
        const timerElement = document.getElementById("time-left");
        timer = setInterval(() => {
            remainingTime--;
            timerElement.textContent = formatTime(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }

    function displayQuestions() {
        questionContainer.innerHTML = ""; // Clear previous content

        questions.forEach((question, index) => {
            const questionBlock = document.createElement("div");
            questionBlock.classList.add("question-block");

            // Display question text
            const questionTitle = document.createElement("h3");
            questionTitle.textContent = `Question ${index + 1}: ${question.question}`;
            questionBlock.appendChild(questionTitle);

            // Display options
            question.options.forEach((option, optionIndex) => {
                const optionContainer = document.createElement("div");
                optionContainer.classList.add("option-container");

                const optionInput = document.createElement("input");
                optionInput.type = "radio";
                optionInput.name = `question-${index}`;
                optionInput.value = optionIndex;
                optionContainer.appendChild(optionInput);

                const optionLabel = document.createElement("label");
                optionLabel.textContent = option;
                optionContainer.appendChild(optionLabel);

                questionBlock.appendChild(optionContainer);
            });

            questionContainer.appendChild(questionBlock);
        });
    }

    function endQuiz() {
        clearInterval(timer); // Stop the timer

        // Calculate score
        questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === question.answer) {
                score++;
            }
        });

        // Display results
        questionContainer.innerHTML = `
            <h2>Quiz Completed!</h2>
            <p>Your Score: ${score} / ${totalQuestions}</p>
            <button onclick="location.reload()">Restart Quiz</button>
        `;

        // Hide timer and submit button
        timerDisplay.style.display = "none";
        submitButton.style.display = "none";
    }
});
