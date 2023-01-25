window.onload = async function() {
    let wordsFile = await fetch("words.txt");
    let wordsText = await wordsFile.text();

    addKeyDownListener();
    const WORDS = wordsText.toLowerCase().split('\r\n');
    let randomIndex = Math.floor(Math.random() * WORDS.length);
    let answer = Array.from(WORDS.splice(randomIndex, 1)[0]);
    console.log(answer);

    let guess = [];

    const rows = ["A", "B", "C", "D", "E", "F"];
    let currentRowByClassTile = 0;
    let currentRowByIndex = rows[0];
    let currentTile = "A1"

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

    function isCorrect() {
        return JSON.stringify(guess) === JSON.stringify(answer);
    }

    function enterPressed() {
        let i = currentRowByClassTile; let j = 0;

        let interval = setInterval(function() {
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
                
                if (isCorrect()) {
                    console.log("That's correct!");
                } else {
                    console.log("That's incorrect :(");
                    goToNextRow();
                    clearGuess();
                    addKeyDownListener();
                }
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
}

