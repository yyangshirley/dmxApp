const DMX = require("dmx");
const dmx = new DMX();

// DMX interface configuration

const serialPort = "COM3"; // Replace with the path to your DMX512 interface
// Start the DMX interface
const universe = dmx.addUniverse("universe", "enttec-open-usb-dmx", serialPort);

// const RED = { r: 255, g: 0, b: 0 };
// const GREEN = { r: 0, g: 255, b: 0 };

// function setAlternateColors() {
//   const channels = {};

//   for (let i = 1; i <= 75; i += 3) {
//     const color = i % 6 === 1 ? RED : GREEN; // Alternate logic: every two channels (i.e., every 6 values in RGB)

//     channels[i] = color.r;
//     channels[i + 1] = color.g;
//     channels[i + 2] = color.b;
//   }

//   universe.update(channels);
// }

// function christmasEffectAlternate() {
//   setAlternateColors();
// }

// const INTERVAL_DURATION = 1000; // 1 second, adjust as needed

// // Initially set the colors
// setAlternateColors();

// // Optionally: Blink the lights alternately every second
// setInterval(christmasEffectAlternate, INTERVAL_DURATION);

const INTERVAL_DURATION = 1000; // 1 second for this example

setInterval(christmasEffect, INTERVAL_DURATION);
