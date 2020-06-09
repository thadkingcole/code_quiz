/*
  Clicking start quiz displays first question and starts timer at 75 sec

  each answer will be displayed as a [button]
  clicking any button will display the next question
  
  if [correct answer] is clicked...
    "correct" will be displayed below the next question's answers
  if [incorrect answer] is clicked...
    "wrong, correct answer is _______"
    will be displayed below the next question's answers

  quiz continues until there are no more questions or time reaches 0

  once quiz ends, user's score will be displayed along with a form to enter intials

  submiting initials will display high scores,
  a [Go Back] button, and a [Clear High Scores] button

  [Go Back] will show intro page
  [Clear High Scores] will remove all high scores

  -----TODO LIST-----
  doin: create question objects with a question string & array of 4 or 5 answers
  doin: create/find coding questions
  DONE: create timer
  DONE: create function for starting quiz
  DONE: create function to display question
  doin: create function for correct answer response
  doin: create function for incorrect answer response
  doin: create function for end of game
  todo: create function for entering high score initials
  todo: create function for displaying high scores
  todo: create function for erasing high scores
*/

// GLOBAL VARIABLES
const questions = { // questions
  1: {
    mark: "Commonly used data types DO NOT include:",
    wrongAns: [
      "strings",
      "booleans",
      "numbers"
    ],
    correctAns: "alerts",
    asked: false,
    orderMatters: false
  },
  2: {
    mark: "The condition in an if/else statement is enclosed within _________.",
    wrongAns: [
      "quotes",
      "parentheses",
      "square brackets"
    ],
    correctAns: "curley brackets",
    asked: false,
    orderMatters: false
  },
  3: {
    mark: "Arrays in JavaScript can be used to store _________.",
    wrongAns: [
      "numbers and strings",
      "other arrays",
      "booleans",
    ],
    correctAns: "all of the above",
    asked: false,
    orderMatters: true
  },
  4: {
    mark: "String values must be enclosed within _________ when being assigned to variables.",
    wrongAns: [
      "commas",
      "curley brackets",
      "paratheses",
    ],
    correctAns: "quotes",
    asked: false,
    orderMatters: false
  },
  5: {
    mark: "A very useful tool used during development and debugging for printing content to the debugger is:",
    wrongAns: [
      "JavaScript",
      "terminal/bash",
      "for loops",
    ],
    correctAns: "console.log()",
    asked: false,
    orderMatters: false
  },
},
  // Elements
  timerEl = document.getElementById("timer"),
  // Buttons
  startBtnEl = document.getElementById("start"),
  initialsBtnEl = document.getElementById("initials"),
  homeBtnEl = document.getElementById("home"),
  clearBtnEl = document.getElementById("clear"),
  // Screens
  introEl = document.getElementById("intro"),
  quizEl = document.getElementById("quiz"),
  endEl = document.getElementById("end"),
  highscoresEl = document.getElementById("highscores");

let timer = 75,
  num = 1;


// FUNCTIONS
function displayQ(question) {
  // display question text
  document.getElementById("question").textContent = question.mark;
  let answers = question.wrongAns;
  if (question.orderMatters) {
    // shuffles answers
    answers.sort(function (a, b) { return 0.5 - Math.random(); });

    // display answers in buttons
    for (let i = 0; i < answers.length; i++) {
      document.getElementById(`answer${i}`).textContent = answers[i];
    }

    // ensures "all of the above" type answers are is last answer
    document.getElementById(`answer${answers.length}`).textContent =
      question.correctAns;
  } else { // order doesn't matter, shuffle all answers
    // ansPos is random number between 0 & index of answers for each question
    const ansPos = Math.floor(Math.random() * question.wrongAns.length);

    // answers is array with correct answer randomly inserted to question.wrongAns
    answers.splice(ansPos, 0, question.correctAns);

    // answers randomly shuffled
    answers.sort(function (a, b) { return 0.5 - Math.random(); });

    // display answers in buttons
    for (let i = 0; i < answers.length; i++) {
      document.getElementById(`answer${i}`).textContent = answers[i];
    }
  }
  // mark question as asked
  question.asked = true;

  // check answer
}


function endQuiz() {
  console.log("END OF QUIZ");
}


function startQuiz() {
  // bootstrap rows use flex, displays quiz screen
  quizEl.style.display = "flex";
  // hides all other screens
  introEl.style.display = "none";
  endEl.style.display = "none";
  highscoresEl.style.display = "none";
  // start timer
  timer = 75;
  timerEl.textContent = `Time: ${timer}`;
  const timerInterval = setInterval(function () {
    timer--;
    timerEl.textContent = `Time: ${timer}`;
    if (timer === 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
  displayQ(questions[num]);
}


// EVENT LISTENERS
startBtnEl.addEventListener("click", startQuiz);
quizEl.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    const selectedAns = event.target.textContent;
    const feedback = document.getElementById("feedback");
    if (selectedAns === questions[num].correctAns) {
      feedback.textContent = "correct!";
    } else {
      feedback.textContent =
        `wrong, the correct answer was ${questions[num].correctAns}`;
    }
    num++;
    if (questions[num]) {
      displayQ(questions[num]);
    } else {
      endQuiz();
    }
  }
});

