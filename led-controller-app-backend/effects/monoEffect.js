let interval;
/**
 *
 * @param {*} universe
 * @param {*} numLights
 * @param {*} color
 * @param {*} breathInterval
 */
function createBreathingEffect(universe, numLights, color, speed = 50) {
  let increasing = true;
  // let intensity = {};
  let breathInterval = 4000 / (speed / 100);
  let brightness = color["a"];
  interval = setInterval(() => {
    if (increasing) {
      brightness += 0.2;
    } else {
      brightness -= 0.2;
    }
    if (brightness >= 1) {
      increasing = false;
    } else if (brightness <= 0) {
      increasing = true;
    }
    // if (increasing) {
    //   intensity['r'] = color['r'];
    //   intensity['g'] = color['g'];
    //   intensity['b'] = color['b'];
    //   increasing = false;
    // } else {
    //   intensity['r'] = 0;
    //   intensity['g'] = 0;
    //   intensity['b'] = 0;
    //   increasing = true;
    // }
    for (let i = 0; i < numLights; i++) {
      const channel = 3 * i + 1;
      universe.update({
        [channel]: color["r"] * brightness,
        [channel + 1]: color["g"] * brightness,
        [channel + 2]: color["b"] * brightness,
      });
    }
  }, breathInterval); // Interval for updating the channels (adjust as needed)
}

/**
 * Meteor Effect
 * @param {*} universe
 * @param {*} numLights
 * @param {*} meteorColor
 * @param {*} meteorInterval
 * @param {*} restColor
 */
function createMeteorEffect(
  universe,
  numLights,
  meteorColor,
  speed = 50,
  restColor = { r: 0, g: 0, b: 0 }
) {
  let currentIndex = 0;
  let meteorInterval = 200 / (speed / 100);
  let brightness = meteorColor["a"];
  interval = setInterval(() => {
    for (let i = 0; i < numLights; i++) {
      const channel = i * 3 + 1;
      const { r, g, b } = i === currentIndex ? meteorColor : restColor;
      universe.update({
        [channel]: r * brightness,
        [channel + 1]: g * brightness,
        [channel + 2]: b * brightness,
      });
    }

    currentIndex = (currentIndex + 1) % (numLights + 1);
  }, meteorInterval); // Interval for updating the channels (adjust as needed)
}

/**
 * Wave effect
 * @param {*} universe
 * @param {*} numLights
 * @param {*} waveColor
 * @param {*} waveInterval
 * @param {*} restColor
 */
function createWaveEffect(
  universe,
  numLights,
  waveColor,
  speed = 50,
  restColor = { r: 0, g: 0, b: 0 }
) {
  let currentIndex = 0;
  let waveInterval = 1000 / (speed / 100);
  let brightness = waveColor["a"];

  interval = setInterval(() => {
    const currentColor = currentIndex === 0 ? waveColor : restColor;
    for (let i = 0; i < numLights; i++) {
      const channel = i * 3 + 1;
      const { r, g, b } = currentColor;
      universe.update({
        [channel]: r * brightness,
        [channel + 1]: g * brightness,
        [channel + 2]: b * brightness,
      });
    }
    currentIndex = (currentIndex + 1) % (numLights + 1);
  }, waveInterval); // Interval for updating the channels (adjust as needed)
}

/**
 * Catch up effect
 * @param {*} universe
 * @param {*} numLights
 * @param {*} catchUpColor
 * @param {*} catchUpInterval
 * @param {*} restColor
 */
function createCatchUpEffect(
  universe,
  numLights,
  catchUpColor,
  speed = 50,
  restColor = { r: 0, g: 0, b: 0 }
) {
  let currentIndex = 0;
  let catchUpInterval = 100 / (speed / 100);
  let brightness = catchUpColor["a"];

  interval = setInterval(() => {
    for (let i = 0; i < numLights; i++) {
      // const intensity = i === currentIndex ? (currentIndex / numLights) : 0;
      const channel = 3 * i + 1;
      const { r, g, b } = i === currentIndex ? catchUpColor : restColor;
      universe.update({
        [channel]: r * brightness,
        [channel + 1]: g * brightness,
        [channel + 2]: b * brightness,
      });
    }

    currentIndex = (currentIndex + 1) % numLights;
  }, catchUpInterval); // Interval for updating the channels (adjust as needed)
}

/**
 * Static effect
 * @param {*} universe
 * @param {*} numLights
 * @param {*} staticColor
 */
function createStaticEffect(universe, numLights, staticColor) {
  let brightness = staticColor["a"];

  for (let i = 0; i < numLights; i++) {
    const channel = i * 3 + 1;
    const { r, g, b } = staticColor;
    universe.update({
      [channel]: r * brightness,
      [channel + 1]: g * brightness,
      [channel + 2]: b * brightness,
    });
  }
}

/**
 * Stack effect
 * @param {*} universe
 * @param {*} numLights
 * @param {*} stackColor
 * @param {*} stackInterval
 * @param {*} restColor
 */
function createStackEffect(
  universe,
  numLights,
  stackColor,
  speed = 50,
  restColor = { r: 0, g: 0, b: 0 }
) {
  let currentIndex = 0;
  let stackInterval = 200 / (speed / 100);
  let brightness = stackColor["a"];

  interval = setInterval(() => {
    for (let i = 0; i < numLights; i++) {
      const channel = i * 3 + 1;
      const { r, g, b } = i === currentIndex ? stackColor : restColor;
      universe.update({
        [channel]: r * brightness,
        [channel + 1]: g * brightness,
        [channel + 2]: b * brightness,
      });
    }

    currentIndex = (currentIndex + 1) % numLights;
  }, stackInterval); // Interval for updating the channels (adjust as needed)
}

// Run the Christmas light sequence in a loop
function createChristmasEffect1(universe, numLights) {
  const colors = [
    { r: 255, g: 0, b: 0 }, // Red
    { r: 0, g: 255, b: 0 }, // Green
    { r: 255, g: 215, b: 0 }, // Gold
  ];

  let currentColorIndex = 0;

  interval = setInterval(() => {
    setLightsColor(universe, colors[currentColorIndex], numLights);
    // let channels = {};
    // let color = colors[currentColorIndex];
    // for (let i = 1; i <= numLights * 3; i += 3) {
    //   channels[i] = color.r;
    //   channels[i + 1] = color.g;
    //   channels[i + 2] = color.b;
    // }

    // universe.update(channels);

    currentColorIndex++;
    if (currentColorIndex >= colors.length) {
      currentColorIndex = 0;
    }
  }, 2000);
}

function setLightsColor(universe, color, numLights) {
  const channels = {};

  for (let i = 1; i <= numLights * 3; i += 3) {
    channels[i] = color.r;
    channels[i + 1] = color.g;
    channels[i + 2] = color.b;
  }

  universe.update(channels);
}

function createHalloweenEffect(universe, numLights) {
  const colors = [
    { r: 255, g: 85, b: 0 }, // Orange
    { r: 128, g: 0, b: 128 }, // Purple
    { r: 0, g: 255, b: 0 }, // Green
  ];

  let currentColorIndex = 0;
  let candleFlicker = false;

  interval = setInterval(() => {
    if (candleFlicker) {
      const brightness = Math.random() * 255;
      const orange = { r: brightness, g: 0.33 * brightness, b: 0 };

      setLightsColor(universe, orange, numLights);
    } else {
      setLightsColor(universe, colors[currentColorIndex], numLights);
      currentColorIndex++;
      if (currentColorIndex >= colors.length) {
        currentColorIndex = 0;
      }
    }
    // Toggle between effects
    candleFlicker = !candleFlicker;
  }, 2000);
}

function applyPattern(universe, pattern, numlights) {
  const channels = {};

  for (let i = 1, j = 0; i <= numlights * 3; i += 3, j++) {
    const color = pattern[j % pattern.length]; // Get color from pattern and loop back to start if we're over pattern length
    channels[i] = color.r;
    channels[i + 1] = color.g;
    channels[i + 2] = color.b;
  }

  universe.update(channels);
}

function createChristmasEffect2(universe, numLights) {
  const colors = {
    red: { r: 255, g: 0, b: 0 },
    green: { r: 0, g: 255, b: 0 },
    gold: { r: 255, g: 215, b: 0 },
    white: { r: 255, g: 255, b: 255 },
  };

  let patternSwitch = false;
  interval = setInterval(() => {
    if (patternSwitch) {
      applyPattern(universe, [colors.red, colors.green], numLights);
    } else {
      applyPattern(universe, [colors.gold, colors.white], numLights);
    }

    // Toggle the pattern for next iteration
    patternSwitch = !patternSwitch;
  }, 1000);
}
/**
 *
 */
function stopEffect() {
  clearInterval(interval);
}

module.exports = {
  createMeteorEffect,
  createBreathingEffect,
  createWaveEffect,
  createStackEffect,
  createStaticEffect,
  createCatchUpEffect,
  stopEffect,
  createChristmasEffect1,
  createHalloweenEffect,
  createChristmasEffect2,
};
