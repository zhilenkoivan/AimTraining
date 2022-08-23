const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const scoreOnline = document.querySelector('.score-online');
const reloadBtn = document.querySelector('.button-reload');
const colors = ['#e73c3c', '#777', '#3489db', '#e67e22', '#2ecc71', 'pink', '#9932CC', '#00FFFF', '#A52A2A', '#F4A460'];
let time = 0;
let score = 0;
startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){
        score++;
        scoreOnline.innerHTML = `score: ${score}`;
        event.target.classList.add('end');
        setTimeout(() =>{
            event.target.remove();
            createRandomCircle();
        }, 50 );
    }
})
reloadBtn.addEventListener('click', () => {
    location.reload();
});
function startGame() {
    setInterval(decreaseTime, 1050)
    createRandomCircle();
    setTime(time);    
}

function decreaseTime() {
    if(time === 0){
        finishGame();
    } else {
        let current = --time;
        if(current<10){
            current = `0${current}`;
        }
        setTime(current);
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
    
}
function finishGame() {
    reloadBtn.style.display = 'block';
    timeEl.parentNode.classList.add('hide');
    scoreOnline.innerHTML = ` `;
    board.innerHTML = `<h1 class='final'>Ваш счет: <span class="primary">${score}</span></h1>`;

}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(20, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size - 2);
    const y = getRandomNumber(0, height - size - 2 );

    circle.classList.add('circle');

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    setColor(circle);
    board.append(circle);
}
function setColor(element) {
    const color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 10px ${color}`;
}
function getRandomColor() {
    const index =Math.floor(Math.random() * colors.length)
    return colors[index]
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);

}