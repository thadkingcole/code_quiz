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
  DONE: randomize order questions appear
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
  DONE: create function for erasing high scores
  todo: create function for displaying high scores from persistent header link
  DONE: add feedback to end page for last question
*/

// GLOBAL VARIABLES
const questions = {
    // questions
    0: {
      mark: "Commonly used data types DO NOT include:",
      wrongAns: ["strings", "booleans", "numbers"],
      correctAns: "alerts",
    },
    1: {
      mark:
        "The condition in an if/else statement is enclosed within _________.",
      wrongAns: ["quotes", "curley brackets", "square brackets"],
      correctAns: "parentheses",
    },
    2: {
      mark: "How do you access the first element in an array named arr?",
      wrongAns: ["arr[1]", "arr(0)", "arr{1}"],
      correctAns: "arr[0]",
    },
    3: {
      mark:
        "String values must be enclosed within _________ when being assigned to variables.",
      wrongAns: ["commas", "curley brackets", "paratheses"],
      correctAns: "quotes",
    },
    4: {
      mark:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      wrongAns: ["JavaScript", "terminal/bash", "for loops"],
      correctAns: "console.log()",
    },
  },
  // Elements
  timerEl = document.getElementById("timer"),
  scoresEl = document.getElementsByClassName("scores"), // array of highscores
  highEl = document.getElementById("high"), // where highscores go
  feedbackEl = document.getElementById("feedback"),
  lastFeedbackEl = document.getElementById("last-feedback"),
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
  newInitials = "anon",
  questNums = [...Array(5).keys()]; // array from 0 to 4

// FUNCTIONS
function displayQ(question) {
  // display question text
  document.getElementById("question").textContent = question.mark;
  // ansPos is random number between 0 & index of answers for each question
  const correctPos = Math.floor(Math.random() * question.wrongAns.length + 1);
  // shuffle wrong answers
  question.wrongAns.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  // display answers in buttons
  let wai = 0; // wrong answer index
  for (let btni = 0; btni <= question.wrongAns.length; btni++) {
    if (btni === correctPos) {
      // put correct answer on button
      document.getElementById(`ans${btni}`).textContent = question.correctAns;
    } else {
      // put wrong answer on button
      document.getElementById(`ans${btni}`).textContent =
        question.wrongAns[wai];
      wai++;
    }
  }
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
  // display final question feedback
  lastFeedbackEl.textContent = feedbackEl.textContent
}

function evalAns(event) {
  if (event.target.matches("button")) {
    const selectedAns = event.target.textContent;
    if (selectedAns === questions[questNums[num]].correctAns) {
      // answer is correct!
      feedbackEl.textContent = "correct!";
    } else {
      // answer is wrong, subtract 10 from timer
      feedbackEl.textContent = `wrong, the correct answer was ${
        questions[questNums[num]].correctAns
      }.`;
      timer -= 10;
      timerEl.textContent = `Time: ${timer}`; // display timer change
    }
    num++; // advances to next question
    feedbackEl.style.display = "block"; // show answer feedback
    if (questions[questNums[num]]) {
      displayQ(questions[questNums[num]]);
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
  // hide answer feedback for repeat quiz starts
  feedbackEl.style.display = "none";
  // show time on clock
  timer = 100;
  timerEl.textContent = `Time: ${timer}`;
  // start timer
  timerInterval = setInterval(startTimer, 1000);
  // randomize questions
  questNums.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  // start at question 0
  num = 0;
  displayQ(questions[questNums[num]]);
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

function clearHighscores() {
  localStorage.removeItem("highscores");
  highEl.innerHTML = "";
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
clearBtn.addEventListener("click", clearHighscores);
