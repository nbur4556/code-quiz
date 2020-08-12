allHighScores = [
    { name: 'Josh', score: 10 },
    { name: 'Sage', score: 7 },
    { name: 'Trevor', score: 5 },
    { name: 'Sophie', score: 1 },
    { name: 'Nick', score: 0 }
];

function addToHighScores(name, score) {
    let i = 0
    do {
        //Insert score when new score is greater than indexed score
        if (allHighScores[i] == undefined || score > allHighScores[i].score) {
            allHighScores.splice(i, 0, { name: name, score: score });
            break;
        }

        i++;
    } while (i <= allHighScores.length)
}