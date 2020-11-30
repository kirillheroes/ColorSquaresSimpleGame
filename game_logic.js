const field = document.getElementById("field");
const level = document.getElementById("level");
const timer = document.getElementById("timer");

const max_time = 20;
const max_size = 492;
const color_change_kof = 200;

let gridX = 2;
let timer_ID;
let cur_time = max_time;

start();

function start() {
    clearInterval(timer_ID);
    cur_time = max_time * 1000;
    timer_ID = setInterval(function() {
        timer.innerHTML = Math.round(cur_time / 1000);
        if (cur_time <= 0) {
            lose_by_timeout();
        }
        cur_time -= 100;
    }, 100);

    gridX = 2;

    build_field();
}

function build_field() {
    level.innerHTML = gridX - 1;
    field.innerHTML = "";
    
    const squaresCount = gridX*gridX;
    const size = max_size / gridX;
    const margin = Math.max(Math.floor(size / 30), 1);
    const realSize = size - margin;

    let increment = color_change_kof / level.innerHTML;

    let r = randInt(increment + 1, 255);
    let g = randInt(increment + 1, 255);
    let b = randInt(increment + 1, 255);
    let color = "rgb(" + r + ", " + g + ", " + b + ")";

    for (let index = 0; index < squaresCount; index++) {
        const elem = document.createElement("div");
        elem.className = "square";
        elem.id = index;
        elem.style.width = realSize + "px";
        elem.style.height = realSize + "px";
        elem.style.margin = margin + "px " + "0 0 " + margin + "px";
        elem.style.backgroundColor = color;
        
        field.appendChild(elem);
        elem.onclick = () => lose();
    }
    
    r = r - increment;
    g = g - increment;
    b = b - increment;
    color = "rgb(" + r + ", " + g + ", " + b + ", " + 100 + ")";
    const specialSquare = document.getElementById(randInt(0, squaresCount - 1));
    specialSquare.style.backgroundColor = color;
    specialSquare.onclick = () => build_field();
    gridX++;
}

function lose() {
    alert("Упс! Неправильный квадрат :(\nРезультат: " + level.innerHTML + " уровень за " + max_time + " секунд");
    start();
}

function lose_by_timeout()
{
    alert("Упс! Время вышло :(\nРезультат: " + level.innerHTML + " уровень за " + max_time + " секунд");
    start();
}
 
function randInt(min, max) {
    min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}