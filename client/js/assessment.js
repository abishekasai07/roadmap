// ============================================
// SkillPath AI - Assessment
// ============================================


// ============================================
// MOCK QUESTIONS
// ============================================

const mockQuestions = [

    {
        id: 1,
        skillId: 1,

        text:
            "Which data type is commonly used to store a whole number in C?",

        options: [
            "float",
            "int",
            "double",
            "char"
        ],

        answer: 1,
        difficulty: "beginner"
    },


    {
        id: 2,
        skillId: 1,

        text:
            "What is the output of: int x = 5; printf(\"%d\", x + 2);",

        options: [
            "5",
            "7",
            "52",
            "Error"
        ],

        answer: 1,
        difficulty: "beginner"
    },


    {
        id: 3,
        skillId: 1,

        text:
            "Which operator is used to access the value stored at a pointer?",

        options: [
            "&",
            "*",
            "#",
            "@"
        ],

        answer: 1,
        difficulty: "intermediate"
    },


    {
        id: 4,
        skillId: 1,

        text:
            "Which loop executes at least once?",

        options: [
            "for",
            "while",
            "do-while",
            "if"
        ],

        answer: 2,
        difficulty: "intermediate"
    },


    {
        id: 5,
        skillId: 1,

        text:
            "In Embedded C, why is volatile commonly used for hardware-related variables?",

        options: [
            "It makes code faster",
            "It prevents compiler assumptions about external changes",
            "It allocates memory dynamically",
            "It converts integers"
        ],

        answer: 1,
        difficulty: "advanced"
    }

];


// ============================================
// INITIALIZE
// ============================================

assessmentQuestions =
    mockQuestions.slice(
        0,
        Math.min(
            15,
            Math.max(
                5,
                mockQuestions.length
            )
        )
    );


currentQuestionIndex = 0;

assessmentAnswers = [];


// ============================================
// DOM
// ============================================

const questionCounter =
    document.getElementById(
        "questionCounter"
    );

const questionNumber =
    document.getElementById(
        "questionNumber"
    );

const questionText =
    document.getElementById(
        "questionText"
    );

const optionsContainer =
    document.getElementById(
        "options"
    );

const progressBar =
    document.getElementById(
        "assessmentProgress"
    );

const nextButton =
    document.getElementById(
        "nextBtn"
    );

const previousButton =
    document.getElementById(
        "prevBtn"
    );

const resultContainer =
    document.getElementById(
        "assessmentResult"
    );


// ============================================
// RENDER QUESTION
// ============================================

function renderQuestion(question) {

    if (!question) return;


    questionCounter.textContent =
        `Question ${
            currentQuestionIndex + 1
        } of ${
            assessmentQuestions.length
        }`;


    questionNumber.textContent =
        String(
            currentQuestionIndex + 1
        ).padStart(2, "0");


    questionText.textContent =
        question.text;


    const percentage =
        (
            (
                currentQuestionIndex + 1
            )
            /
            assessmentQuestions.length
        ) * 100;


    progressBar.style.width =
        `${percentage}%`;


    optionsContainer.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "option";


            button.textContent =
                option;


            const previousAnswer =
                assessmentAnswers[
                    currentQuestionIndex
                ];


            if (
                previousAnswer &&
                previousAnswer.selectedOption === index
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                () => selectAnswer(index)
            );


            optionsContainer
                .appendChild(button);

        }
    );


    previousButton.disabled =
        currentQuestionIndex === 0;


    nextButton.textContent =
        currentQuestionIndex ===
        assessmentQuestions.length - 1

            ? "Finish Assessment"

            : "Next →";

}


// ============================================
// SELECT ANSWER
// ============================================

function selectAnswer(answerIndex) {

    const question =
        assessmentQuestions[
            currentQuestionIndex
        ];


    assessmentAnswers[
        currentQuestionIndex
    ] = {

        questionId:
            question.id,

        skillId:
            question.skillId,

        selectedOption:
            answerIndex,

        correct:
            answerIndex === question.answer,

        difficulty:
            question.difficulty

    };


    renderQuestion(question);

}


// ============================================
// NEXT
// ============================================

function nextQuestion() {

    if (
        !assessmentAnswers[
            currentQuestionIndex
        ]
    ) {

        showToast(
            "Please select an answer first.",
            "error"
        );

        return;

    }


    if (
        currentQuestionIndex <
        assessmentQuestions.length - 1
    ) {

        currentQuestionIndex++;

        renderQuestion(
            assessmentQuestions[
                currentQuestionIndex
            ]
        );

    } else {

        finishAssessment();

    }

}


// ============================================
// PREVIOUS
// ============================================

function previousQuestion() {

    if (
        currentQuestionIndex > 0
    ) {

        currentQuestionIndex--;

        renderQuestion(
            assessmentQuestions[
                currentQuestionIndex
            ]
        );

    }

}


// ============================================
// FINISH
// ============================================

function finishAssessment() {

    const answeredQuestions =
        assessmentAnswers.filter(
            answer => answer
        );


    const correctAnswers =
        answeredQuestions.filter(
            answer =>
                answer.correct
        );


    assessmentConfidence =
        Math.round(
            (
                correctAnswers.length
                /
                assessmentQuestions.length
            ) * 100
        );


    const status =
        assessmentConfidence >= 80
            ? "VERIFIED"
            : "REVIEW REQUIRED";


    assessmentResult = {

        status,

        confidence:
            assessmentConfidence,

        skillLevels:
            learnerSkills.map(
                skill => ({

                    skillId:
                        skill.skillId,

                    level:
                        skill.proficiency

                })
            )

    };


    sessionStorage.setItem(
        "assessmentAnswers",
        JSON.stringify(
            assessmentAnswers
        )
    );


    sessionStorage.setItem(
        "assessmentResult",
        JSON.stringify(
            assessmentResult
        )
    );


    resultContainer.classList.remove(
        "hidden"
    );


    if (
        assessmentConfidence >= 80
    ) {

        resultContainer.innerHTML = `

            <h3>
                ✓ Assessment Complete
            </h3>

            <p>
                Your assessment confidence is
                <strong>
                    ${assessmentConfidence}%
                </strong>
            </p>

            <p>
                Your demonstrated competency can
                now be used for career analysis.
            </p>

            <button
                class="btn btn-primary"
                onclick="location.href='profile.html'"
            >
                View My Skill DNA →
            </button>

        `;


        // Mark selected skills verified
        learnerSkills =
            learnerSkills.map(
                skill => ({

                    ...skill,

                    verified: true

                })
            );


        saveState();


        nextButton.disabled =
            true;

    } else {

        resultContainer.innerHTML = `

            <h3>
                Assessment Needs Review
            </h3>

            <p>
                Score:
                <strong>
                    ${assessmentConfidence}%
                </strong>
            </p>

            <p>
                Strengthen the weak concepts
                and try again.
            </p>

            <button
                class="btn btn-secondary"
                onclick="location.reload()"
            >
                Retake Assessment
            </button>

        `;

    }

}


// ============================================
// BUTTON EVENTS
// ============================================

nextButton.addEventListener(
    "click",
    nextQuestion
);


previousButton.addEventListener(
    "click",
    previousQuestion
);


// ============================================
// START
// ============================================

renderQuestion(
    assessmentQuestions[0]
);