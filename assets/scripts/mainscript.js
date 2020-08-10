function MultipleChoiceQuestion(question, answers, correctAnswerIndex) {
    this.question = question;
    this.answers = answers;
    this.correctAnswerIndex = correctAnswerIndex;
}

var questionDisplay = document.querySelector('#question-display');

window.onload = function () {
    let questionArray = new Array();

    questionArray[0] = new MultipleChoiceQuestion(
        'How many licks does it take to get to the center of a tootsie pop?',
        [
            '1',
            '2',
            '3'
        ],
        1
    );
    questionArray[1] = new MultipleChoiceQuestion(
        'Why did the chicken cross the road?',
        [
            'To get to the other side.',
            'Because it wanted to.',
            'Just for fun!'
        ],
        3
    );
    questionArray[2] = new MultipleChoiceQuestion(
        'How old is the sun?',
        [
            '23000 years',
            '52000 years',
            '24 days'
        ],
        3
    );

    displayQuestion(questionArray[0]);

    return questionArray;
}

function displayQuestion(mcQuestion) {
    let question = document.createElement('h3');
    let answers = document.createElement('ol');

    question.textContent = mcQuestion.question;
    for (let i = 0; i < mcQuestion.answers.length; i++) {
        let answerI = document.createElement('li');
        answerI.textContent = mcQuestion.answers[i];
        answers.appendChild(answerI);
    }

    questionDisplay.appendChild(question);
    questionDisplay.appendChild(answers);
}