const questions = [

    {
        question: "CPU ka full form kya hai?",

        options: [
            "Central Processing Unit",
            "Computer Processing Unit",
            "Central Program Unit",
            "Computer Program Unit"
        ],

        answer: 0
    },


    {
        question: "Computer ka brain kise kaha jata hai?",

        options: [
            "Monitor",
            "CPU",
            "Keyboard",
            "Mouse"
        ],

        answer: 1
    },


    {
        question: "MS Word ka use kisliye kiya jata hai?",

        options: [
            "Document banane ke liye",
            "Video editing ke liye",
            "Music sunne ke liye",
            "Internet connection ke liye"
        ],

        answer: 0
    },


    {
        question: "RAM ka full form kya hai?",

        options: [
            "Read Access Memory",
            "Random Access Memory",
            "Run Access Memory",
            "Random Application Memory"
        ],

        answer: 1
    },


    {
        question: "Keyboard me Enter key ka use kya hai?",

        options: [
            "Command execute karne ke liye",
            "Computer band karne ke liye",
            "Sound badhane ke liye",
            "Screen lock karne ke liye"
        ],

        answer: 0
    },


    {
        question: "Internet par website open karne ke liye kis software ka use hota hai?",

        options: [
            "Browser",
            "Calculator",
            "Notepad",
            "Paint"
        ],

        answer: 0
    },


    {
        question: "Excel kis type ka software hai?",

        options: [
            "Spreadsheet",
            "Video Editor",
            "Antivirus",
            "Browser"
        ],

        answer: 0
    },


    {
        question: "HTML ka full form kya hai?",

        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Markup Language",
            "Home Text Markup Language"
        ],

        answer: 0
    },


    {
        question: "Computer me data permanently store karne ke liye kya use hota hai?",

        options: [
            "RAM",
            "Hard Disk / SSD",
            "Keyboard",
            "Mouse"
        ],

        answer: 1
    },


    {
        question: "Windows kis company ka operating system hai?",

        options: [
            "Google",
            "Microsoft",
            "Apple",
            "Intel"
        ],

        answer: 1
    }

];


let currentQuestion = 0;

let userAnswers =
    new Array(questions.length).fill(null);

let timeLeft = 30 * 60;

let examSubmitted = false;


// Load Question
function loadQuestion() {

    const question =
        questions[currentQuestion];

    document.getElementById("questionNumber")
        .textContent = currentQuestion + 1;

    document.getElementById("questionText")
        .textContent = question.question;


    const optionsContainer =
        document.getElementById("optionsContainer");

    optionsContainer.innerHTML = "";


    question.options.forEach(function(option, index) {

        const optionDiv =
            document.createElement("div");

        optionDiv.className = "option";


        const radio =
            document.createElement("input");

        radio.type = "radio";

        radio.name = "answer";

        radio.value = index;

        radio.id = "option" + index;


        if (userAnswers[currentQuestion] === index) {

            radio.checked = true;

        }


        radio.addEventListener("change", function() {

            userAnswers[currentQuestion] =
                Number(this.value);

        });


        const label =
            document.createElement("label");

        label.htmlFor = "option" + index;

        label.textContent = option;


        optionDiv.appendChild(radio);

        optionDiv.appendChild(label);

        optionsContainer.appendChild(optionDiv);

    });


    // Previous Button

    document.getElementById("previousBtn")
        .style.display =
        currentQuestion === 0
        ? "none"
        : "inline-block";


    // Next Button

    document.getElementById("nextBtn")
        .style.display =
        currentQuestion === questions.length - 1
        ? "none"
        : "inline-block";


    // Submit Button

    document.getElementById("submitBtn")
        .style.display =
        currentQuestion === questions.length - 1
        ? "inline-block"
        : "none";

}


// Next Question

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    }

}


// Previous Question

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

}


// Timer

const timerInterval =
    setInterval(function() {

        let minutes =
            Math.floor(timeLeft / 60);

        let seconds =
            timeLeft % 60;


        seconds =
            seconds < 10
            ? "0" + seconds
            : seconds;


        document.getElementById("timer")
            .textContent =
            minutes + ":" + seconds;


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            submitExam();

        }


        timeLeft--;

    }, 1000);


// Submit Exam

function submitExam() {

    if (examSubmitted) {
        return;
    }

    examSubmitted = true;


    let score = 0;


    questions.forEach(function(question, index) {

        if (
            userAnswers[index] ===
            question.answer
        ) {

            score++;

        }

    });


    localStorage.setItem(
        "examScore",
        score
    );


    localStorage.setItem(
        "totalQuestions",
        questions.length
    );


    localStorage.setItem(
        "examAnswers",
        JSON.stringify(userAnswers)
    );


    clearInterval(timerInterval);


    window.location.href =
        "result.html";

}


// Start Question

loadQuestion();
