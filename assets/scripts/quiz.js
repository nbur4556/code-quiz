//Constructor that stores a question string, an array of answer strings, and the index to the correct answer
function MultipleChoiceQuestion(question, answers, correctAnswerIndex) {
    this.question = question;
    this.answers = answers;
    this.correctAnswerIndex = correctAnswerIndex;
}

var questionArray;
var questionDisplay;
var score = 0;
var secondsRemaining = 1000;

window.onload = function () {
    questionArray = buildQuestionArray();
    questionDisplay = document.querySelector('#question-display');

    //Quiz timer
    let timerDisplay = document.querySelector('#display-timer');
    timerDisplay.textContent = secondsRemaining;
    let countdown = setInterval(function () {
        secondsRemaining--;
        timerDisplay.textContent = secondsRemaining;

        //Time runs out
        if (secondsRemaining <= 0) {
            timerDisplay.textContent = 0;
            displayScore();
            clearInterval(countdown);
        }
    }, 1000);

    //Display random question
    setCurrentQuestion();
}

//Check if answer is correct
function checkUserAnswer(e) {
    let resultText = document.querySelector('#question-result');
    let timePenalty = 10;

    //If answer is correct increase score, otherwise subtract from time remaining
    if (e.target.getAttribute('data-correct') == 'true') {
        score++
        resultText.textContent = 'Correct';
    }
    else {
        secondsRemaining -= timePenalty;
        resultText.textContent = 'Incorrect';
    }

    //If more questions are available display next question, otherwise display score
    if (questionArray.length > 0) {
        setCurrentQuestion();
    }
    else {
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
    question.setAttribute('class', 'card-header');
    answers.setAttribute('id', 'question-list');
    answers.setAttribute('class', 'list-group');

    //Create and append answers as buttons
    for (let i = 0; i < mcQuestion.answers.length; i++) {
        let answerI = document.createElement('button');
        answerI.textContent = mcQuestion.answers[i];
        answerI.setAttribute('class', 'list-group-item btn btn-primary');
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

//Show score to user, and give option to enter name and submit for high score
function displayScore() {
    clearDisplay();

    //Text that displays current quiz score
    let scoreMessage = document.createElement('h3');
    scoreMessage.textContent = ("Your score is: " + score);

    //Input group containers for styling
    let inputGroup = document.createElement('div');
    let inputBtnAppend = document.createElement('div');
    inputGroup.setAttribute('class', 'input-group');
    inputBtnAppend.setAttribute('class', 'input-group-append');

    //Input box to enter name and save as high score
    let nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Enter name');
    nameInput.setAttribute('id', 'score-name');
    nameInput.setAttribute('class', 'form-control');

    //Button to submit name to high score
    let submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.setAttribute('class', 'btn btn-primary');
    submitBtn.addEventListener('click', function () {
        //Add name and score to high score and load high scores page
        addToHighScores(nameInput.value, score);
        location.href = '../../high-scores.html';
    });

    //Append all score display children to screen
    inputGroup.appendChild(nameInput);
    inputBtnAppend.appendChild(submitBtn);
    inputGroup.appendChild(inputBtnAppend)
    questionDisplay.appendChild(scoreMessage);
    questionDisplay.appendChild(inputGroup);
}

//Remove all children of display element
function clearDisplay() {
    while (questionDisplay.children[0]) {
        questionDisplay.removeChild(questionDisplay.children[0]);
    }
}

//Creates all MultipleChoiceQuestion objects and returns as an array
function buildQuestionArray() {
    let allQuestions = new Array();

    allQuestions[0] = new MultipleChoiceQuestion(
        'Which of these elements is an inline element?',
        [
            '<div>',
            '<p>',
            '<span>',
            '<header>'
        ],
        2
    );
    allQuestions[1] = new MultipleChoiceQuestion(
        'How do you add CSS styling to an HTML document?',
        [
            'As a seperate file, and linked through the <link> tag',
            'In <style> tags located in the <head> of the document',
            'In style attributes on each HTML element',
            'All three are acceptable options'
        ],
        3
    );
    allQuestions[2] = new MultipleChoiceQuestion(
        'What is NOT part of the CSS box model?',
        [
            'color',
            'padding',
            'margin'
        ],
        0
    );
    allQuestions[3] = new MultipleChoiceQuestion(
        'What type of variable can not be changed once defined?',
        [
            'let',
            'const',
            'var'
        ],
        1
    );
    allQuestions[4] = new MultipleChoiceQuestion(
        'The DOM (Document Object Model) allows you to dynamically change the HTML of a document using JavaScript.',
        [
            'True',
            'False'
        ],
        0
    );
    allQuestions[5] = new MultipleChoiceQuestion(
        'What would you use to execute a block of code only if a condition is true',
        [
            'For Loop',
            'Conditional',
            'Function',
            'Object'
        ],
        1
    );
    allQuestions[6] = new MultipleChoiceQuestion(
        'Which of these returns a true or false boolean?',
        [
            'alert("Would you like to continue?")',
            'prompt("Would you like to continue?")',
            'confirm("Would you like to continue?")'
        ],
        2
    );
    allQuestions[7] = new MultipleChoiceQuestion(
        'How do you check that two variables are equal to the same value and variable type?',
        [
            '=',
            '==',
            '==='
        ],
        0
    );
    allQuestions[8] = new MultipleChoiceQuestion(
        'Which of these is an object?',
        [
            '{ a: 0, b: 1, c: 2 }',
            '[ a: 0, b: 1, c: 2 ]',
            '[ a, b, c ]',
            '{ 0, 1, 2 }'
        ],
        0
    );
    allQuestions[9] = new MultipleChoiceQuestion(
        'What does the return statement in a function do?',
        [
            'Allows the function to continue, and returns a value from the function',
            'Returns to the previous page',
            'Stops the function, and returns a value from the function',
            'Returns to the begining of the function, and executes again'
        ],
        2
    );
    allQuestions[10] = new MultipleChoiceQuestion(
        'What tag is introduced in HTML5?',
        [
            '<table>',
            '<article>',
            '<script>'
        ],
        1
    );
    allQuestions[11] = new MultipleChoiceQuestion(
        'Which of these is a correct for loop?',
        [
            'while(i < 10)',
            'for(i < 10)',
            'for(i = 0; i < 10; i++)',
            'for(i = 0; i < 10)'
        ],
        2
    );
    allQuestions[12] = new MultipleChoiceQuestion(
        'What does a do/while loop do?',
        [
            'Loops a set number of times',
            'Loops while a condition is true',
            'Loops at least once, and continues to loop while a condition is true'
        ],
        2
    );
    allQuestions[13] = new MultipleChoiceQuestion(
        'Which of these is a correct while loop?',
        [
            'for(i < 10)',
            'while(i = 0; i < 10; i++)',
            'while(i < 10)'
        ],
        2
    );
    allQuestions[14] = new MultipleChoiceQuestion(
        'Which of these is an array?',
        [
            '< a, b, c >',
            '{ a, b, c }',
            '[ a, b, c ]',
            '( a, b, c )'
        ],
        2
    );
    allQuestions[15] = new MultipleChoiceQuestion(
        'Which of these is NOT a feature of Bootstrap?',
        [
            'Responsive Layout',
            'Prebuilt Components',
            'Grid System',
            'Simplified DOM Traversal'
        ],
        3
    );
    allQuestions[16] = new MultipleChoiceQuestion(
        'How do you store data in the users local storage?',
        [
            'localStorage( VALUE )',
            'local( VALUE )',
            'localStorage( KEY, VALUE )',
            'local( KEY, VALUE )'
        ],
        2
    );
    allQuestions[17] = new MultipleChoiceQuestion(
        'JavaSript objects are containers for key:value pairs.',
        [
            'True',
            'False'
        ],
        0
    );
    allQuestions[18] = new MultipleChoiceQuestion(
        'Bootstrap is a library included in your browser. It does not have to be installed.',
        [
            'True',
            'False'
        ],
        1
    );
    allQuestions[19] = new MultipleChoiceQuestion(
        'Which of these is the operator for multiplication?',
        [
            'x',
            '*',
            'X'
        ],
        1
    );
    allQuestions[20] = new MultipleChoiceQuestion(
        'Which of these will give a random integer between 1 and 10?',
        [
            'Math.random() * 10',
            'Math.floor( Math.random() * 10 ) + 1',
            'Math.floor( Math.random() * 10 )',
            '( Math.random() * 10 ) + 1'
        ],
        1
    );
    allQuestions[21] = new MultipleChoiceQuestion(
        'How do you write to the console in the browser?',
        [
            'console()',
            'console.log()',
            'Debug.log()'
        ],
        1
    );
    allQuestions[22] = new MultipleChoiceQuestion(
        'What type of value is returned from a prompt?',
        [
            'float',
            'integer',
            'boolean',
            'string'
        ],
        3
    );
    allQuestions[23] = new MultipleChoiceQuestion(
        'What is the value of Number("Hello World")?',
        [
            'null',
            'undefined',
            'NaN'
        ],
        2
    );
    allQuestions[24] = new MultipleChoiceQuestion(
        'How do you change background color in CSS?',
        [
            'background-color',
            'backgroundColor'
        ],
        0
    );

    return allQuestions;
}