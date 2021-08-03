
let wordList = [ "actor", "airplane", "airport", "army", "baseball", "beef", "birthday", "boy", "brush", "bushes", "butter", "cast", "cave", "cent", "cherries", "cherry", "cobweb", "coil", "cracker", "dinner", "eggnog", "elbow", "face", "fireman", "flavor", "gate", "glove", "glue", "goldfish", "goose", "grain", "hair", "haircut", "hobbies", "holiday", "hot", "jellyfish", "ladybug", "mailbox", "number", "oatmeal", "pail", "pancake", "pear", "pest", "popcorn", "queen", "quicksand", "quiet", "quilt", "rainstorm", "scarecrow", "scarf", "stream", "street", "sugar", "throne", "toothpaste", "twig", "volleyball", "wood", "wrench"]

function getRandomInt (max){
    return Math.floor(Math.random() * max);
}

let word = wordList[getRandomInt(wordList.length)];
let lettersGuessed = ""
let wordBoard = document.getElementById("wordBoard")
let letterInput = document.getElementById("letterInput")
let enterLetterButton = document.getElementById("enterLetterBtn")
let newGameButton = document.getElementById("newGame")
let incorrectLettersEl = document.getElementById("incorrectLetters")
let incorrectLettersDiv = document.getElementById("incorrectDiv")
let gameText = document.getElementById("gameText")
let gameOverDiv = document.getElementById("gameOver")
let incorrectLetters = ""
let remainingGuesses = 5
let gameOver = false;

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

newGameButton.addEventListener("click",function () {
    word = wordList[getRandomInt(wordList.length)];
    gameOver = false;
    incorrectLetters= "";
    lettersGuessed = "";
    remainingGuesses = 5;
    gameOverDiv.classList.add("hidden")
    wordBoard.textContent = ""
    for (let i = 0; i < word.length; i++) {
        console.log(word[i])
        lettersGuessed += "_";
    }

    updateBoard()
    incorrectLettersEl.textContent = ""
    incorrectLettersDiv.classList.add("hidden")
    gameText.textContent = "Enter a letter below:"
})

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
    letterInput.value = "";

    if (letter == "" || gameOver || incorrectLetters.includes(letter)) {
        return;
    }

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
        if (checkWin()) {
            gameText.textContent = "You guessed the word!";
            gameOverDiv.classList.remove("hidden");
            gameOver = true;
        }
    } else {
        incorrectLettersDiv.classList.remove("hidden")
        incorrectLetters += letter;
        if (remainingGuesses > 1) {
            remainingGuesses--;
            gameText.innerHTML = "You have <strong>" + remainingGuesses + "</strong> guesses remaining."
        } else {
            gameText.innerHTML = "Sorry you ran out of guesses. The word was <strong>" + word + "</strong>";
            gameOverDiv.classList.remove("hidden");
            gameOver = true;
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
