// -------------------------------
// Canvas + Layout Configuration
// -------------------------------
let isFullScreen = false;

const padding = {
  top: 150,
  bottom: 50,
  left: 125,
  right: 125
};

const container = document.getElementById("gameContainer");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  if (isFullScreen) {
    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.padding = "0";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else {
    container.style.position = "relative";
    container.style.width = `calc(100vw - ${padding.left + padding.right}px)`;
    container.style.height = `calc(100vh - ${padding.top + padding.bottom}px)`;
    container.style.margin = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;
    container.style.border = "5px solid white";

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// -------------------------------
// Card Generation Logic
// -------------------------------
function randomCard() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];

  return `${value}${suit}`;
}

// Draw card helper
ctx.drawCard = function (x, y, card) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, 240, 360);

  const value = card.slice(0, -1);
  const suit = card.slice(-1);

  ctx.font = "40px Arial";
  ctx.fillStyle = suit === "♥" || suit === "♦" ? "red" : "black";


  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(value, x + 26, y + 25); // + 15 shift
  ctx.fillText(value, x + 215, y + 331); // - 15 shift
  ctx.font = "100px Arial";
  ctx.fillText(suit, canvas.width / 2 - 5, canvas.height / 2 - 12);
};



// -------------------------------
// Input Handling
// -------------------------------
window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    drawCenterCard();
  }
});

// -------------------------------
// Game State for Ride the Bus
// -------------------------------
let phase = 1;  
let lastCard = null;  // store previous card for comparisons

// Button container reference
const buttonContainer = document.getElementById("buttonContainer");

// Mapping button layouts per phase
const PHASE_BUTTONS = {
  1: [
    { label: "Red", value: "red" },
    { label: "Black", value: "black" }
  ],
  2: [
    { label: "Higher", value: "higher" },
    { label: "Lower", value: "lower" }
  ],
  3: [
    { label: "In Between", value: "between" },
    { label: "Outside", value: "outside" }
  ],
  4: [
    { label: "Hearts", value: "♥" },
    { label: "Diamonds", value: "♦" },
    { label: "Spades", value: "♠" },
    { label: "Clubs", value: "♣" }
  ]
};

// -------------------------------
// Draw Buttons for Current Phase
// -------------------------------
function loadPhaseButtons() {
  buttonContainer.innerHTML = "";  // clear old buttons

  PHASE_BUTTONS[phase].forEach(btn => {
    const b = document.createElement("button");
    b.textContent = btn.label;
    b.style.padding = "12px 20px";
    b.style.fontSize = "20px";
    b.style.borderRadius = "10px";
    b.style.cursor = "pointer";
    b.style.border = "2px solid white";
    b.style.background = "black";
    b.style.color = "white";

    b.onclick = () => handleGuess(btn.value);
    buttonContainer.appendChild(b);
  });
}

// -------------------------------
// Handle Guess + Move to Next Phase
// -------------------------------
function handleGuess(value) {
  console.log("Player guessed:", value);

  // later you'll add correctness logic here…
  // check guess against card, set phase = 1 if wrong

  // For now: always move to next phase
  phase++;
  if (phase > 4) phase = 1;

  drawCenterCard();   // draw a new card
  loadPhaseButtons(); // update buttons
}

// -------------------------------
// Override drawCenterCard to track cards
// -------------------------------
function drawCenterCard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  lastCard = randomCard();
  const x = (canvas.width - 240) / 2;
  const y = (canvas.height - 360) / 2;

  ctx.drawCard(x, y, lastCard);
}

// Initial setup
drawCenterCard();
loadPhaseButtons();

