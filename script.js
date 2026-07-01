// Данные теста
const questions = [
    {
        question: "Как вы чувствуете себя по утрам?",
        answers: [
            { text: "Просыпаюсь с энергией и желанием жить", score: 4 },
            { text: "Нормально, но нужно время чтобы проснуться", score: 3 },
            { text: "С трудом, чувствую усталость", score: 2 },
            { text: "Не хочу вставать, всё раздражает", score: 1 }
        ]
    },
    {
        question: "Как легко вы принимаете решения?",
        answers: [
            { text: "Легко и быстро, доверяю интуиции", score: 4 },
            { text: "Иногда сомневаюсь, но решаю", score: 3 },
            { text: "Долго колеблюсь, боюсь ошибиться", score: 2 },
            { text: "Избегаю решений вообще", score: 1 }
        ]
    },
    {
        question: "Что вы чувствуете, думая о будущем?",
        answers: [
            { text: "Вдохновение и предвкушение", score: 4 },
            { text: "Спокойствие и уверенность", score: 3 },
            { text: "Тревогу и неуверенность", score: 2 },
            { text: "Страх и безнадёжность", score: 1 }
        ]
    },
    {
        question: "Как складываются ваши отношения с близкими?",
        answers: [
            { text: "Гармонично, чувствую поддержку", score: 4 },
            { text: "Нормально, бывают мелкие конфликты", score: 3 },
            { text: "Напряжённо, часто недопонимание", score: 2 },
            { text: "Конфликтно или полное отчуждение", score: 1 }
        ]
    },
    {
        question: "Как обстоят дела с финансами?",
        answers: [
            { text: "Деньги приходят легко, есть изобилие", score: 4 },
            { text: "Стабильно, хватает на всё необходимое", score: 3 },
            { text: "Постоянная нехватка, живу от зарплаты до зарплаты", score: 2 },
            { text: "Критическая ситуация, долги", score: 1 }
        ]
    }
];

// Результаты
const results = {
    high: {
        level: "⚡⚡⚡⚡⚡",
        title: "Высокий уровень энергии!",
        description: "Ваша Матрица работает гармонично. Вы находитесь в потоке и чувствуете жизненную силу.",
        sleeping: [
            "Все энергии активны и работают на вас",
            "Продолжайте поддерживать этот баланс"
        ],
        recommendation: "Отличное время для новых начинаний! Используйте эту энергию для реализации важных проектов. Практикуйте благодарность, чтобы сохранить этот уровень."
    },
    medium: {
        level: "⚡⚡⚡⚡",
        title: "Средний уровень энергии",
        description: "Есть небольшие дисбалансы, но в целом вы справляетесь. Некоторые энергии требуют внимания.",
        sleeping: [
            "Энергия творчества - требует активации",
            "Энергия изобилия - работает не в полную силу",
            "Возможны блоки в коммуникации"
        ],
        recommendation: "Начните с медитации 10 минут в день. Обратите внимание на то, что забирает вашу энергию, и постепенно устраняйте эти факторы."
    },
    low: {
        level: "⚡⚡⚡",
        title: "Низкий уровень энергии",
        description: "Ваша Матрица показывает признаки выгорания. Несколько ключевых энергий спят или работают в минусе.",
        sleeping: [
            "Энергия радости - заблокирована",
            "Энергия здоровья - требует восстановления",
            "Энергия отношений - нуждается в гармонизации",
            "Финансовая энергия - утечка ресурсов"
        ],
        recommendation: "Первый шаг - восстановите режим сна. Ложитесь до 23:00 и спите 7-8 часов. Это запустит процесс восстановления энергий."
    },
    critical: {
        level: "⚡⚡",
        title: "Критический уровень энергии",
        description: "Ваша Матрица сигнализирует о серьёзном выгорании. Большинство энергий спят или работают против вас.",
        sleeping: [
            "Все основные энергии требуют срочной активации",
            "Энергия жизни - критически низкая",
            "Энергия предназначения - потеряна связь",
            "Энергия любви к себе - заблокирована",
            "Энергия действия - паралич воли"
        ],
        recommendation: "Срочно нужна перезагрузка! Возьмите паузу хотя бы на 3 дня. Отключитесь от соцсетей, проведите время на природе. Запишитесь на консультацию для глубокой работы с Матрицей."
    }
};

// Переменные состояния
let currentQuestion = 0;
let totalScore = 0;

// DOM элементы
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progressBar = document.getElementById('progress');

// Начать тест
startBtn.addEventListener('click', () => {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    totalQuestionsSpan.textContent = questions.length;
    showQuestion();
});

// Показать вопрос
function showQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestion + 1;
    
    // Обновить прогресс-бар
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    
    // Очистить старые ответы
    answersContainer.innerHTML = '';
    
    // Добавить новые ответы
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.addEventListener('click', () => selectAnswer(answer.score));
        answersContainer.appendChild(button);
    });
}

// Выбрать ответ
function selectAnswer(score) {
    totalScore += score;
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Показать результаты
function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    // Определить результат
    let result;
    if (totalScore >= 17) {
        result = results.high;
    } else if (totalScore >= 13) {
        result = results.medium;
    } else if (totalScore >= 9) {
        result = results.low;
    } else {
        result = results.critical;
    }
    
    // Заполнить данные
    document.getElementById('energy-level').textContent = result.level;
    document.getElementById('result-title').textContent = result.title;
    document.getElementById('result-description').textContent = result.description;
    document.getElementById('recommendation-text').textContent = result.recommendation;
    
    // Заполнить список спящих энергий
    const sleepingList = document.getElementById('sleeping-list');
    sleepingList.innerHTML = '';
    result.sleeping.forEach(energy => {
        const li = document.createElement('li');
        li.textContent = energy;
        sleepingList.appendChild(li);
    });
}

// Перезапустить тест
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    totalScore = 0;
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
});