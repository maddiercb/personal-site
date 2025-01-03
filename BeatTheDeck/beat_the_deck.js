// Variables for deck, mistakes, and game state
let deck = Array.from({ length: 52 }, (_, i) => i + 1); // Cards 1-52
let mistakes = 0; // Count of mistakes
let cardsLeftDisplay, mistakesDisplay; // DOM elements

// Initialize the game
function initializeGame() {
    deck = Array.from({ length: 52 }, (_, i) => i + 1);
    shuffleDeck();
    mistakes = 0;
    updateCardsLeft();
    updateMistakes();
    renderGrid();
}

// Fisher-Yates Shuffle
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Update the display of cards left
function updateCardsLeft() {
    if (deck.length > 0) {
        cardsLeftDisplay.textContent = `Cards Left: ${deck.length}`;
    } else {
        cardsLeftDisplay.textContent = "Press R to restart";
    }
}

// Update the display of mistakes
function updateMistakes() {
    mistakesDisplay.textContent = `Mistakes: ${mistakes} ${"X".repeat(mistakes)}`;
}

// Render the 3x3 grid
function renderGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = ""; // Clear existing cards
    for (let i = 0; i < 9; i++) {
        const card = createCard(deck[i] || null);
        grid.appendChild(card);
    }
}

// Create a card element
function createCard(cardValue) {
    const card = document.createElement("div");
    card.className = "card";

    // Get the card suit and value
    const suit = getCardSymbol(cardValue);
    const value = getCardValue(cardValue);

    // Determine if the card is red or black
    const isRedCard = suit === "♥" || suit === "♦"; // Hearts and Diamonds are red
    card.classList.add(isRedCard ? "red-card" : "black-card");

    if (cardValue !== null) {
        // Display card value and suit
        card.innerHTML = `
            <span class="suit top-left">${suit}</span>
            <span class="card-center">${value}</span>
            <span class="suit bottom-right">${suit}</span>
        `;

        // Create button container
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "card-buttons";

        // Add up and down buttons
        const upButton = document.createElement("button");
        upButton.textContent = "↑";
        upButton.className = "card-button up";
        upButton.addEventListener("click", () => replaceCard(card, cardValue, true));

        const downButton = document.createElement("button");
        downButton.textContent = "↓";
        downButton.className = "card-button down";
        downButton.addEventListener("click", () => replaceCard(card, cardValue, false));

        // Append buttons to the container
        buttonContainer.appendChild(upButton);
        buttonContainer.appendChild(downButton);

        // Append button container to the card
        card.appendChild(buttonContainer);
    }

    return card;
}

// Replace a card
function replaceCard(cardElement, currentCard, isUp) {
    if (deck.length === 0) return;

    // Get the next card
    const nextCard = deck.shift();

    // Check for mistakes
    const nextValue = nextCard % 13 || 13; // Normalize value (1-13)
    const currentValue = currentCard % 13 || 13;
    if ((isUp && nextValue <= currentValue) || (!isUp && nextValue >= currentValue)) {
        mistakes++;
        updateMistakes();
    }

    // Get the next card's suit and value
    const suit = getCardSymbol(nextCard);
    const value = getCardValue(nextCard);

    // Determine if the next card is red or black
    const isRedCard = suit === "♥" || suit === "♦"; // Hearts and Diamonds are red
    cardElement.classList.remove("red-card", "black-card");
    cardElement.classList.add(isRedCard ? "red-card" : "black-card");

    // Update card in the grid
    cardElement.innerHTML = `
        <span class="suit top-left">${suit}</span>
        <span class="card-center">${value}</span>
        <span class="suit bottom-right">${suit}</span>
    `;

    // Create button container
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "card-buttons";

    // Add buttons to the new card
    const upButton = document.createElement("button");
    upButton.textContent = "↑";
    upButton.className = "card-button up";
    upButton.addEventListener("click", () => replaceCard(cardElement, nextCard, true));

    const downButton = document.createElement("button");
    downButton.textContent = "↓";
    downButton.className = "card-button down";
    downButton.addEventListener("click", () => replaceCard(cardElement, nextCard, false));

    // Append buttons to the container
    buttonContainer.appendChild(upButton);
    buttonContainer.appendChild(downButton);

    // Append button container to the card
    cardElement.appendChild(buttonContainer);

    // Update cards left display
    updateCardsLeft();
}


// Get card symbol (suits)
function getCardSymbol(card) {
    const suits = ["♠", "♥", "♦", "♣"];
    const suitIndex = Math.floor((card - 1) / 13);
    return suits[suitIndex]; // Returns the suit symbol
}

// Get card value (A, 2-10, J, Q, K)
function getCardValue(card) {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    return values[(card - 1) % 13]; // Returns the card value
}

// Restart the game when R is pressed
document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "r" && deck.length === 0) {
        initializeGame();
    }
});

// Initialize game on load
window.onload = function () {
    cardsLeftDisplay = document.getElementById("cards-left");
    mistakesDisplay = document.getElementById("mistakes");
    initializeGame();
};
