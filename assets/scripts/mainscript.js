//Constructor that stores a question string, an array of answer strings, and the index to the correct answer
function MultipleChoiceQuestion(question, answers, correctAnswerIndex) {
    this.question = question;
    this.answers = answers;
    this.correctAnswerIndex = correctAnswerIndex;
}

var questionDisplay;

window.onload = function () {
    let questionArray = buildQuestionArray();
    let currentAnswers;
    questionDisplay = document.querySelector('#question-display');

    displayQuestion(questionArray[1]);

    currentAnswers = document.getElementById('question-list');
    currentAnswers.addEventListener('click', checkUserAnswer);
}

function checkUserAnswer(e) {
    console.log(e.target.getAttribute('data-index'));
}

//Displays a MultipleChoiceQuestion to the questionDisplay
function displayQuestion(mcQuestion) {
    //Create elements needed in a multiple choice question
    let question = document.createElement('h3');
    let answers = document.createElement('div');

    //Set text content
    question.textContent = mcQuestion.question;
    answers.setAttribute('id', 'question-list');

    for (let i = 0; i < mcQuestion.answers.length; i++) {
        let answerI = document.createElement('button');
        answerI.textContent = mcQuestion.answers[i];
        answerI.setAttribute('data-index', i);

        //Randomize answer order
        if (Math.random() > 0.5) {
            answers.prepend(answerI);
        }
        else {
            answers.appendChild(answerI);
        }
    }

    //Append to questionDisplay
    questionDisplay.appendChild(question);
    questionDisplay.appendChild(answers);
}

//Creates all MultipleChoiceQuestion objects and returns as an array
function buildQuestionArray() {
    let allQuestions = new Array();

    allQuestions[0] = new MultipleChoiceQuestion(
        'How many licks does it take to get to the center of a tootsie pop?',
        [
            '1',
            '2',
            '3',
            '4'
        ],
        1
    );
    allQuestions[1] = new MultipleChoiceQuestion(
        'Why did the chicken cross the road?',
        [
            'To get to the other side.',
            'Because it wanted to.',
            'Just for fun!',
            'lol wut?'
        ],
        3
    );
    allQuestions[2] = new MultipleChoiceQuestion(
        'How old is the sun?',
        [
            '23000 years',
            '52000 years',
            '24 days',
            'yesterday'
        ],
        3
    );

    return allQuestions;
}