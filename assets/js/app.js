const cards = document.querySelectorAll(".card");
const restartButton = document.querySelector(".restart");
const timeDisplay = document.querySelector(".time span");
const flipsDisplay = document.querySelector(".flips span");
const scoreDisplay = document.querySelector(".score span");

let flippedCards = [];
let matchedCards = [];
let flipCount = 0;
let time = 30;
let score = 0;

function startGame() {
  flippedCards = [];
  matchedCards = [];
  flipCount = 0;
  time = 30;
  score = 0;

  cards.forEach((card) => {
    card.classList.remove("flip", "shake");
  });

  timeDisplay.textContent = time;
  flipsDisplay.textContent = flipCount;
  scoreDisplay.textContent = score;

  const timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      alert("Game Over!");
    } else {
      time--;
      timeDisplay.textContent = time;
    }
  }, 1000);
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flip")) {
    this.classList.add("flip");
    flippedCards.push(this);

    flipCount++;
    flipsDisplay.textContent = flipCount;

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.querySelector(".back-view").innerHTML === card2.querySelector(".back-view").innerHTML) {
    matchedCards.push(card1, card2);
    score++;
    scoreDisplay.textContent = score;

    flippedCards = [];
    if (matchedCards.length === cards.length) {
      setTimeout(() => alert("You Win!"), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      flippedCards = [];
    }, 1000);
  }
}

restartButton.addEventListener("click", startGame);
cards.forEach((card) => card.addEventListener("click", flipCard));

startGame();
