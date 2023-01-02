const answer = "hello";
var guess = [];
var currentTile = "A1"

function keyPress(e) {
    return e.key;
}

function addLetterToGuess(letter) {
    guess.push(letter);
}

function removeLetterFromGuess(letter) {
    guess.pop(letter);
}

function displayLetter(key) {
    document.getElementById(currentTile).value = key.toUpperCase();
}

function removeDisplayedLetter() {
    document.getElementById(currentTile).value = "";
}

function goToNextTile(current) {
    let nextTile = current[0] + String(Number(current[1]) + 1);
    currentTile = nextTile;
}

function goToPreviousTile(current) {
    let col = Number(current[1]);
    if (col > 1) {
        let previousTile = current[0] + String(col - 1);
        currentTile = previousTile;
    }
}

function isCorrect() {
}

function changeTileColors() {
    const tiles = document.getElementsByClassName("tile");

    for (let i = 0; i < 5; i++) {
        if (guess[i] == answer[i]) {
            tiles[i].style.backgroundColor = "green";
        } else if (answer.includes(guess[i])) {
            tiles[i].style.backgroundColor = "gold";
        } else {
            tiles[i].style.backgroundColor = "grey";
        }
        tiles[i].style.color = "white";
    }
}

document.getElementsByTagName("body")[0].addEventListener("keydown", function() {
    let keyPressed = String(keyPress(window.event));
    
    if (guess.length == 5 && keyPressed == "Enter") {
        changeTileColors();
    } else if (keyPressed == "Backspace") {
        goToPreviousTile(currentTile);
        removeDisplayedLetter();
        removeLetterFromGuess(keyPressed);
    } else {
        displayLetter(keyPressed);
        goToNextTile(currentTile);
        addLetterToGuess(keyPressed);
    }
});
