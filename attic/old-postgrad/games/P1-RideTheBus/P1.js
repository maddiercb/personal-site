// --------------------------------------------------------------
// PROJECT 1 (1/12/26)
// Ride the Bus
// --------------------------------------------------------------

// --------------------------------------------------------------
// Game State Variables + Constants
// --------------------------------------------------------------
const BASE_CARD_WIDTH = 240;
const BASE_CARD_HEIGHT = 360;
const BASE_SPACING = 40;

const STATE_PLAYING = 'playing';
const STATE_WIN = "win";
const STATE_LOSE = "lose";

let canClickToReset = false;
let gameStatus = STATE_PLAYING;
let gameState = 0;
let deck = [];
let cards = [];

let hintHeld = false;


// --------------------------------------------------------------
// Canvas + Layout Configuration
// --------------------------------------------------------------
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
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  drawCards();
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", () => {
  resizeCanvas();
});





// --------------------------------------------------------------
// Card Generation Logic
// --------------------------------------------------------------
function buildDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push(`${value}${suit}`);
    }
  }
}

function drawFromDeck() {
  const index = Math.floor(Math.random() * deck.length);
  return deck.splice(index, 1)[0];
}





// --------------------------------------------------------------
// Guessing Buttons Logic
// --------------------------------------------------------------
const PHASE_BUTTONS = {
  0: ["Red", "Black"],
  1: ["Higher", "Lower"],
  2: ["Inside", "Outside"],
  3: ["♠", "♥", "♦", "♣"]
};

const buttonContainer = document.getElementById("buttonContainer");

function handleGuess(guess) {
  if (gameStatus !== STATE_PLAYING) return;
  let correct = false;

  switch (gameState) {
    case 0: // Q1: Red or Black
      correct =
        (guess === "Red" && isRed(cards[0])) ||
        (guess === "Black" && !isRed(cards[0]));
      break;

    case 1: // Q2: Higher or Lower
      correct =
        (guess === "Higher" && cardValue(cards[1]) > cardValue(cards[0])) ||
        (guess === "Lower" && cardValue(cards[1]) < cardValue(cards[0]));
      break;

    case 2: // Q3: Inside or Outside
      correct =
        (guess === "Inside" && isInside(cards[0], cards[1], cards[2])) ||
        (guess === "Outside" && !isInside(cards[0], cards[1], cards[2]));
      break;

    case 3: // Q4: Suit Guess
      correct = cards[3].endsWith(guess);
      break;
  }

  if (correct) {
    gameState++;
    if (gameState === 4) {
      gameStatus = STATE_WIN;
    }
  } else {
    gameState++;
    gameStatus = STATE_LOSE;
  }

  drawCards();

  setTimeout(() => {
    if (gameStatus === STATE_WIN) {
      showEndMessage("You Win :) Click anywhere to continue!");
      canClickToReset = true;
    } else if (gameStatus === STATE_LOSE) {
      showEndMessage("You Lose :( Click anywhere to try again!");
      canClickToReset = true;
    } else {
      renderButtons();
    }
  }, 300);

}





// --------------------------------------------------------------
// Game-Specific Helpers
// --------------------------------------------------------------
function cardValue(card) {
  const value = card.slice(0, -1);

  if (value === "A") return 14;
  if (value === "K") return 13;
  if (value === "Q") return 12;
  if (value === "J") return 11;

  return Number(value);
}

function isRed(card) {
  const suit = card.slice(-1);
  return suit === "♥" || suit === "♦";
}

function isInside(cardA, cardB, cardC) {
  const a = cardValue(cardA);
  const b = cardValue(cardB);
  const c = cardValue(cardC);

  const low = Math.min(a, b);
  const high = Math.max(a, b);

  return c > low && c < high;
}





// --------------------------------------------------------------
// Game State Logic
// --------------------------------------------------------------
function resetGame() {
  canClickToReset = false;

  buildDeck();
  cards = [];
  gameState = 0;
  gameStatus = STATE_PLAYING;

  for (let i = 0; i < 4; i++) {
    cards.push(drawFromDeck());
  }

  drawCards();
  renderButtons();
}



// --------------------------------------------------------------
// Game Rendering
// --------------------------------------------------------------
function renderButtons() {
  buttonContainer.innerHTML = "";

  const buttons = PHASE_BUTTONS[gameState];
  if (!buttons) return;

  buttons.forEach(label => {
    const btn = document.createElement("button");
    btn.textContent = label;

    btn.style.padding = "12px 20px";
    btn.style.fontSize = "20px";
    btn.style.borderRadius = "10px";
    btn.style.cursor = "pointer";
    btn.style.border = "2px solid white";
    btn.style.background = "black";
    btn.style.color = "white";

    btn.onclick = () => handleGuess(label);

    buttonContainer.appendChild(btn);
  });
}

function showEndMessage(text) {
  buttonContainer.innerHTML = "";

  const msg = document.createElement("div");
  msg.textContent = text;

  msg.style.color = "white";
  msg.style.fontSize = "32px";
  msg.style.fontFamily = "Arial";
  msg.style.textAlign = "center";

  buttonContainer.appendChild(msg);
}

ctx.drawCard = function (x, y, card, w, h) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, w, h);

  const value = card.slice(0, -1);
  const suit = card.slice(-1);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = suit === "♥" || suit === "♦" ? "red" : "black";

  ctx.font = `${40 * (w / BASE_CARD_WIDTH)}px Arial`;
  ctx.fillText(value, x + w * 0.1, y + h * 0.08);
  ctx.fillText(value, x + w * 0.9, y + h * 0.92);

  ctx.font = `${100 * (w / BASE_CARD_WIDTH)}px Arial`;
  ctx.fillText(suit, x + w / 2, y + h / 2);
};


function drawCardBack(x, y, w, h) {
  ctx.fillStyle = "#444";
  ctx.fillRect(x, y, w, h);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = "#666";
  ctx.font = `${80 * (w / BASE_CARD_WIDTH)}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🂠", x + w / 2, y + h / 2);
}

function drawCards(showAll = hintHeld) {
  if (!cards.length) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const fullWidth = BASE_CARD_WIDTH * 4 + BASE_SPACING * 3;
  const fullHeight = BASE_CARD_HEIGHT;

  const availableWidth = canvas.width - 48;   // side padding
  const availableHeight = canvas.height - 160; // top + buttons

  const scale = Math.min(
    availableWidth / fullWidth,
    availableHeight / fullHeight,
    1 // never scale up, only down
  );

  const cardWidth = BASE_CARD_WIDTH * scale;
  const cardHeight = BASE_CARD_HEIGHT * scale;
  const spacing = BASE_SPACING * scale;

  const totalWidth = cardWidth * 4 + spacing * 3;
  const minTopPadding = 24;
  const minBottomPadding = 120; // space for buttons

  const minSidePadding = 24;

  const startX = Math.max(
    minSidePadding,
    (canvas.width - totalWidth) / 2
  );

  const layoutHeight = canvas.height - minBottomPadding;
  const y = Math.max(
    minTopPadding,
    (layoutHeight - cardHeight) / 2
  );
  for (let i = 0; i < cards.length; i++) {
    const x = startX + i * (cardWidth + spacing);

    if (i < gameState || showAll) {
      ctx.drawCard(x, y, cards[i], cardWidth, cardHeight); // face up
    } else {
      drawCardBack(x, y, cardWidth, cardHeight); // face down
    }
  }
}





// --------------------------------------------------------------
// Input Handling
// --------------------------------------------------------------
window.addEventListener("keydown", (e) => {
  if (e.key === "r") {
    resetGame();
  }

  if (e.key === "h") {
    hintHeld = true;
    drawCards();
  }
});

window.addEventListener("keyup", (e) => {
  // H key released
  if (e.key === "h") {
    hintHeld = false;
    drawCards();
  }
});

window.addEventListener("click", () => {
  if (!canClickToReset) return;

  canClickToReset = false;
  resetGame();
});


// -------------------------------
// Initial Setup
// -------------------------------
resetGame();




