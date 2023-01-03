const answer = "hello";
var guess = [];
var currentTile = "A1"
var rows = ["A", "B", "C", "D", "E", "F"];
var currentRow = rows[0];

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

function changeAllTilesInRow() {
    var i = 0;
    var interval = setInterval(function() {
        if (guess[i] == answer[i]) {
            changeTileColor(i, "green");
        } else if (answer.includes(guess[i])) {
            changeTileColor(i, "gold");
        } else {
            changeTileColor(i, "grey")
        }

        if (++i == 5) clearInterval(interval);
    }, 250)
}

function addKeyDownListener() {
    document.getElementsByTagName("body")[0].addEventListener("keydown", function() {
        let keyPressed = String(keyPress(window.event));
        
        if (guess.length == 5 && keyPressed == "Enter") {
            changeAllTilesInRow();
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
}
