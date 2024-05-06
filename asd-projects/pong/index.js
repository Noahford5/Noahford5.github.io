/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // key codes for control
  const KEY = {
    W: 87,
    S: 83,
    UP: 38,
    DOWN: 40
  }

  // Game Item Objects
  const ball = {
    ID: '#ball',
    speedX: 5,
    speedY: 5,
    positionX: 735,
    positionY: 250,
    height: 50,
    width: 50
  }

  const paddleLeft = {
    ID: '#paddleLeft',
    speedY: 0,  // Start speed -- will change
    maxSpeed: 8,  // Max speed
    positionX: 15,  // Starting X position
    positionY: 250,  // Starting Y position
    height: 150,  // how tall the paddle is
    width: 30  // how wide the paddle is
  }

  const paddleRight = {
    ID: '#paddleRight',
    speedY: 0,  // starting speed -- will change
    maxSpeed: 8,  // Max speed
    positionX: 1470,  // Starting X position
    positionY: 250,  // Starting Y position 
    height: 150,  // how tall the paddle is
    width: 30  // how wide the paddle is
  }

  // game variables
  let P1SCORE = 0;
  let P2SCORE = 0;
  var stationarySpeed = 0;
  var BORDER_TOP = 0;
  var BORDER_BOTTOM = parseFloat($('#board').css('height'));
  var BORDER_LEFT = 0;
  var BORDER_RIGHT = parseFloat($('#board').css('width'));
  var bounce = -1;
  var BALL_WIDTH = parseFloat($(ball.ID).width());

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveball(ball);

    movepaddle(paddleLeft);
    movepaddle(paddleRight);

    redrawpaddle(paddleLeft);
    redrawpaddle(paddleRight);

    redrawBall(ball);

    paddleBorderCollision(paddleLeft);
    paddleBorderCollision(paddleRight);

    ballBorderCollision(ball);

    gameItemCollision(paddleLeft, ball);
    gameItemCollision(paddleRight, ball);

    updateScore('#p1Score', 'p2Score', P1SCORE, P2SCORE)
    
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      paddleLeft.speedY = paddleLeft.maxSpeed * -1;
      console.log(paddleLeft.speedY);
    } else if (event.which === KEY.DOWN) {
      paddleLeft.speedY = paddleLeft.maxSpeed;

    } else if (event.which === KEY.W) {
      paddleRight.speedY = paddleRight.maxSpeed * -1;

    } else if (event.which === KEY.S) {
      paddleRight.speedY = paddleRight.maxSpeed;

    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.UP) {
      paddleLeft.speedY = stationarySpeed;
    } else if (event.which === KEY.DOWN) {
      paddleLeft.speedY = stationarySpeed;
    } else if (event.which === KEY.W) {
      paddleRight.speedY = stationarySpeed;
    } else if (event.which === KEY.S) {
      paddleRight.speedY = stationarySpeed;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function moveball(ball) {
    ball.positionY += ball.speedY;
    ball.positionX += ball.speedX;
  }

  function movepaddle(paddle) {
    paddle.positionY += paddle.speedY
  }

  function redrawpaddle(paddle) {
    $(paddle.ID).css('top', paddle.positionY);
  }

  function redrawBall(ball) {
    $(ball.ID).css('top', ball.positionY);
    $(ball.ID).css('left', ball.positionX);
  }

  function paddleBorderCollision(paddle) {
    if (paddle.positionY <= BORDER_TOP) {
      paddle.positionY = BORDER_TOP;
    } else if (paddle.positionY >= BORDER_BOTTOM - paddle.height) {
      paddle.positionY = BORDER_BOTTOM - paddle.height;
    }
  }
  function ballBorderCollision(ball) {
    if (ball.positionX <= BORDER_LEFT) {
      ball.speedX *= bounce;
      P2SCORE++;
    } else if (ball.positionX >= BORDER_RIGHT - BALL_WIDTH) {
      ball.speedX *= bounce;
      P1SCORE++;
    } else if (ball.positionY <= BORDER_TOP) {
      ball.speedY *= bounce;
    } else if (ball.positionY >= BORDER_BOTTOM - BALL_WIDTH) {
      ball.speedY *= bounce;
    }
  }

  function gameItemCollision(paddle, ball) {
    // paddle side declaration
    paddle.left = paddle.positionX;
    paddle.top = paddle.positionY;
    paddle.right = paddle.posiitonX + paddle.width;
    paddle.bottom = paddle.positionY + paddle.height;
    // ball side declaration
    ball.left = ball.positionX;
    ball.top = ball.positionY;
    ball.right = ball.positionX + ball.width;
    ball.bottom = ball.positionY + ball.height;
    // checks for collision
    
    if (paddle.left >= ball.right &&
      paddle.right <= ball.left &&
      paddle.top >= ball.bottom &&
      paddle.bottom <= ball.top) {
        console.log(ball.left)
      ball.speedX *= bounce;
      ball.speedY *= bounce;
    }
    // console.log(ball.left)
    
  }
  
  function updateScore(ID1, ID2, score1, score2) {
    $(ID1).text(score1);
    $(ID2).text(score2);
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
