const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: boxSize * 5, y: boxSize * 5 }];
let direction = "RIGHT";
let food = { 
  x: Math.floor(Math.random() * canvas.width / boxSize) * boxSize, 
  y: Math.floor(Math.random() * canvas.height / boxSize) * boxSize 
};
let score = 0;
let gameStarted = false; // Game start flag

// Control snake with arrow keys
document.addEventListener("keydown", event => {
  if (!gameStarted) {
    gameStarted = true; // Start the game on any key press
  } else {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  }
});

// Game loop
function gameLoop() {
  if (!gameStarted) {
    // Display start message if game hasn't started
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Press any key to start", canvas.width / 2 - 80, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Move snake
  let head = { ...snake[0] };
  if (direction === "UP") head.y -= boxSize;
  if (direction === "DOWN") head.y += boxSize;
  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;

  // Check for collision with walls or itself
  if (
    head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over! Your score: " + score);
    snake = [{ x: boxSize * 5, y: boxSize * 5 }];
    direction = "RIGHT";
    score = 0;
    gameStarted = false; // Reset game start flag
    food = {
      x: Math.floor(Math.random() * canvas.width / boxSize) * boxSize,
      y: Math.floor(Math.random() * canvas.height / boxSize) * boxSize
    };
    return;
  }

  // Add new head to the snake
  snake.unshift(head);

  // Check if snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * canvas.width / boxSize) * boxSize,
      y: Math.floor(Math.random() * canvas.height / boxSize) * boxSize
    };
  } else {
    snake.pop();
  }

  // Draw snake
  ctx.fillStyle = "lime";
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  });

  // Display score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

// Run game loop
setInterval(gameLoop, 100);
