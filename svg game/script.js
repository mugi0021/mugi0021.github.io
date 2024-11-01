const gameArea = document.getElementById("gameArea");
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };

function drawSnake() {
  gameArea.innerHTML = ''; // Clear the game area
  snake.forEach(part => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", part.x);
    rect.setAttribute("y", part.y);
    rect.setAttribute("width", 1);
    rect.setAttribute("height", 1);
    rect.setAttribute("class", "snake-part");
    gameArea.appendChild(rect);
  });
}

function drawFood() {
  const foodElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  foodElement.setAttribute("cx", food.x + 0.5);
  foodElement.setAttribute("cy", food.y + 0.5);
  foodElement.setAttribute("r", 0.5);
  foodElement.setAttribute("class", "food");
  gameArea.appendChild(foodElement);
}

drawSnake();
drawFood();

// Add this function to handle key presses
document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (direction.y === 0) direction = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (direction.y === 0) direction = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (direction.x === 0) direction = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        if (direction.x === 0) direction = { x: 1, y: 0 };
        break;
    }
  });
  
  function updateGame() {
    // Update the snake’s position
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); // Add new head to the snake
  
    // Check if the snake ate the food
    if (head.x === food.x && head.y === food.y) {
      // Generate new food position
      food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
    } else {
      snake.pop(); // Remove last segment if no food was eaten
    }
  
    // Check for collisions
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snakeCollision(head)) {
      alert("Game Over!"); // Display Game Over message
      snake = [{ x: 10, y: 10 }]; // Reset the snake
      direction = { x: 0, y: 0 }; // Reset direction
    }
  
    // Draw the updated game state
    drawSnake();
    drawFood();
  }
  
  function snakeCollision(head) {
    // Check if the head collides with any part of the snake
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return false;
  }
  
  // Run updateGame() every 150 milliseconds to control the game speed
  setInterval(updateGame, 150);
  