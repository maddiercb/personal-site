let dictionary = {};
let sentence = []; 
let currentWord = '';

fetch('dict.json')
  .then(response => response.json())
  .then(data => {
    dictionary = data; 
  })
  .catch(error => {
    console.error('Error loading dictionary:', error);
  });

// Start the game with the starting word
function startGame() {
  const startingWord = document.getElementById('starting-word').value.trim().toLowerCase();
  
  if (startingWord && isValidWord(startingWord)) {
    currentWord = startingWord;
    
    // Capitalize the first letter of the first word
    sentence = [capitalizeFirstLetter(currentWord)];
    
    document.getElementById('start-game').style.display = 'none';
    updateSentenceDisplay();
    showNextWords(currentWord);

    updateGameControlsVisibility();
  } else {
    alert('no one has ever used that word.\nliterally ever.\ntry again bro');
  }
}

// Display the current sentence at the top of the page
function updateSentenceDisplay() {
  document.getElementById('sentence').innerText = sentence.join(' ');
  updateGameControlsVisibility();
}

// Show next possible words for the current word
function showNextWords(word) {
  const nextWordsContainer = document.getElementById('next-words-container');
  nextWordsContainer.innerHTML = '';

  // If currentWord is empty, don't show any words
  if (!word) {
    nextWordsContainer.innerHTML = 'No more words available.';
    return;
  }

  // Determine the first letter of the current word
  const firstLetter = word[0].toLowerCase();
  
  // Check if the letter category exists
  if (dictionary[firstLetter] && dictionary[firstLetter][word]) {
    const nextWords = dictionary[firstLetter][word];
    
    // Create buttons for each next word
    nextWords.forEach(nextWord => {
      const button = document.createElement('button');
      button.innerText = nextWord;
      button.classList.add('word-button');
      button.onclick = () => selectNextWord(nextWord);
      nextWordsContainer.appendChild(button);
    });

    // Add a custom word button with input field inside
    const customWordButton = document.createElement('button');
    customWordButton.classList.add('word-button');
    customWordButton.classList.add('custom-word-button');

    const customWordInput = document.createElement('input');
    customWordInput.type = 'text';
    customWordInput.id = 'custom-word';
    customWordInput.placeholder = 'Type custom word';

    const checkmarkButton = document.createElement('button');
    checkmarkButton.innerText = '☑ ';
    checkmarkButton.classList.add('checkmark-button');
    checkmarkButton.onclick = () => addCustomWord(customWordInput.value, customWordButton);

    customWordButton.appendChild(customWordInput);
    customWordButton.appendChild(checkmarkButton);
    nextWordsContainer.appendChild(customWordButton);
  } else {
    nextWordsContainer.innerHTML = 'No more words available.';
  }
}

// When a word is selected, add it to the sentence
function selectNextWord(word) {
  sentence.push(word);
  currentWord = word;
  updateSentenceDisplay();
  showNextWords(currentWord);
}

// Add the custom word to the sentence
function addCustomWord(word, button) {
  word = word.trim().toLowerCase();
  if (word) {
    sentence.push(word);
    currentWord = word;
    updateSentenceDisplay();
    showNextWords(currentWord);
    button.remove(); 
  } else {
    alert('Invalid custom word!');
  }
}

// End the sentence when the period button is clicked
function endSentence() {
  if (sentence.length > 0) {
    sentence[sentence.length - 1] += '.';
    updateSentenceDisplay();
    document.getElementById('next-words-container').innerHTML = '';
    alert('Your sentence is complete: ' + sentence.join(' '));
  }
}

// Delete the last word in the sentence
function deleteWord() {
  if (sentence.length > 0) {
    sentence.pop();
    currentWord = sentence[sentence.length - 1] || '';
    updateSentenceDisplay();
    showNextWords(currentWord);
  }
}

// Validate if the word exists in the dictionary
function isValidWord(word) {
  const firstLetter = word[0].toLowerCase();
  return dictionary[firstLetter] && dictionary[firstLetter][word];
}

// Capitalize the first letter of a word
function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Hide or show game controls based on sentence length
function updateGameControlsVisibility() {
  const gameControls = document.getElementById('game-controls');
  if (sentence.length >= 2) {
    gameControls.style.display = 'block';
  } else {
    gameControls.style.display = 'none';
  }
}
