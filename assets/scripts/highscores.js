const highScoresKey = 'high-scores';

function displayHighScores() {
    let allHighScores = loadHighScores();
    let highScoreDisplay = document.querySelector('#high-score-display');
    let scoresContainer = document.createElement('ol');

    for (let i = 0; i < allHighScores.length; i++) {
        let highScore = document.createElement('li');
        highScore.textContent = (allHighScores[i].name + ": " + allHighScores[i].score);

        scoresContainer.appendChild(highScore);
    }

    highScoreDisplay.appendChild(scoresContainer);
}

function addToHighScores(name, score) {
    let allHighScores = loadHighScores();
    console.log(allHighScores);

    let i = 0
    do {
        //Insert score when new score is greater than indexed score
        if (allHighScores[i] == undefined || score > allHighScores[i].score) {
            allHighScores.splice(i, 0, { name: name, score: score });
            break;
        }

        i++;
    } while (i <= allHighScores.length)

    //Remove the lowest score if length of allHighScores is greater than 10
    if (allHighScores.length > 10) {
        allHighScores.splice(allHighScores.length - 1, 1);
    }

    saveHighScores(allHighScores);
}

//Save high scores to local storage
function saveHighScores(highScores) {
    let highScoresString = JSON.stringify(highScores);
    localStorage.setItem(highScoresKey, highScoresString);
}

function loadHighScores() {
    let highScoresString = localStorage.getItem(highScoresKey);

    //If high-scores exists in localStorage, return parsed data, otherwise return new emptyn array
    if (highScoresString != null) {
        return JSON.parse(highScoresString);
    }
    else {
        return new Array();
    }
}