let container = document.getElementsByClassName("container");

function play_clicked() {
  let box = document.getElementById("box");
  let play = document.getElementById("play");

  box.removeAttribute("hidden");
  play.classList.add("invisible");
}

function restart() {
  window.location.reload();
}

const board = document.getElementById("board");
const context = board.getContext("2d");
const score = document.getElementById("scoreVal");
const WIDTH = board.width;
const HEIGHT = board.height;
const UNIT = 10;
let snake = [
  { x: UNIT * 5, y: 10 },
  { x: UNIT * 4, y: 10 },
  { x: UNIT * 3, y: 10 },
  { x: UNIT * 2, y: 10 },
  { x: 10, y: 10 }
];

let foodX;
let foodY;
let xVel = 10;
let yVel = 0;
let scorevalue = 0;
let pause = true;
let no_intersect = true;
let loopTimeOut;
let gameStarted = false;

window.addEventListener("keydown", arrows);
gameStart();

function gameStart() {
  if (!gameStarted) {
    gameStarted = true;
    context.fillStyle = "#e4e684";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    createFood();
    drawFood();
    if (pause) loop();
  }
}

function loop() {
  if (check_intersect(snake)) {
    loopTimeOut = setTimeout(() => {
      clearBoard();
      drawFood();
      drawSnake();
      moveSnake();
      if (pause) loop();
    }, 1000 / 15);
  } else {
    let restart = document.getElementById("restart_button");
    window.removeEventListener("keydown", arrows);
    clearTimeout(loopTimeOut);
    clearBoard();
    context.font = "bold 50px serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("Game Over", WIDTH / 2, HEIGHT / 2);
    restart.removeAttribute("hidden");
  }
}

function check_intersect(snake) {
  for (let i = 2; i < snake.length; i++) {
    if (snake[1].x === snake[i].x && snake[1].y === snake[i].y) {
      return false;
    }
  }
  return true;
}

function clearBoard() {
  context.fillStyle = "#e4e684";
  context.fillRect(0, 0, WIDTH, HEIGHT);
}

// creating random food position
function createFood() {
  foodX = Math.floor(Math.random() * (WIDTH / UNIT)) * UNIT;
  foodY = Math.floor(Math.random() * (HEIGHT / UNIT)) * UNIT;
}

//displaying food
function drawFood() {
  context.lineWidth = "2";
  context.fillStyle = "#F57328";
  context.strokeStyle = "#674747";
  context.fillRect(foodX, foodY, UNIT, UNIT);
  context.strokeRect(foodX, foodY, UNIT, UNIT);
}

//displaying snake
function drawSnake() {
  context.lineWidth = "2";
  context.fillStyle = "#80a103";
  context.strokeStyle = "black";
  snake.forEach((snakepart) => {
    context.fillRect(snakepart.x, snakepart.y, UNIT, UNIT);
    context.strokeRect(snakepart.x, snakepart.y, UNIT, UNIT);
  });
}

//moving snake
function moveSnake() {
  const head = { x: snake[0].x + xVel, y: snake[0].y + yVel };
  snake.unshift(head);
  //SNAKE EATING FOOD LOGIC
  if (snake[0].x == foodX && snake[0].y == foodY) {
    scorevalue += 1;
    score.textContent = scorevalue;
    createFood();
  } else snake.pop();

  //NO BOUNDARIES LOGIC
  if (snake[0].x > WIDTH) snake[0].x = 0;
  else if (snake[0].x < 0) snake[0].x = WIDTH;
  else if (snake[0].y > HEIGHT) snake[0].y = 0;
  else if (snake[0].y < 0) snake[0].y = HEIGHT;
}

function arrows(event) {
  const space = 32;
  const left = 37;
  const up = 38;
  const right = 39;
  const down = 40;

  switch (true) {
    //pause feature
    case event.keyCode == space:
      if (pause == true) pause = false;
      else {
        pause = true;
        loop();
      }
      break;

    //movements
    case event.keyCode == left && xVel != UNIT:
      xVel = -UNIT;
      yVel = 0;
      break;

    case event.keyCode == right && xVel != -UNIT:
      xVel = UNIT;
      yVel = 0;
      break;

    case event.keyCode == up && yVel != UNIT:
      xVel = 0;
      yVel = -UNIT;
      break;

    case event.keyCode == down && yVel != -UNIT:
      xVel = 0;
      yVel = UNIT;
      break;
  }
}
