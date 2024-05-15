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
    I: 73,
    K: 75,
    R: 82
  }

  function gameItems(ID, speedX, speedY, maxSpeed, positionX, positionY, height, width) {
    obj = [];
    obj.ID = ID;
    obj.speedX = speedX;
    obj.speedY = speedY;
    obj.maxSpeed = maxSpeed,
    obj.positionX = positionX;
    obj.positionY = positionY;
    obj.height = height;
    obj.width = width;
    return obj

  }
  var ball = gameItems('#ball', 5, 5, 5, 735, 250, 30, 30);
  var paddleLeft = gameItems('#paddleLeft', 0, 0, 10, 15, 250, 150, 10);
  var paddleRight = gameItems('#paddleRight', 0, 0, 10, 1470, 250, 150, 10);
  // Game Item Objects
  // const ball = {
  //   ID: '#ball',
  //   speedX: 5,
  //   speedY: 5,
  //   maxSpeed:5,
  //   positionX: 735,
  //   positionY: 250,
  //   height: 30,
  //   width: 30
  // }

  // const paddleLeft = {
  //   ID: '#paddleLeft',
  //   speedX: 0,
  //   speedY: 0,  // Start speed -- will change
  //   maxSpeed: 10,  // Max speed
  //   positionX: 15,  // Starting X position
  //   positionY: 250,  // Starting Y position
  //   height: 150,  // how tall the paddle is
  //   width: 10  // how wide the paddle is
  // }

  // const paddleRight = {
  //   ID: '#paddleRight',
  //   speedX: 0,
  //   speedY: 0,  // starting speed -- will change
  //   maxSpeed: 10,  // Max speed
  //   positionX: 1470,  // Starting X position
  //   positionY: 250,  // Starting Y position 
  //   height: 150,  // how tall the paddle is
  //   width: 10  // how wide the paddle is
  // }

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
    moveItem(ball);

    moveItem(paddleLeft);
    moveItem(paddleRight);

    redrawItem(paddleLeft);
    redrawItem(paddleRight);

    redrawItem(ball);

    paddleBorderCollision(paddleLeft);
    paddleBorderCollision(paddleRight);

    ballBorderCollision(ball);

    gameItemCollision();

    updateScore('#p1Score', '#p2Score', P1SCORE, P2SCORE)

    console.log(paddleLeft.positionX)

  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.W) {
      paddleLeft.speedY = paddleLeft.maxSpeed * -1;
      console.log(paddleLeft.speedY);
    } else if (event.which === KEY.S) {
      paddleLeft.speedY = paddleLeft.maxSpeed;

    } else if (event.which === KEY.I) {
      paddleRight.speedY = paddleRight.maxSpeed * -1;

    } else if (event.which === KEY.K) {
      paddleRight.speedY = paddleRight.maxSpeed;

    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.W) {
      paddleLeft.speedY = stationarySpeed;
    } else if (event.which === KEY.S) {
      paddleLeft.speedY = stationarySpeed;
    } else if (event.which === KEY.I) {
      paddleRight.speedY = stationarySpeed;
    } else if (event.which === KEY.K) {
      paddleRight.speedY = stationarySpeed;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // internally moves item
  function moveItem(item) {
    item.positionY += item.speedY;
    item.positionX += item.speedX;
  }

  // visually moves item
  function redrawItem(item) {
    $(item.ID).css('top', item.positionY);
    $(item.ID).css('left', item.positionX);
  }

  // see if paddle hits border
  function paddleBorderCollision(paddle) {
    if (paddle.positionY <= BORDER_TOP) {
      paddle.positionY = BORDER_TOP;
    } else if (paddle.positionY >= BORDER_BOTTOM - paddle.height) {
      paddle.positionY = BORDER_BOTTOM - paddle.height;
    }
  }

  // see if ball hits border
  function ballBorderCollision(ball) {
    if (ball.positionX <= BORDER_LEFT - ball.width) {
      P2SCORE++;
      ball.positionX = 735; //  starting position X
      ball.positionY = 250; // starting position Y
      ball.speedX = bounce * 5;
    } else if (ball.positionX >= BORDER_RIGHT) {
      P1SCORE++;
      ball.positionX = 735; //  starting position X
      ball.positionY = 250; // starting position Y
      ball.speedX = bounce * 5;
    } else if (ball.positionY <= BORDER_TOP) {
      ball.speedY *= bounce;
    } else if (ball.positionY >= BORDER_BOTTOM - BALL_WIDTH) {
      ball.speedY *= bounce;
    }
  }

  // checks for ball collision on paddles left AND right
  function gameItemCollision() {

    // checks for collision left
    if (paddleLeft.positionX + paddleLeft.width >= ball.positionX
      && paddleLeft.positionY <= ball.positionY + ball.height
      && paddleLeft.positionY + paddleLeft.height >= ball.positionY
    ) {
      ball.speedX *= bounce * 1.2;
    }

    // checks for collisions right
    if (paddleRight.positionX + paddleRight.width <= ball.positionX + ball.width
      && paddleRight.positionY <= ball.positionY + ball.height
      && paddleRight.positionY + paddleRight.height >= ball.positionY
    ) {
      ball.speedX *= bounce * 1.2;
    }

  }

  // updates score
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
