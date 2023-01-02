/*TODO:
    * Start page with empty tiles
    * Start on tile A1
    * When key pressed:
        *If key is backspace:
            Remove letter and go back to previous tile
        *Else: 
            *Add key to guess String 
            *Change value of current tile to the key pressed
            *Change tile to next tile
    * After all tiles for row filled:
        *When "Enter" pressed:
            Iterate through row and check all tiles
            If guess is correct:
                wait for all color changes, then handle winning
            Else:
                Wait for color switches, then head to next row */

const answer = "HELLO";
var guess = [];
var currentTile = "A1"

function keyPress(e) {
    return e.key;
}

function displayLetter(key) {
    document.getElementById(currentTile).value = key.toUpperCase();
}

function removeLetter() {
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
        removeLetter();
    } else {
        displayLetter(keyPressed);
        goToNextTile(currentTile);
    }
});
