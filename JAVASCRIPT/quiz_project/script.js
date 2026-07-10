const questions = [
    {
        question: "What house is Harry Potter sorted into?",
        answers: [
            { text: "Slyterin", correct: false},
            { text: "Ravenclaw", correct: false},
            { text: "Gryffindor", correct: true},
            { text: "Hufflepuff", correct: false},
        ]
    },
    {
        question: "What is the name of Harry Potter owl?",
        answers: [
            { text: "Crookshanks",correct: false},
            { text: "Scabbers",correct: false},
            { text: "Errol",correct: false},
            { text: "Hedwig",correct: true},
        ]
    },
    {
        question: "Who is the headmaster of Hogwarts for most of the series?",
        answers: [
            { text: "Sererus Snape",correct: false},
            { text: "Albus Dumbledore",correct: true},
            { text: "Minerva McGonagall",correct: false},
            { text: "Remus Lupin",correct: false},
        ]
    },
    {
        question: "Which spell is used to disarm an opponent?",
        answers: [
            { text: "Lumos",correct: false},
            { text: "Avada Kedara",correct: false},
            { text: "Expecto Patronum",correct: false},
            { text: "Expelliarmus",correct: true},
        ]
    },
    {
        question: "What position does Harry play on the Gryffindor Quidditch team?",
        answers: [
            { text: "Keeper",correct: false},
            { text: "Chaser",correct: false},
            { text: "Seeker",correct: true},
            { text: "Beater",correct: false},
        ]
    },
    {
        question: "Who is Harry Potter's best female friend?",
        answers: [
            { text: "Luna Lovegood",correct: false},
            { text: "Ginny Weasley",correct: false},
            { text: "Cho Chang",correct: false},
            { text: "Hermione Granger",correct: true},
        ]
    },
    {
        question: "What platform does the Hogwart Express leave from?",
        answers: [
            { text: "Platform 7 3/4",correct: false},
            { text: "Platform 8 3/4",correct: false},
            { text: "Platform 9 3/4",correct: true}, 
            { text: "Platform 10 3/4",correct: false},
        ]
    },
    {
        question: "Who is Harry Potter's main enemy throughout the series?",
        answers: [
            { text: "Lord Voldemort",correct: true},
            { text: "Draco Malfoy",correct: false},
            { text: "Sirius Black",correct: false},
            { text: "Bellatrix Lestrange",correct: false},
        ]
    },
    {
        question: "What is the name of the prison guarded by Dementors?",
        answers: [
            { text: "Hogwart",correct: false},
            { text: "Gringotts",correct: false},
            { text: "Azkaban",correct: true},
            { text: "Diagon Alley",correct: false},
        ]
    },
    {
        question: "Which magical object contains pieces of Voldemort's soul?",
        answers: [
            { text: "Pensieve",correct: false},
            { text: "Horcrux",correct: true},
            { text: "Philosopher's Stone",correct: false},
            { text: "Time-Turner",correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();