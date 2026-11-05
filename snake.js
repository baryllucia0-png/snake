const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let snake = [{x: 200, y: 200}];

let food = {
    x: 100,
    y: 100
};

let dx = 20;
let dy = 0;

let score = 0;
let gameOver = false;
let isPaused = false;

function drawGame() {

    if (isPaused) {
        ctx.fillStyle = "yellow";
        ctx.font = "30px Arial";
        ctx.fillText("PAUSED", 140, 200);
        return;
    }

    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 110, 200);
        return;
    }

    ctx.clearRect(0, 0, 400, 400);

    // Draw food
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + 10, food.y + 10, 10, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();

    // Draw snake
    ctx.fillStyle = "#00FFFF";

    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 20, 20);
    });

    // Move snake
    let head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {

        score++;

        document.getElementById("score").innerText = score;

        food.x = Math.floor(Math.random() * 20) * 20;
        food.y = Math.floor(Math.random() * 20) * 20;

    } else {
        snake.pop();
    }

    // Check collision
    if (
        head.x < 0 || head.x >= 400 ||
        head.y < 0 || head.y >= 400
    ) {
        gameOver = true;
    }

    for (let i = 1; i < snake.length; i++) {

        if (head.x === snake[i].x &&
            head.y === snake[i].y) {

            gameOver = true;
        }
    }
}

// Controling the snake
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -20;
    }

    else if (event.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = 20;
    }

    else if (event.key === "ArrowLeft" && dx === 0) {
        dx = -20;
        dy = 0;
    }

    else if (event.key === "ArrowRight" && dx === 0) {
        dx = 20;
        dy = 0;
    }

});

// Funtion to Restart game
function restartGame() {

    snake = [{x: 200, y: 200}];

    dx = 20;
    dy = 0;

    score = 0;
    gameOver = false;

    document.getElementById("score").innerText = score;

    food = {
        x: 100,
        y: 100
    };
}

// Run game every 150 milliseconds
setInterval(drawGame, 150);

// Pause with Space or P - separate listener
document.addEventListener("keydown", function(event) {
    // Doesn't allow pausing if the game is over
    if (gameOver) return; 
    if (event.key === " " || event.key === "p" || event.key === "P") {
    isPaused = !isPaused;
  }
});