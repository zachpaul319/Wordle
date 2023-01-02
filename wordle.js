const answer = "HELLO";
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

function removeLetterFromDisplay() {
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

document.getElementsByTagName("body")[0].addEventListener("keydown", function() {
    let keyPressed = String(keyPress(window.event));
    
    if (keyPressed == "Enter") {
        console.log(keyPressed);
    } else if (keyPressed == "Backspace") {
        goToPreviousTile(currentTile);
        removeLetterFromDisplay();
        removeLetterFromGuess(keyPressed);
    } else {
        displayLetter(keyPressed);
        goToNextTile(currentTile);
        addLetterToGuess(keyPressed);
    }
});
