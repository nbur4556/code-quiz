//Constructor that stores a question string, an array of answer strings, and the index to the correct answer
function MultipleChoiceQuestion(question, answers, correctAnswerIndex) {
    this.question = question;
    this.answers = answers;
    this.correctAnswerIndex = correctAnswerIndex;
}

var questionArray;
var questionDisplay;
var score = 0;

window.onload = function () {
    questionArray = buildQuestionArray();
    questionDisplay = document.querySelector('#question-display');

    //Display random question
    setCurrentQuestion();
}

//Check if answer is correct
function checkUserAnswer(e) {
    //If answer is correct, increase score
    if (e.target.getAttribute('data-correct') == 'true') {
        score++
    }


    if (questionArray.length > 0) {
        //Display next question
        setCurrentQuestion();
    }
    else {
        //Score Page
        displayScore();
    }
}

//Get random question from questionArray, remove the array, and set listeners
function setCurrentQuestion() {
    let displayIndex = Math.floor(Math.random() * questionArray.length);

    //Remove previous question and display new question
    clearDisplay();
    displayQuestion(questionArray[displayIndex]);

    //Remove current question object from index
    questionArray.splice(displayIndex, 1);

    //Setup Listeners
    document.getElementById('question-list').addEventListener('click', checkUserAnswer);
}

//Displays a MultipleChoiceQuestion to the questionDisplay
function displayQuestion(mcQuestion) {
    //Create elements needed in a multiple choice question
    let question = document.createElement('h3');
    let answers = document.createElement('div');

    //Set text content
    question.textContent = mcQuestion.question;
    answers.setAttribute('id', 'question-list');

    //Create and append answers as buttons
    for (let i = 0; i < mcQuestion.answers.length; i++) {
        let answerI = document.createElement('button');
        answerI.textContent = mcQuestion.answers[i];
        answerI.setAttribute('class', 'btn btn-primary');
        answerI.setAttribute('type', 'button');

        //Set attribute showing if answer is correct or not
        if (i == mcQuestion.correctAnswerIndex) {
            answerI.setAttribute('data-correct', 'true');
        }
        else {
            answerI.setAttribute('data-correct', 'false');
        }

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

function displayScore() {
    clearDisplay();

    //Testing
    addToHighScores('Me', score);

    let scoreMessage = document.createElement('h3');
    scoreMessage.textContent = ("Your score is: " + score);

    questionDisplay.appendChild(scoreMessage);
}

function clearDisplay() {
    while (questionDisplay.children[0]) {
        questionDisplay.removeChild(questionDisplay.children[0]);
    }
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
    allQuestions[3] = new MultipleChoiceQuestion(
        'How many legs does the typical dog have?',
        [
            'One',
            'Two',
            'Three',
            'Four',
        ],
        3
    );

    return allQuestions;
}