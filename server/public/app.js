const five = require('johnny-five');
const board = new five.Board();

board.on('ready', function () {
  const led = new five.Led(13);

  document.getElementById('ledButton').addEventListener('click', function () {
    led.toggle();
  });
});