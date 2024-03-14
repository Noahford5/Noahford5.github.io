/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const $BOARDWIDTH = $('#')

  // Game Item Objects
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  }
  var walker = {
    locationX: 0,
    locationY: 0,
    speedX: 0,
    speedY: 0,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
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
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
      console.log('left');
    } else if (event.which === KEY.UP) {
      walker.speedY = -5;
      console.log('up');
    } else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
      console.log('right');
    } else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
      console.log('down');
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = 0;
      walker.speedY = 0;
    } else if (event.which === KEY.UP) {
      walker.speedX = 0;
      walker.speedY = 0;
    } else if (event.which === KEY.RIGHT) {
      walker.speedX = 0;
      walker.speedY = 0;
    } else if (event.which === KEY.DOWN) {
      walker.speedX = 0;
      walker.speedY = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.locationX += walker.speedX;
    walker.locationY += walker.speedY;
  }
  function redrawGameItem() {
    $('#walker').css('left', walker.locationX)
    $('#walker').css('top', walker.locationY)
  }
  function wallCollision() {
    if (walker.locationX < 0) {
      walker.locationX = walker.locationX + 5;
    } else if (walker.locationX > 394) {
      walker.locationX = walker.locationX - 5;
    } else if (walker.locationY < 0) {
      walker.locationY = walker.locationY + 5;
    } else if (walker.locationY > 394) {
      walker.locationY = walker.locationY - 5;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
