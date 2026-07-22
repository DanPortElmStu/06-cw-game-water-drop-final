// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Timer for creating drops
let timerInterval; // Timer for countdown
let score = 0;
let timeLeft = 30;

// Difficulty mode state
let selectedMode = "Normal";
const modes = {
  Easy: { spawnInterval: 1400, dropDuration: 5 },
  Normal: { spawnInterval: 1000, dropDuration: 4 },
  Hard: { spawnInterval: 700, dropDuration: 3 }
};
let currentDropDuration = modes[selectedMode].dropDuration;

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const gameContainer = document.getElementById("game-container");
const messageEl = document.getElementById("message");
const startBtn = document.getElementById("start-btn");

// difficulty buttons (added to DOM in index.html)
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

const winMessages = [
  "Great job! You caught plenty of drops!",
  "Awesome! You're a water-catching champion!",
  "You won! Those drops didn't stand a chance!",
  "Fantastic score! The rain is on your side!"
];

const loseMessages = [
  "Nice try — practice makes perfect!",
  "Almost there! Give it another shot!",
  "Keep trying and the drops will fall in your favor!",
  "Don't give up! You can beat 20 points next time!"
];

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

// Wire up difficulty buttons
difficultyButtons.forEach((btn) => {
  btn.addEventListener("click", () => setMode(btn.dataset.mode));
});

function setMode(mode) {
  if (!modes[mode]) return;
  selectedMode = mode;
  currentDropDuration = modes[selectedMode].dropDuration;
  difficultyButtons.forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));

  // If game is running, restart drop maker with new interval so changes take effect immediately
  if (gameRunning && dropMaker) {
    clearInterval(dropMaker);
    dropMaker = setInterval(createDrop, modes[selectedMode].spawnInterval);
  }
}

function startGame() {
  if (gameRunning) return;

  gameRunning = true;
  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  gameContainer.innerHTML = "";
  messageEl.textContent = "";
  messageEl.style.display = "none";
  startBtn.disabled = true;
  startBtn.textContent = "Game Running...";

  // Create new drops every second
  dropMaker = setInterval(createDrop, modes[selectedMode].spawnInterval);

  // Countdown timer
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function createDrop() {
  const drop = document.createElement("div");
  drop.className = "water-drop";

  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  const gameWidth = gameContainer.offsetWidth;
  const xPosition = Math.random() * Math.max(0, gameWidth - size);
  drop.style.left = `${xPosition}px`;
  drop.style.animationDuration = `${currentDropDuration}s`;

  drop.addEventListener("click", () => {
    if (!gameRunning) return;
    score += 1;
    scoreEl.textContent = score;
    drop.remove();
  });

  drop.addEventListener("animationend", () => {
    drop.remove();
  });

  gameContainer.appendChild(drop);
}

function endGame() {
  gameRunning = false;
  clearInterval(dropMaker);
  clearInterval(timerInterval);
  dropMaker = null;
  timerInterval = null;
  startBtn.disabled = false;
  startBtn.textContent = "Start Game";

  const drops = gameContainer.querySelectorAll(".water-drop");
  drops.forEach((drop) => drop.remove());

  const messages = score >= 20 ? winMessages : loseMessages;
  const chosenMessage = messages[Math.floor(Math.random() * messages.length)];
  messageEl.textContent = chosenMessage;
  messageEl.style.display = "block";
}
