'use strict'
const newGameBtn = document.querySelector('.button_new-game');
const rollBtn = document.querySelector('.button_roll');
const holdBtn = document.querySelector('.button_hold');
const diceImg = document.querySelector('.dice');

const playerOneScoreField = document.getElementById("score-0");
const playerTwoScoreField = document.getElementById("score-1");
const playerOneCurrentField = document.getElementById("current-0");
const playerTwoCurrentField = document.getElementById("current-1");

const playersScore = [0, 0];
let currentScore = 0;
let activePlayer = 0;

newGameBtn.addEventListener("click", () => {
  playersScore[0] = playersScore[1] = 0
  currentScore = 0
  document.querySelector(`.player-${activePlayer}`).classList.remove("winner");
  if (activePlayer===1){
    changePlayer();
  }
  hideDice();
  holdBtn.disabled = false;
  rollBtn.disabled = false;

  playerOneCurrentField.textContent = 0;
  playerTwoCurrentField.textContent = 0;
  playerOneScoreField.textContent = 0;
  playerTwoScoreField.textContent = 0;
})

rollBtn.addEventListener("click", () => {
  diceImg.classList.remove("hidden");

  let dice = Math.trunc(Math.random() * 6) + 1;
  diceImg.setAttribute("src", `img/dice-${dice}.png`);

  if (dice !== 1) {
    updateCurrentScore(dice)

  } else {
    updateCurrentScore(0);
    changePlayer();
  }
})

holdBtn.addEventListener("click", () => {
  updateHoldScore();
  if (playersScore[activePlayer] >= 100) {
    document.querySelector(`.player-${activePlayer}`).classList.add("winner");
    document.querySelector(`.player-${activePlayer}`).classList.remove("active");
    holdBtn.disabled = true;
    rollBtn.disabled = true;
    hideDice();
  } else {
    changePlayer();
  }
})

function updateCurrentScore(score) {
  currentScore = score === 0 ? 0 : currentScore + score;
  document.getElementById(`current-${activePlayer}`).textContent = currentScore;
}

function updateHoldScore() {
  playersScore[activePlayer] += currentScore;
  document.getElementById(`score-${activePlayer}`).textContent = playersScore[activePlayer];
  updateCurrentScore(0)
}

function changePlayer() {
  document.querySelector(`.player-${activePlayer}`).classList.toggle("active")
  document.querySelector(`.player-${(activePlayer + 1) % 2}`).classList.toggle("active")
  activePlayer = (activePlayer + 1) % 2;
}

function hideDice() {
  diceImg.classList.add("hidden");
}