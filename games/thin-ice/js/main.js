// main.js
// Entry point for Thin Ice

console.log("Thin Ice: main.js loaded");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Placeholder: game initialization
let game = null;

function startGame() {
  console.log("Game start triggered");
  game = new Game(ctx);
}

// Temporary auto-start (menu will replace this later)
startGame();
