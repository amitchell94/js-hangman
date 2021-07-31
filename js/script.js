
let word = "hello"
let lettersGuessed = ""
let wordBoard = document.getElementById("wordBoard")
let letterInput = document.getElementById("letterInput")
let enterLetterButton = document.getElementById("enterLetterBtn")
let incorrectLettersEl = document.getElementById("incorrectLetters")
let gameText = document.getElementById("gameText")
let incorrectLetters = ""
let remainingGuesses = 5

enterLetterButton.addEventListener("click",function () {
    guessLetter(letterInput.value)
})

// Execute a function when the user releases a key on the keyboard
letterInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        guessLetter(letterInput.value)
    }
});

wordBoard.textContent = ""
for (let i = 0; i < word.length; i++) {
    console.log(word[i])
    lettersGuessed += "_";
}

updateBoard();
function updateBoard () {
    wordBoard.textContent = "";
    for (let i = 0; i < lettersGuessed.length; i++) {
        wordBoard.textContent += lettersGuessed[i] + " "
    }
}

function guessLetter(letter) {
    let correctLetter = false;
    for (let i = 0; i < word.length; i++) {
        if (letter == word[i]) {
            let tempStr = ""
            for (let j = 0; j < lettersGuessed.length; j++) {
                if (i == j) {tempStr += letter} else {tempStr += lettersGuessed[j]}
            }
            lettersGuessed = tempStr;
            correctLetter = true;
        }
    }
    if (correctLetter) {
        updateBoard();
        if (checkWin()) { gameText.textContent = "You guessed the word!"}
    } else {
        incorrectLetters += letter;
        if (remainingGuesses > 1) {
            remainingGuesses--;
            gameText.textContent = "You have " + remainingGuesses + " guesses remaining."
        } else {
            gameText.textContent = "Sorry you ran out of guesses"
        }
        updateIncLetters();
    }
}

function updateIncLetters() {
    let text = "";
    for (let i = 0; i < incorrectLetters.length; i++) {
        text += incorrectLetters[i] + " "
    }
    incorrectLettersEl.textContent = text;
}

function checkWin () {
    for (let i = 0; i < lettersGuessed.length; i++) {
        if (lettersGuessed[i] == "_") {
            return false;
        }
    }
    return true;
}
/*  https://api.datamuse.com/words?rel_trg=zoo */