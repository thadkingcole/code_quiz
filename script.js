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
  doing: create question objects with a question string & array of 4 or 5 answers
  todo: create/find coding questions
  DONE: create timer
  DONE: create function for starting quiz
  DONE: create function to display question
  todo: create function for correct answer response
  todo: create function for incorrect answer response
  doing: create function for end of game
  todo: create function for entering high score initials
  todo: create function for displaying high scores
  todo: create function for erasing high scores
*/

// GLOBAL VARIABLES
const question1 = {
  mark: "Commonly used data types DO NOT include:",
  wrongAns: [
    "strings",
    "booleans",
    "numbers"
  ],
  correctAns: "alerts"
},
timerEl = document.getElementById("timer");

let timer = 75;



// FUNCTIONS
function displayQ(question) {
  // display question text
  document.getElementById("question").textContent = question.mark;

  // ansPos is random number between 0 & index of answers for each question
  const ansPos = Math.floor(Math.random() * question.wrongAns.length);

  // answers is array with correct answer randomly inserted to question.wrongAns
  let answers = question.wrongAns;
  answers.splice(ansPos, 0, question.correctAns);

  // answers randomly shuffled
  answers.sort(function (a, b) { return 0.5 - Math.random() });

  // display answers in buttons
  for (let i = 0; i < answers.length; i++) {
    document.getElementById("ans" + i).textContent = answers[i];
  }
}


function endQuiz() {
  console.log("END OF QUIZ");
}


function startQuiz() {
  const rows = document.getElementsByClassName("row");
  // each row is a different "screen"
  // rows[0] is Intro screen
  // rows[1] is Quiz screen
  // rows[2] is End of Quiz screen
  // rows[3] is High Scores screen
  for (i = 0; i < rows.length; i++) {
    if (i === 1) {
      // bootstrap rows use flex, displays quiz screen
      rows[i].style.display = "flex";
    } else { // hides all other screens
      rows[i].style.display = "none";
    }
  }
  // start timer
  timer = 75;
  timerEl.textContent = "Time: " + timer;
  const timerInterval = setInterval(function () {
    timer--;
    timerEl.textContent = "Time: " + timer;
    if (timer === 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}