document.addEventListener('DOMContentLoaded', function () {

    let quizData = null;

    let questionBank = [];

    let currentQuestionIndex = 0;

    let score = 0;

    let answerSelected = false;


    // Hide question and result page initially

    document.getElementById('question-container').style.display = 'none';

    document.getElementById('results-container').style.display = 'none';


    // Load JSON

    fetch('quiz-data.json')

        .then(response => response.json())

        .then(data => {

            quizData = data;

            initSections();

        })

        .catch(error => {

            console.error('Error loading quiz data:', error);

        });



    // Initialize subject cards

    function initSections() {

        const sections =
            document.querySelectorAll('.section');


        sections.forEach(function (section) {

            section.addEventListener('click', function () {

                const currentSection =
                    this.getAttribute('data-section');


                startQuiz(currentSection);

            });

        });

    }



    // Start Quiz

    function startQuiz(section) {

        questionBank =
            quizData.sections[section].questions;


        currentQuestionIndex = 0;

        score = 0;

        answerSelected = false;


        // Hide home

        document.querySelector('.quiz-container').style.display =
            'none';


        // Show question page

        document.getElementById('question-container').style.display =
            'block';


        // Hide result

        document.getElementById('results-container').style.display =
            'none';


        showQuestion();

    }



    // Show Question

    function showQuestion() {

        const currentQuestion =
            questionBank[currentQuestionIndex];


        // Show question

        document.getElementById('question').innerHTML =
            currentQuestion.question;


        // Clear old feedback

        document.getElementById('feedback').innerHTML =
            '';


        // Reset answer

        answerSelected = false;


        let optionsHTML = '';


        // MCQ

        if (currentQuestion.questionType === 'mcq') {

            currentQuestion.options.forEach(function (option) {

                optionsHTML += `
                    <div class="option">
                        ${option}
                    </div>
                `;

            });

        }


        // Text

        else if (currentQuestion.questionType === 'text') {

            optionsHTML = `
                <input
                    type="text"
                    id="answer-input"
                    placeholder="Enter your answer"
                >
            `;

        }


        // Number

        else if (currentQuestion.questionType === 'number') {

            optionsHTML = `
                <input
                    type="number"
                    id="answer-input"
                    placeholder="Enter your answer"
                >
            `;

        }


        // Add options/input to page

        document.getElementById('options').innerHTML =
            optionsHTML;



        // MCQ option click

        if (currentQuestion.questionType === 'mcq') {

            const options =
                document.querySelectorAll('.option');


            options.forEach(function (option) {

                option.addEventListener('click', function () {


                    // Remove selected from all options

                    options.forEach(function (item) {

                        item.classList.remove('selected');

                    });


                    // Select clicked option

                    this.classList.add('selected');


                    // Store answer

                    answerSelected =
                        this.textContent.trim();


                    // Show feedback

                    if (
                        answerSelected ===
                        currentQuestion.answer
                    ) {

                        document.getElementById('feedback').innerHTML =
                            'Correct Answer!';

                        document.getElementById('feedback').style.color =
                            'green';

                    }

                    else {

                        document.getElementById('feedback').innerHTML =
                            `Wrong Answer! "${answerSelected}"`;

                        document.getElementById('feedback').style.color =
                            'red';

                    }

                });

            });

        }


        // Text / Number

        else {

            const input =
                document.getElementById('answer-input');


            input.addEventListener('input', function () {

                answerSelected =
                    this.value.trim();

            });

        }

    }



    // Next button

    document.getElementById('next-button')
        .addEventListener('click', function () {


            // Check if answer selected

            if (!answerSelected) {

                alert('Please select or enter an answer.');

                return;

            }


            const currentQuestion =
                questionBank[currentQuestionIndex];


            // MCQ answer

            if (currentQuestion.questionType === 'mcq') {

                if (
                    answerSelected ===
                    currentQuestion.answer
                ) {

                    score++;

                }

            }


            // Text answer

            else if (currentQuestion.questionType === 'text') {

                if (
                    answerSelected.toLowerCase() ===
                    currentQuestion.answer.toLowerCase()
                ) {

                    score++;

                }

            }


            // Number answer

            else if (currentQuestion.questionType === 'number') {

                if (
                    Number(answerSelected) ===
                    Number(currentQuestion.answer)
                ) {

                    score++;

                }

            }


            // Move to next question

            if (
                currentQuestionIndex <
                questionBank.length - 1
            ) {

                currentQuestionIndex++;

                showQuestion();

            }


            // Quiz completed

            else {

                document.getElementById('question-container')
                    .style.display = 'none';


                document.getElementById('results-container')
                    .style.display = 'block';


                document.getElementById('score')
                    .textContent = score;

            }

        });



    // Go to Home

    document.getElementById('home-btn')
        .addEventListener('click', function () {


            document.getElementById('results-container')
                .style.display = 'none';


            document.querySelector('.quiz-container')
                .style.display = 'grid';


            // Reset quiz

            currentQuestionIndex = 0;

            score = 0;

            answerSelected = false;

        });
});