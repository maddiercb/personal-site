
PLAINTEXT = "SCHMIDT";

// get container id gameTextContainer
const gameTextContainer = document.getElementById("gameTextContainer");

// create a div for each letter in the plaintext
for (let i = 0; i < PLAINTEXT.length; i++) {
    const letterDiv = document.createElement("div");
    letterDiv.classList.add("letter");
    letterDiv.textContent = PLAINTEXT[i];
    gameTextContainer.appendChild(letterDiv);
}

