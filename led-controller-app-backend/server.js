const cors = require("cors");
const {
  createBreathingEffect,
  createCatchUpEffect,
  createMeteorEffect,
  createStackEffect,
  createStaticEffect,
  createWaveEffect,
  stopEffect,
  createChristmasEffect1,
  createChristmasEffect2,
  createHalloweenEffect,
} = require("./effects/monoEffect.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));
app.use(bodyParser.json({ limit: "200mb" }));
const port = 3000;
const jsonfile = require("jsonfile");
// const { createchristmas } = require("./effects/favouriteEffect.js");

const DMX = require("dmx");
const dmx = new DMX();
const serialPort = "COM3"; // Replace with the path to your DMX512 interface
var universe = dmx.addUniverse("universe", "enttec-open-usb-dmx", serialPort);
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE,PUT"); // Allow the specified methods
  res.header("Access-Control-Allow-Headers", "*"); // Allow the specified headers
  next();
});

app.get("/", (req, res) => {
  res.end("it works!");
});
// Define LED control routes
// Example: Turn on the LED
app.post("/led/on", (req, res) => {
  // Logic to turn on the LED
  res.send("LED turned on");
});

// Example: Turn off the LED
app.post("/led/closeAll", (req, res) => {
  const { ledNum } = req.body;
  try {
    stopEffect();
    closeAll(universe, ledNum);
    res.send({ flag: "SUCCESS", message: "LED closed" });
  } catch (error) {
    res.send({ flag: "ERROR", message: error });
  }
});

// get favourite led style in json file?
app.get("/led/getFavouriteLed", (req, res) => {
  universe.update({}); // Initialize DMX data
  jsonfile.readFile("./favourite/lights.json", (err, lights) => {
    if (err) {
      console.error("Error reading JSON:", err);
      return;
    }
    res.send({
      flag: "SUCCESS",
      message: "Favourite lights got!",
      data: lights.type,
    });
  });
  // stopEffect();
});

app.post("/led/createFavouriteLed", (req, res) => {
  const { type, numLights } = req.body;
  universe.update({}); // Initialize DMX data
  stopEffect();
  try {
    switch (type) {
      case "christmas1":
        closeAll(universe, numLights);
        createChristmasEffect1(universe, numLights);
        res.send({ flag: "SUCCESS", message: "Favourite LED updated" });
        break;
      case "christmas2":
        closeAll(universe, numLights);
        createChristmasEffect2(universe, numLights);
        res.send({ flag: "SUCCESS", message: "Favourite LED updated" });
        break;
      case "halloween":
        closeAll(universe, numLights);
        createHalloweenEffect(universe, numLights);
        res.send({ flag: "SUCCESS", message: "Favourite LED updated" });
        break;

      default:
        break;
    }
  } catch (error) {
    res.send({ flag: "ERROR", message: error });
  }
});

app.post("/led/custom/:id", (req, res) => {
  const { color } = req.body;
  const num = req.params.id;
  try {
    // stopEffect();
    setCustom(universe, num, color);
    res.send({ flag: "SUCCESS", message: "Custom LED updated" });
  } catch (error) {
    res.send({ flag: "ERROR", message: error });
  }
});

app.post("/led/mono", (req, res) => {
  const { numLights, color, speed, mode } = req.body;
  universe.update({}); // Initialize DMX data
  stopEffect();
  try {
    switch (mode) {
      case "breathing":
        closeAll(universe, numLights);
        createBreathingEffect(universe, numLights, color, speed ? speed : 50);
        res.send({ flag: "SUCCESS", message: "MONO LED updated" });
        break;
      case "wave":
        closeAll(universe, numLights);
        createWaveEffect(universe, numLights, color, speed ? speed : 50);
        res.send({ flag: "SUCCESS", message: "MONO LED updated" });
        break;
      case "catchup":
        closeAll(universe, numLights);
        createCatchUpEffect(universe, numLights, color, speed ? speed : 50);
        res.send({ flag: "SUCCESS", message: "MONO LED updated" });
        break;
      case "meteor":
        closeAll(universe, numLights);
        createMeteorEffect(universe, numLights, color, speed ? speed : 50);
        res.send({ flag: "SUCCESS", message: "MONO LED updated" });
        break;
      case "static":
        closeAll(universe, numLights);
        createStaticEffect(universe, numLights, color);
        res.send({ flag: "SUCCESS", message: "MONO LED updated" });
        break;
      case "stack":
        closeAll(universe, numLights);
        createStackEffect(universe, numLights, color, speed ? speed : 50);
        res.send({ flag: "SUCCESS", message: "MONO LED updated" });
        break;
      default:
        break;
    }
  } catch (error) {
    res.send({ flag: "ERROR", message: error });
  }
});

// custom led
function setCustom(universe, ledNum, color) {
  const channel1 = ledNum * 3 - 2,
    channel2 = channel1 + 1,
    channel3 = channel1 + 2;
  let brightness = color["a"];
  let val = {
    [channel1]: color["r"] * brightness,
    [channel2]: color["g"] * brightness,
    [channel3]: color["b"] * brightness,
  };
  universe.update({}); // Initialize DMX data
  universe.update(val);
}

function closeAll(universe, ledNum) {
  for (let n = 0; n < 512; n++) {
    const channel1 = n * 3 + 1,
      channel2 = channel1 + 1,
      channel3 = channel1 + 2;
    let val = {
      [channel1]: 0,
      [channel2]: 0,
      [channel3]: 0,
    };
    universe.update(val);
  }
}

// Run the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
