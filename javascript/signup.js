let username, password;

class NewUserRequest {
    constructor(username, password, levelsHash) {
        this.username = username;
        this.password = password;
        this.levelsHash = levelsHash;
    }

    toObject() {
        return {
            username: this.username,
            password: this.password,
            levelsHash: this.levelsHash
        };
    }
}

function allFieldsFilledOut() {
    username = document.getElementById("createUsername").value;
    password = document.getElementById("createPassword").value;
    return !(username == "" || password == "");
}

async function createAccount() {
    if (allFieldsFilledOut()) {
        const levelsHash = await generateLevelsHash();
        const newUserRequest = new NewUserRequest(username, password, JSON.stringify(levelsHash));

        createNewUser(newUserRequest);
    }
    else {
        alert("Please fill out all fields");
    }
}

function createNewUser(newUserRequest) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserRequest.toObject())
    }

    const url = "http://192.168.0.72/wordle/php/www/rest.php/users";

    fetch(url, options)
    .then(response => response.json())
    .then(json => {
        createNewUserResponseHandler(json);
    })
    .catch(error => console.log(error));
}

function createNewUserResponseHandler(json) {
    if (json.status == 1) {
        alert("Username already taken");
    } else {
        window.location.href = "login.html";
        alert("Account created");
    }
}

async function generateLevelsHash() {
    const wordsFile = await fetch("../words.txt");
    const wordsText = await wordsFile.text();
    const WORDS = wordsText.toLowerCase().split('\r\n');
    const length = WORDS.length;

    let levelsHash = {};
    for (let i = 1; i <= length; i++) {
        let randomIndex = Math.floor(Math.random() * WORDS.length);
        levelsHash[i] = WORDS[randomIndex];
        WORDS.splice(randomIndex, 1);
    }

    return levelsHash;
}