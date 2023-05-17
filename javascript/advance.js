const serializedUser = sessionStorage.getItem("user");
const USER = JSON.parse(serializedUser);
const userId = USER.userId;
const username = USER.username;
const password = USER.password;
let currentLevel = USER.currentLevel;

incrementCurrentLevel();

function advance() {
    window.location.replace("wordle.html");
}

function incrementCurrentLevel() {
    const auth = "Basic " + btoa(username + ":" + password);
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": auth
        }
    }

    const url = "http://192.168.0.72/wordle/php/www/rest.php/users/" + userId;

    fetch(url, options)
    .then(response => response.json())
    .then(incrementCurrentLevelResponseHandler())
    .catch(error => console.log(error));
}

function incrementCurrentLevelResponseHandler() {
    USER.currentLevel = ++currentLevel;
    sessionStorage.setItem("user", JSON.stringify(USER));
}

function showAnswer() {
    document.getElementById("answer").innerHTML = sessionStorage.getItem("answer");
}