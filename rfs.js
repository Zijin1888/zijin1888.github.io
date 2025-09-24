
const questions = [
    {
        question: "我的生日是哪天？",
        options: [
            { text: "8.18", score: 2 },
            { text: "8.31", score: 1 },
            { text: "12.18", score: 1 }
        ]
    },
    {
        question: "我最喜欢的什么颜色？",
        options: [
            { text: "蓝色", score: 1 },
            { text: "粉色", score: 1 },
            { text: "以上皆是", score: 2 }
        ]
    },
    {
        question: "我喜欢吃香菇吗？",
        options: [
            { text: "喜欢", score: 0 },
            { text: "不喜欢", score: 2 },
            { text: "香菇戴斯ki", score: -1 }
        ]
    },
    {
        question: "我喜欢吃什么水果？",
        options: [
            { text: "柿子", score: 2 },
            { text: "荔枝", score: 2 },
            { text: "苹果", score: 1 },
            { text: "哈密瓜", score: 0 }
        ]
    },
    {
        question: "我最喜欢一天里的什么时候？",
        options: [
            { text: "早上", score: 2 },
            { text: "下午", score: 1 },
            { text: "晚上", score: 0 },
            { text: "半夜", score: 1 }
        ]
    },
    {
        question: "我喜欢什么生日礼物？",
        options: [
            { text: "黄金万两！！", score: 3 },
            { text: "手写信", score: 3 },
            { text: "萌萌的娃娃", score: 2 },
            { text: "转账一万", score: 3 },
        ]
    },
    {
        question: "我剧本杀最吃什么线？",
        options: [
            { text: "自爱", score: 3 },
            { text: "委屈", score: 2.5 },
            { text: "亲情", score: 2 },
            { text: "不知道哇我不玩剧本杀", score: 1 },
        ]
    },
    {
        question: "奶茶五选一！",
        options: [
            { text: "喜茶--椰椰芒芒（老版）", score: 2 },
            { text: "星巴克--摩卡可可星冰乐", score: 4 },
            { text: "梨村--茉莉酒酿麻薯", score: 3 },
            { text: "???--香菇酸菜奶茶", score: 0 },
            { text: "linlee--草莓柠檬茶（加冻冻版）", score: 1 }
        ]
    },
    {
        question: "睡一天or忙一天",
        options: [
            { text: "睡一天", score: 0 },
            { text: "忙一天", score: 1 }
        ]
    },
    {
    question: "心理学家or程序员",
        options: [
            { text: "心理学家", score: 1 },
            { text: "程序员", score: 0 }
        ]
    },
    {
    question: "养猫or养狗",
        options: [
            { text: "猫猫", score: 2 },
            { text: "修狗", score: 1 }
        ]
    },
    {
    question: "mbti or 星座",
        options: [
            { text: "mbti", score: 1 },
            { text: "星座", score: -1 }
        ]
    },
    {
    question: "北京路or正佳广场",
        options: [
            { text: "北京路", score: 2 },
            { text: "正佳广场", score: 1 }
        ]
    },
]

let currentQuestion = 0;
let totalScore = 0;

// DOM元素
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const progressElement = document.getElementById('progress');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const resultElement = document.getElementById('realfriend_result'); // 修改ID
const restartButton = document.getElementById('restart-btn');

// 初始化测试
function initQuiz() {
    showQuestion();
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);
}

// 显示问题
function showQuestion() {
    if(!questionElement){
        console.error('questionElement is null');
        return;
    }
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }
    
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option.text;
        optionElement.addEventListener('click', () => selectOption(optionElement, option));
        optionsElement.appendChild(optionElement);
    });
    
    updateProgress();
}

// 选择选项
function selectOption(optionElement, option) {
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    optionElement.classList.add('selected');
    totalScore += option.score;
}

// 更新进度条
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressElement.style.width = `${progress}%`;
}

// 下一题
function nextQuestion() {
    if (!document.querySelector('.option.selected')) {
        alert('请选择一个选项！');
        return;
    }
    
    currentQuestion++;
    showQuestion();
}

// 显示结果
function showResult() {
    let result = "";
    if (totalScore >= 15) {
        result = "真朋友😻";
    } else if (totalScore >= 10) {
        result = "一般般吧🫨";
    } else {
        result = "逊！！完全不认识我吧🫥";
    }
    
    resultElement.textContent = result;
    quizSection.classList.remove('active');
    resultSection.classList.add('active');
}

// 重新开始测试
function restartQuiz() {
    currentQuestion = 0;
    totalScore = 0;
    resultSection.classList.remove('active');
    quizSection.classList.add('active');
    showQuestion();
}

// 启动测试
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
});