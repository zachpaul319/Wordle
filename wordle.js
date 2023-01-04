const answer = "hello";
var guess = [];

const rows = ["A", "B", "C", "D", "E", "F"];
var currentRowByClassTile = 0;
var currentRowByIndex = rows[0];
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
    let col = Number(current[1]);
    if (col <= 5) {
        let nextTile = current[0] + String(col + 1);
        currentTile = nextTile;
    }
}

function goToPreviousTile(current) {
    let col = Number(current[1]);
    if (col > 1) {
        let previousTile = current[0] + String(col - 1);
        currentTile = previousTile;
    }
}

function changeTileColor(i, color) {
    const tiles = document.getElementsByClassName("tile")
    tiles[i].style.backgroundColor = color;
    tiles[i].style.color = "white";
}

function goToNextRow() {
    currentRowByClassTile += 5;
    currentRowByIndex = rows[currentRowByClassTile/5];
    currentTile = currentRowByIndex + "1";
}

function clearGuess() {
    guess = [];
}

function enterPressed() {
    var i = currentRowByClassTile; var j = 0;

    var interval = setInterval(function() {
        if (guess[j] === answer[j]) {
            changeTileColor(i, "green");
        } else if (answer.includes(guess[j])) {
            changeTileColor(i, "gold");
        } else {
            changeTileColor(i, "grey");
        }
        ++i;

        if (++j == 5) {
            clearInterval(interval);
            
            //The following three functions will be executed once each tile has been checked and changed
            goToNextRow();
            clearGuess();
            addKeyDownListener();
        };
    }, 250)
}

function handleKeyPressed() {
    let keyPressed = String(keyPress(window.event));
        
    if (guess.length == 5 && keyPressed == "Enter") {
        removeKeyDownListener();
        enterPressed();
    } else if (keyPressed == "Backspace") {
        goToPreviousTile(currentTile);
        removeDisplayedLetter();
        removeLetterFromGuess(keyPressed);
    } else {
        displayLetter(keyPressed);
        goToNextTile(currentTile);
        addLetterToGuess(keyPressed);
    }
}

function addKeyDownListener() {
    document.getElementsByTagName("body")[0].addEventListener("keydown", handleKeyPressed);
}

function removeKeyDownListener() {
    document.getElementsByTagName("body")[0].removeEventListener("keydown", handleKeyPressed);
}
