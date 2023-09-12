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
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));
app.use(bodyParser.json({ limit: "200mb" }));
const port = 3000;
const jsonfile = require("jsonfile");

const DMX = require("dmx");
const dmx = new DMX();
const serialPort = "COM3"; //"/dev/ttyUSB0"; // Replace with the path to your DMX512 interface
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

app.post("/led/saveFavourite", (req, res) => {
  const data = req.body;
  fs.readFile("./favourite/lights.json", "utf8", (readError, fileContents) => {
    if (readError) {
      console.error("Error reading the file:", readError);
      return;
    }
    const contentData = JSON.parse(fileContents);
    const newLight = data.name;
    contentData.type.push(newLight);
    fs.writeFile(
      "./favourite/lights.json",
      JSON.stringify(contentData, null, 2),
      (writeError) => {
        if (writeError) {
          console.error("Error writing to the file:", writeError);
          return;
        }
        //res.send('Successfully added data!');
      }
    );
  });
  fs.readFile("./favourite/custom.json", "utf8", (readError, fileContents) => {
    if (readError) {
      console.error(readError);
      res.status(500).send("Server error");
      return;
    }
    const data1 = JSON.parse(fileContents);
    const name = data.name;
    data1[name] = {};
    data1[name].data = data.data;
    fs.writeFile(
      "./favourite/custom.json",
      JSON.stringify(data1, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Server error");
          return;
        }
        res.send({
          flag: "SUCCESS",
          message: "Favourite lights saved!",
        });
      }
    );
  });
});

app.delete("/led/deleteFavourite/:type", (req, res) => {
  const type = req.params.type;
  closeAll(universe, 25);
  try {
    fs.readFile(
      "./favourite/lights.json",
      "utf8",
      (readError, fileContents) => {
        if (readError) {
          console.error("Error reading the file:", readError);
          return;
        }
        const typeData = JSON.parse(fileContents);
        typeData.type.forEach((item, index) => {
          if (item == type) typeData.type.splice(index, 1);
        });
        fs.writeFile(
          "./favourite/lights.json",
          JSON.stringify(typeData, null, 2),
          (writeError) => {
            if (writeError) {
              console.error("Error writing to the file:", writeError);
              return;
            }
          }
        );
      }
    );
    fs.readFile(
      "./favourite/custom.json",
      "utf8",
      (readError, fileContents) => {
        if (readError) {
          console.error(readError);
          res.status(500).send("Server error");
          return;
        }
        const customData = JSON.parse(fileContents);
        delete customData[type];

        fs.writeFile(
          "./favourite/custom.json",
          JSON.stringify(customData, null, 2),
          (err) => {
            if (err) {
              console.error(err);
              res.status(500).send("Server error");
              return;
            }
            res.send({
              flag: "SUCCESS",
              message: "Favourite lights delete!",
            });
          }
        );
      }
    );
  } catch (error) {
    res.send({ flag: "ERROR", message: error });
  }
});

app.post("/led/createFavouriteLed", (req, res) => {
  const { type, numLights, custom } = req.body;
  universe.update({}); // Initialize DMX data
  stopEffect();
  try {
    // if(custom){
    fs.readFile(
      "./favourite/custom.json",
      "utf8",
      (readError, fileContents) => {
        if (readError) {
          console.error(readError);
          res.status(500).send("server error");
          return;
        }
        const data = JSON.parse(fileContents);
        if (data.hasOwnProperty(type)) {
          closeAll(universe, numLights);
          for (let i of data[type].data) {
            console.log(i);
            setCustom(universe, i.ledNum, i.color);
          }
          res.send({ flag: "SUCCESS", message: "Favourite Led updated" });
        }
      }
    );
    /***
    else{
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
    **/
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
