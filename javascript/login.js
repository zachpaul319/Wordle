let username, password;

class User {
    constructor(userId, username, password, currentLevel, levelsHash) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.currentLevel = currentLevel;
        this.levelsHash = levelsHash;
    }
}

function allFieldsFilledOut() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    return !(username == "" || password == "");
}

function validate() {
    if (allFieldsFilledOut()) {
        getUser();
    } 
    else {
        alert("Please fill out all fields");
    }
}

function getUser() {
    const auth = "Basic " + btoa(username + ":" + password);
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": auth
        }
    }

    const url = "http://192.168.0.72/wordle/php/www/rest.php/users";

    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            getUserResponseHandler(json);
        })
        .catch(error => {console.log(error)});
}

function getUserResponseHandler(json) {
    const data = json.data;
    const levelsHash = JSON.parse(data.levelsHash);

    const user = new User(data.userId, username, password, data.currentLevel, levelsHash);
    sessionStorage.setItem("user", JSON.stringify(user));

    window.location.href = "wordle.html";
}