const board = document.getElementById("board");

for (let i = 0; i < 55; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  board.appendChild(cell);
}


const piece = document.getElementById("testPiece");

let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

piece.addEventListener("mousedown", (e) => {
  isDragging = true;
  piece.style.transition = "none";

  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", onDrop);
});

function onDrag(e) {
  if (!isDragging) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  piece.style.transform = `translate(${currentX + dx}px, ${currentY + dy}px)`;
}

function onDrop() {
  isDragging = false;

  currentX += event.clientX - startX;
  currentY += event.clientY - startY;

  piece.style.transition = "transform 0.2s ease";

  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", onDrop);
}
