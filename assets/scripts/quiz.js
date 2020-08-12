//Constructor that stores a question string, an array of answer strings, and the index to the correct answer
function MultipleChoiceQuestion(question, answers, correctAnswerIndex) {
    this.question = question;
    this.answers = answers;
    this.correctAnswerIndex = correctAnswerIndex;
}

var questionArray;
var questionDisplay;
var score = 0;
var secondsRemaining = 60;

window.onload = function () {
    questionArray = buildQuestionArray();
    questionDisplay = document.querySelector('#question-display');

    //Quiz timer
    let timerDisplay = document.querySelector('#display-timer');
    timerDisplay.textContent = secondsRemaining;
    let countdown = setInterval(function () {
        secondsRemaining--;
        timerDisplay.textContent = secondsRemaining;

        if (secondsRemaining <= 0) {
            displayScore();
            clearInterval(countdown);
        }
    }, 1000);

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

    //Text that displays current quiz score
    let scoreMessage = document.createElement('h3');
    scoreMessage.textContent = ("Your score is: " + score);

    //Input box to enter name and save as high score
    let nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Enter name');
    nameInput.setAttribute('id', 'score-name');

    //Button to submit name to high score
    let submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.setAttribute('class', 'btn btn-primary');
    submitBtn.addEventListener('click', function () {
        //Add name and score to high score
        addToHighScores(nameInput.value, score);
    });

    //Append all score display children to screen
    questionDisplay.appendChild(scoreMessage);
    questionDisplay.appendChild(nameInput);
    questionDisplay.appendChild(submitBtn);
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
        'Inside which HTML element do we put the JavaScript?',
        [
            '<script>',
            '<javascript>',
            '<scripting>',
            '<js>'
        ],
        0
    );
    allQuestions[1] = new MultipleChoiceQuestion(
        'What is the correct JavaScript syntax to change the content of this HTML element? <p id="demo">This is a demonstration.</p>',
        [
            'document.getElementByName("p").innerHTML = "Hello World!";  ',
            'document.getElementById("demo").innerHTML = "Hello World!";  ',
            '#demo.innerHTML = "Hello World!";',
            'document.getElement("p").innerHTML = "Hello World!";'
        ],
        1
    );
    allQuestions[2] = new MultipleChoiceQuestion(
        'Where is the correct place to insert a JavaScript?',
        [
            'The <body> section',
            'The <head> section',
            'Both the <head> section and the <body> section are correct  '
        ],
        2
    );
    allQuestions[3] = new MultipleChoiceQuestion(
        'What is the correct syntax for referring to an external script called "xxx.js"?',
        [
            '<script src="xxx.js">',
            '<script name="xxx.js">',
            '<script href="xxx.js">'
        ],
        0
    );
    allQuestions[4] = new MultipleChoiceQuestion(
        'The external JavaScript file must contain the <script> tag.',
        [
            'True',
            'False'
        ],
        1
    );
    allQuestions[5] = new MultipleChoiceQuestion(
        'How do you write "Hello World" in an alert box?',
        [
            'msg("Hello World");',
            'alert("Hello World");',
            'alertBox("Hello World");',
            'msgBox("Hello World");'
        ],
        1
    );
    allQuestions[6] = new MultipleChoiceQuestion(
        'How do you create a function in JavaScript?',
        [
            'function = myFunction()',
            'function:myFunction()',
            'function myFunction()'
        ],
        2
    );
    allQuestions[7] = new MultipleChoiceQuestion(
        'How do you call a function named "myFunction"?',
        [
            'myFunction()  ',
            'call myFunction()',
            'call function myFunction()'
        ],
        0
    );
    allQuestions[8] = new MultipleChoiceQuestion(
        'How to write an IF statement in JavaScript?',
        [
            'if (i == 5)',
            'if i = 5',
            'if i = 5 then',
            'if i == 5 then'
        ],
        0
    );
    allQuestions[9] = new MultipleChoiceQuestion(
        'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        [
            'if (i <> 5)',
            'if i =! 5 then',
            'if (i != 5)',
            'if i <> 5'
        ],
        2
    );
    allQuestions[10] = new MultipleChoiceQuestion(
        'How does a WHILE loop start?',
        [
            'while i = 1 to 10',
            'while (i <= 10)',
            'while (i <= 10; i++)'
        ],
        1
    );
    allQuestions[11] = new MultipleChoiceQuestion(
        'How does a FOR loop start?',
        [
            'for i = 1 to 5',
            'for (i = 0; i <= 5)',
            'for (i = 0; i <= 5; i++)',
            'for (i <= 5; i++)'
        ],
        2
    );
    allQuestions[12] = new MultipleChoiceQuestion(
        'How can you add a comment in a JavaScript?',
        [
            '//This is a comment',
            "'This is a comment",
            '<!--This is a comment-->'
        ],
        0
    );
    allQuestions[13] = new MultipleChoiceQuestion(
        'How to insert a comment that has more than one line?',
        [
            '//This comment has more than one line//',
            '<!--This comment has more than one line-->',
            '/*This comment has more than one line*/'
        ],
        2
    );
    allQuestions[14] = new MultipleChoiceQuestion(
        'How do you round the number 7.25, to the nearest integer?',
        [
            'Math.rnd(7.25)',
            'round(7.25)',
            'Math.round(7.25)',
            'rnd(7.25)'
        ],
        2
    );
    allQuestions[15] = new MultipleChoiceQuestion(
        'What is the correct way to write a JavaScript array?',
        [
            'var colors = "red", "green", "blue"',
            'var colors = ["red", "green", "blue"]',
            'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
            'var colors = (1:"red", 2:"green", 3:"blue")'
        ],
        1
    );
    allQuestions[16] = new MultipleChoiceQuestion(
        'How do you find the number with the highest value of x and y?',
        [
            'ceil(x, y)',
            'top(x, y)',
            'Math.max(x, y)',
            'Math.ceil(x, y)'
        ],
        2
    );
    allQuestions[17] = new MultipleChoiceQuestion(
        'What is the correct JavaScript syntax for opening a new window called "w2" ?',
        [
            'w2 = window.new("http://www.w3schools.com");',
            'w2 = window.open("http://www.w3schools.com");'
        ],
        1
    );
    allQuestions[18] = new MultipleChoiceQuestion(
        'JavaScript is the same as Java.',
        [
            'True',
            'False'
        ],
        1
    );
    allQuestions[19] = new MultipleChoiceQuestion(
        "How can you detect the client's browser name?",
        [
            'browser.name',
            'navigator.appName',
            'client.navName'
        ],
        1
    );
    allQuestions[20] = new MultipleChoiceQuestion(
        'Which event occurs when the user clicks on an HTML element?',
        [
            'onchange',
            'onclick',
            'onmouseclick',
            'onmouseover'
        ],
        1
    );
    allQuestions[21] = new MultipleChoiceQuestion(
        'How do you declare a JavaScript variable?',
        [
            'v carName;',
            'variable carName;',
            'var carName;'
        ],
        2
    );
    allQuestions[22] = new MultipleChoiceQuestion(
        'Which operator is used to assign a value to a variable?',
        [
            '-',
            'X',
            '*',
            '='
        ],
        3
    );
    allQuestions[23] = new MultipleChoiceQuestion(
        'What will the following code return: Boolean(10 > 9)',
        [
            'NaN',
            'false',
            'true'
        ],
        2
    );
    allQuestions[24] = new MultipleChoiceQuestion(
        'Is JavaScript case-sensitive?',
        [
            'Yes',
            'No'
        ],
        0
    );

    return allQuestions;
}