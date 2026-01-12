// arcade-generator.js

document.addEventListener("DOMContentLoaded", () => {
    initArcadeGallery();
});

function initArcadeGallery() {
    const cardsContainer = document.getElementById("arcadeCards");
    if (!cardsContainer) return;

    cardsContainer.innerHTML = "";

    games.forEach(g => {
        if (!g.include) return;
        cardsContainer.appendChild(createGameCartridge(g));
    });
}

function createGameCartridge(game) {
    const tile = document.createElement("div");
    tile.className = "game-tile";
    tile.onclick = () => {
        if (game.link) window.location.href = game.link;
    };

    tile.innerHTML = `
        <div class="cartridge">
            <div class="label">${game.title}</div>
            <img class="cover-art" src="${game.image}" alt="${game.title}">
        </div>
        <div class="game-description">${game.description || ""}</div>
    `;

    return tile;
}
