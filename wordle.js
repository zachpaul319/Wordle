window.onload = async function() {
    const wordsFile = await fetch("words.txt");
    const wordsText = await wordsFile.text();
    const WORDS = wordsText.toLowerCase().split('\r\n');

    addKeyDownListener();

    document.getElementsByClassName("tile")[0].addEventListener("click", function() {document.getElementsByClassName("tile")[0].focus();})

    let randomIndex = Math.floor(Math.random() * WORDS.length);
    const ANSWER = Array.from(WORDS.splice(randomIndex, 1)[0]);
    console.log(ANSWER);

    let guess = [];

    let currentTile = document.getElementsByClassName("tile")[0];
    let currentTileIndex = 0;
    let currentRow = 0;

    function keyPress(e) {
        return e.key;
    }

    function addLetterToGuess(letter) {
        guess.push(letter);
    }

    function removeLetterFromGuess() {
        guess.pop();
    }

    function displayLetter(key) {
        currentTile.value = key.toUpperCase();
    }

    function removeDisplayedLetter() {
        currentTile.value = "";
    }

    function goToNextTile() {
        currentTileIndex += 1;
        currentTile = document.getElementsByClassName("tile")[currentTileIndex];
    }

    function goToPreviousTile() {
        if (currentTileIndex >= currentRow + 1) {
            currentTileIndex -= 1;
            currentTile = document.getElementsByClassName("tile")[currentTileIndex];
        }
    }

    function changeTileColor(i, color) {
        const tiles = document.getElementsByClassName("tile");
        tiles[i].style.backgroundColor = color;
        tiles[i].style.color = "white";
    }

    function goToNextRow() {
        currentRow += 5;
        currentTile = document.getElementsByClassName("tile")[currentRow];
    }

    function clearGuess() {
        guess = [];
    }

    function isCorrect() {
        return JSON.stringify(guess) === JSON.stringify(ANSWER);
    }

    function enterPressed() {
        let i = currentRow; let j = 0;

        let interval = setInterval(function() {
            if (guess[j] === ANSWER[j]) {
                changeTileColor(i, "green");
            } else if (ANSWER.includes(guess[j])) {
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
            goToPreviousTile();
            removeDisplayedLetter();
            removeLetterFromGuess();
        } else {
            if (currentTileIndex < currentRow + 5) {
                addLetterToGuess(keyPressed);
                displayLetter(keyPressed);
                goToNextTile();
            }
        }        
    }

    function addKeyDownListener() {
        document.getElementsByTagName("body")[0].addEventListener("keydown", handleKeyPressed);
    }

    function removeKeyDownListener() {
        document.getElementsByTagName("body")[0].removeEventListener("keydown", handleKeyPressed);
    }
}

