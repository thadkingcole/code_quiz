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
  doin: create question objects with a question string & array of 4 answers
  doin: create/find coding questions
  todo: randomize order questions appear
  DONE: create timer
  DONE: create function for starting quiz
  DONE: create function to display question
  DONE: create function for correct answer response
  DONE: create function for incorrect answer response
  DONE: create function for end of game
  DONE: create function for entering high score initials
  DONE: create function for displaying high scores
  DONE: save highscores to localstorage
  DONE: home button goes to intro page
  todo: create function for erasing high scores
  todo: create function for displaying high scores from persistent header link
*/

// GLOBAL VARIABLES
const questions = {
    // questions
    1: {
      mark: "Commonly used data types DO NOT include:",
      wrongAns: ["strings", "booleans", "numbers"],
      correctAns: "alerts",
      asked: false,
      orderMatters: false,
    },
    2: {
      mark:
        "The condition in an if/else statement is enclosed within _________.",
      wrongAns: ["quotes", "curley brackets", "square brackets"],
      correctAns: "parentheses",
      asked: false,
      orderMatters: false,
    },
    3: {
      mark: "Arrays in JavaScript can be used to store _________.",
      wrongAns: ["numbers and strings", "other arrays", "booleans"],
      correctAns: "all of the above",
      asked: false,
      orderMatters: true,
    },
    4: {
      mark:
        "String values must be enclosed within _________ when being assigned to variables.",
      wrongAns: ["commas", "curley brackets", "paratheses"],
      correctAns: "quotes",
      asked: false,
      orderMatters: false,
    },
    5: {
      mark:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      wrongAns: ["JavaScript", "terminal/bash", "for loops"],
      correctAns: "console.log()",
      asked: false,
      orderMatters: false,
    },
  },
  // Elements
  timerEl = document.getElementById("timer"),
  scoresEl = document.getElementsByClassName("scores"), // array of highscores
  highEl = document.getElementById("high"), // where highscores go
  // Buttons
  startBtn = document.getElementById("start"),
  submitHighscoreBtn = document.getElementById("submit-highscore"),
  homeBtn = document.getElementById("home"),
  clearBtn = document.getElementById("clear"),
  // Screens
  introEl = document.getElementById("intro"),
  quizEl = document.getElementById("quiz"), // also used for answer buttons
  endEl = document.getElementById("end"),
  highscoresEl = document.getElementById("highscores"),
  // Inputs
  initalsInput = document.getElementById("initials");

let timer = 100, // overall time limit
  timerInterval, // will be name of timer function interval
  num = 1, // question number
  newInitials = "anon";

// FUNCTIONS
function displayQ(question) {
  // display question text
  document.getElementById("question").textContent = question.mark;
  let answers = question.wrongAns;
  if (question.orderMatters) {
    // shuffles answers
    answers.sort(function (a, b) {
      return 0.5 - Math.random();
    });

    // display answers in buttons
    for (let i = 0; i < answers.length; i++) {
      document.getElementById(`answer${i}`).textContent = answers[i];
    }

    // ensures "all of the above" type answers are is last answer
    document.getElementById(`answer${answers.length}`).textContent =
      question.correctAns;
  } else {
    // order doesn't matter, shuffle all answers
    // ansPos is random number between 0 & index of answers for each question
    const ansPos = Math.floor(Math.random() * question.wrongAns.length);

    // answers is array with correct answer randomly inserted to question.wrongAns
    answers.splice(ansPos, 0, question.correctAns);

    // answers randomly shuffled
    answers.sort(function (a, b) {
      return 0.5 - Math.random();
    });

    // display answers in buttons
    for (let i = 0; i < answers.length; i++) {
      document.getElementById(`answer${i}`).textContent = answers[i];
    }
  }
  // mark question as asked
  question.asked = true;
}

function endQuiz() {
  // stop timer
  clearInterval(timerInterval);
  // display timer
  timerEl.textContent = `Time: ${timer}`;
  // display end screen
  endEl.style.display = "flex";
  // hide all other screens
  introEl.style.display = "none";
  quizEl.style.display = "none";
  highscoresEl.style.display = "none";
  // display final score
  document.getElementById(
    "final-score"
  ).textContent = `Your final score is ${timer}`;
}

function evalAns(event) {
  if (event.target.matches("button")) {
    const selectedAns = event.target.textContent;
    const feedback = document.getElementById("feedback");
    if (selectedAns === questions[num].correctAns) {
      feedback.textContent = "correct!";
    } else {
      feedback.textContent = `wrong, the correct answer was ${questions[num].correctAns}.`;
      timer -= 10;
      // display timer change
      timerEl.textContent = `Time: ${timer}`;
    }
    num++; // advances to next question
    if (questions[num]) {
      displayQ(questions[num]);
    } else {
      endQuiz();
    }
  }
}

function startTimer() {
  timer--;
  timerEl.textContent = `Time: ${timer}`;
  if (timer <= 0) {
    // timer could be less than 0 when wrong ans subtacts 10
    // in any case, show timer is 0
    timer = 0;
    endQuiz();
  }
}

function startQuiz() {
  // bootstrap rows use flex, displays quiz screen
  quizEl.style.display = "flex";
  // hides all other screens
  introEl.style.display = "none";
  endEl.style.display = "none";
  highscoresEl.style.display = "none";
  // show time on clock
  timerEl.textContent = `Time: ${timer}`;
  // start timer
  timerInterval = setInterval(startTimer, 1000);
  displayQ(questions[num]);
}

function submitHighscore(event) {
  event.preventDefault();
  newInitials = initalsInput.value.trim();
  // create new elements for highscore table
  const newRowEl = document.createElement("tr");
  const newInitialsEl = document.createElement("td");
  const newScoreEl = document.createElement("td");
  // add "scores" class to new row
  newRowEl.className = "scores";
  // add data to table elements
  if (newInitials) {
    // use entered initials
    newInitialsEl.textContent = newInitials;
  } else {
    newInitialsEl.textContent = "anon";
  }
  newScoreEl.textContent = timer;
  // add table data to created row
  newRowEl.appendChild(newInitialsEl);
  newRowEl.appendChild(newScoreEl);
  // insert table row
  if (scoresEl.length) {
    for (let i = 0; i < scoresEl.length; i++) {
      if (timer > scoresEl[i].lastElementChild.textContent) {
        scoresEl[i].insertAdjacentElement("beforebegin", newRowEl);
        break;
      }
    }
    if (timer < scoresEl[scoresEl.length - 1].lastElementChild.textContent) {
      scoresEl[scoresEl.length - 1].insertAdjacentElement("afterend", newRowEl);
    }
  } else {
    highEl.appendChild(newRowEl);
  }
  // save highscores to localstorage
  localStorage.setItem("highscores", highEl.innerHTML);
  // show highscore screen
  highscoresEl.style.display = "flex";
  // hide other screens
  introEl.style.display = "none";
  quizEl.style.display = "none";
  endEl.style.display = "none";
}

function loadHighscores() {
  // load highscores from local storage
  const highscores = localStorage.getItem("highscores");

  // if highscores exist...
  if (highscores) {
    // add them to the table
    highEl.innerHTML = highscores;
  }
}

function goHome() {
  // display intro screen
  introEl.style.display = "flex";
  //hide other screens
  quizEl.style.display = "none";
  endEl.style.display = "none";
  highscoresEl.style.display = "none";
}

// MAIN PROGRAM
loadHighscores();

// EVENT LISTENERS
startBtn.addEventListener("click", startQuiz);
quizEl.addEventListener("click", function (event) {
  evalAns(event);
});
submitHighscoreBtn.addEventListener("click", function (event) {
  submitHighscore(event);
});
homeBtn.addEventListener("click", goHome);