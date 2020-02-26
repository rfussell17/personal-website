(function() {
  const GRID_DIM = { x: 20, y: 20 };
  const FPS = 10;
  const CRASH = new Audio("../sounds/CRASH2.wav");
  const DIRECTIONS = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT"
  };

  let currentScore = document.getElementById("newScore");


  let food = { x: 400, y: 300 };
  let speed = { x: 0, y: 0 };
  let direction;

  window.onload = function() {
    const CANVAS = document.getElementById("gameCanvas");
    const CONTEXT = CANVAS.getContext("2d");
    const GRID_COL = CANVAS.height / 30;
    const GRID_ROW = CANVAS.width / 40;

    let snake = [{ x: 200, y: 300 }];

    document.addEventListener("keydown", keys);
    setInterval(function() {
      drawMap(CANVAS, CONTEXT);
      snake = move(snake);
      drawApple(CONTEXT);
      drawSnake(snake, CONTEXT);
      if (isSnakeTouchingItself(snake) || isSnakeTouchingWalls(snake, CANVAS)) {
        drawGameEnd(CONTEXT);
        snake = [{ x: 200, y: 300 }];
      }
      if (isSnakeEatingFood(snake)) {
        let blip = new Audio("../sounds/blip3.wav");
        blip.play();
        snake.push({
          x: snake[snake.length - 1].x,
          y: snake[snake.length - 1].y
        });
        currentScore.innerHTML++;
        food = {
          x: GRID_DIM.x * Math.floor(Math.random() * GRID_COL),
          y: GRID_DIM.y * Math.floor(Math.random() * GRID_ROW)
        };
      }
    }, 1000 / FPS);
  };

  function move(snake) {
    let originalSnake = JSON.parse(JSON.stringify(snake));
    let newSnake = JSON.parse(JSON.stringify(snake));

    if (direction === DIRECTIONS.UP) {
      newSnake[0].y -= 20;
    }
    if (direction === DIRECTIONS.DOWN) {
      newSnake[0].y += 20;
    }
    if (direction === DIRECTIONS.LEFT) {
      newSnake[0].x -= 20;
    }
    if (direction === DIRECTIONS.RIGHT) {
      newSnake[0].x += 20;
    }

    newSnake[0].x += speed.x;
    newSnake[0].y += speed.y;
    for (let i = 1; i < newSnake.length; i++) {
      newSnake[i].x = originalSnake[i - 1].x;
      newSnake[i].y = originalSnake[i - 1].y;
    }
    return newSnake;
  }

  function isSnakeTouchingItself(snake) {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        return true;
      }
    }
    return false;
  }

  function keys(e) {
    switch (e.keyCode) {
      case 40:
        //down
        if (direction !== DIRECTIONS.UP) {
          direction = 'DOWN';
        }
        break;
      case 38:
        //up
        if (direction !== DIRECTIONS.DOWN) {
          direction = 'UP';
        }
        break;
      case 39:
        //right
        if (direction !== DIRECTIONS.LEFT) {
          direction = 'RIGHT';
        }
        break;
      case 37:
        //left
        if (direction !== DIRECTIONS.RIGHT) {
          direction = 'LEFT';
        }
        break;
    }
  }
  function drawMap(canvas, context) {
    //background canvas
    context.fillStyle = "green";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawApple(context) {
    context.fillStyle = "red";
    context.beginPath();
    context.arc(food.x + 10, food.y + 10, GRID_DIM.y / 3, 0, Math.PI * 2, true);
    context.fill();
  }

  function drawSnake(snake, context) {
    for (let i = 0; i < snake.length; i += 1) {
      let body = snake[i];
      context.strokestyle = "black";
      context.fillStyle = "yellow";
      context.fillRect(body.x, body.y, GRID_DIM.x, GRID_DIM.y);
      context.strokeRect(body.x, body.y, GRID_DIM.x, GRID_DIM.y);
    }
  }

  function isSnakeTouchingWalls(snake, canvas) {
    return (
      snake[0].x > canvas.width - GRID_DIM.x ||
      snake[0].x < 0 ||
      snake[0].y > canvas.height - GRID_DIM.y ||
      snake[0].y < 0
    );
  }

  function isSnakeEatingFood(snake) {
    for (let i = snake.length - 1; i >= 0; i--) {
      if (snake[0].x == food.x && snake[0].y == food.y) {
        return true;
      }
    }
    return false;
  }

  function drawGameEnd(context) {
    CRASH.currentTime = 0;
    CRASH.play();
    context.fillStyle = "black";
    context.font = "200px Georgia";
    context.fillText("DEAD", 100, 350);
    food = { x: 400, y: 300 };
    direction = null;
    snake = [{ x: 200, y: 300 }];
    currentScore.innerHTML = 0;
  }
})();
