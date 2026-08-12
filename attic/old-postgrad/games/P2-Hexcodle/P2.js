// --------------------------------------------------------------
// PROJECT 2 (1/16/26)
// Hexcodle
// --------------------------------------------------------------

// --------------------------------------------------------------
//   Constants & State
// --------------------------------------------------------------
const allowedChars = "0123456789ABCDEF";
const MAX_GUESSES = 4;

const STATE_PLAYING = "playing";
const STATE_WIN = "win";
const STATE_LOSE = "lose";

let TARGET_COLOR = null;
let guesses = [];
let gameStatus = STATE_PLAYING;



// --------------------------------------------------------------
//   DOM Elements
// --------------------------------------------------------------
const targetColorDisplay = document.getElementById("targetColorDisplay");
const guessColorDisplay = document.getElementById("guessColorDisplay");
const pastGuesses = document.getElementById("pastGuesses");
const guessInput = document.getElementById("guessInput");
const submitGuessButton = document.getElementById("submitGuessButton");
const guessesLeftText = document.getElementById("guessesLeftText");



// --------------------------------------------------------------
//   Game Setup
// --------------------------------------------------------------
function generateRandomColor() {
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += allowedChars[Math.floor(Math.random() * 16)];
    }
    return color;
}

function startNewGame() {
    gameStatus = STATE_PLAYING;
    guesses = [];
    TARGET_COLOR = generateRandomColor();

    targetColorDisplay.style.backgroundColor = TARGET_COLOR;
    guessColorDisplay.style.backgroundColor = "#F58F7C";

    document.documentElement.style.setProperty("--dark-color", TARGET_COLOR);
    document.documentElement.style.setProperty("--target-color", TARGET_COLOR);

    guessInput.value = "";
    renderGuesses();
    updateGuessesLeft();
}



// --------------------------------------------------------------
//   Guess Handling
// --------------------------------------------------------------
function handleGuess(guessValue) {
    const results = [];

    for (let i = 1; i < guessValue.length; i++) {
        const guessChar = guessValue[i];
        const targetChar = TARGET_COLOR[i];
        const dist =
            allowedChars.indexOf(guessChar) -
            allowedChars.indexOf(targetChar);

        if (dist === 0) results.push("✔");
        else if (dist === -1 || dist === -2) results.push("↥");
        else if (dist === 1 || dist === 2) results.push("↧");
        else if (dist < -2) results.push("⇈");
        else results.push("⇊");
    }

    guesses.unshift({ value: guessValue, results });

    guessColorDisplay.style.backgroundColor = guessValue;

    renderGuesses();
    updateGuessesLeft();

    if (guessValue === TARGET_COLOR) {
        guessesLeftText.textContent = "You win :)";
        setTimeout(winGame, 200);
        return;
    }

    if (guesses.length >= MAX_GUESSES) {
        guessesLeftText.textContent = "No guesses left";
        setTimeout(loseGame, 200);
    }
}

function updateGuessesLeft() {
    if (gameStatus !== STATE_PLAYING) return;
    const remaining = MAX_GUESSES - guesses.length;
    guessesLeftText.textContent =
        remaining === 1 ? "1 guess left" : `${remaining} guesses left`;
}



// --------------------------------------------------------------
//   End Game
// --------------------------------------------------------------
function winGame() {
    gameStatus = STATE_WIN;
    if (confirm("Congratulations! You've guessed the correct color!\nPlay again?")) {
        startNewGame();
    }
}

function loseGame() {
    gameStatus = STATE_LOSE;
    if (confirm(`Game Over! The correct color was ${TARGET_COLOR}.\nPlay again?`)) {
        startNewGame();
    }
}



// --------------------------------------------------------------
//   Rendering
// --------------------------------------------------------------
function renderGuesses() {
    pastGuesses.innerHTML = "";

    guesses.forEach(guess => {
        const guessRow = document.createElement("div");
        guessRow.className = "guess";

        for (let i = 1; i < guess.value.length; i++) {
            const resultBox = document.createElement("div");
            resultBox.className = "guessResult";

            const charDiv = document.createElement("div");
            charDiv.className = "guessChar";
            charDiv.textContent = guess.value[i];

            const resultDiv = document.createElement("div");
            resultDiv.className = "guessCharResult";
            resultDiv.textContent = guess.results[i - 1];

            if (guess.results[i - 1] === "✔") {
                resultBox.style.backgroundColor = TARGET_COLOR;
            }

            resultBox.appendChild(charDiv);
            resultBox.appendChild(resultDiv);
            guessRow.appendChild(resultBox);
        }

        pastGuesses.appendChild(guessRow);
    });
}


// --------------------------------------------------------------
//   Input Handling
// --------------------------------------------------------------
guessInput.addEventListener("keydown", e => {
    const isHexChar = allowedChars.includes(e.key.toUpperCase());
    const isControlKey = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Enter"
    ].includes(e.key);

    if (!isHexChar && !isControlKey) e.preventDefault();

    if (e.key === "Enter") {
        e.preventDefault();
        submitGuessButton.click();
    }
});

submitGuessButton.addEventListener("click", () => {
    if (gameStatus !== STATE_PLAYING) return;

    const rawValue = guessInput.value.toUpperCase();
    if (!/^[0-9A-F]{6}$/.test(rawValue)) {
        alert("Please enter a valid hex color code (e.g., 1A2B3C).");
        return;
    }

    handleGuess("#" + rawValue);
    guessInput.value = "";
});



// --------------------------------------------------------------
//   Start Game
// --------------------------------------------------------------
startNewGame();
