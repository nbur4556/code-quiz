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

function saveHighScores(highScores) {
    let highScoresString = JSON.stringify(highScores);
    localStorage.setItem('high-scores', highScoresString);
}

function loadHighScores() {
    let highScoresString = localStorage.getItem('high-scores');

    if (highScoresString != null) {
        return JSON.parse(highScoresString);
    }
    else {
        return new Array();
    }
}