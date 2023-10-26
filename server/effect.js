let interval;

/**
 *
 * @param {*} universe
 * @param {*} numLights
 * @param {*} color
 * @param {*} breathInterval
 */
function createBreathingEffect(
  universe,
  numLights,
  color,
  speed = 50,
  brightness = 1
) {
  let angle = 0; // Used to drive the sinusoidal brightness change
  let breathInterval = 100 / (speed / 100);
  interval = setInterval(() => {
    // Compute brightness factor between 0 and 1 using a sinusoidal function
    const brightnessFactor = (Math.sin(angle) + 1) / 2;

    // Update all lights with the computed brightness
    for (let i = 1; i <= numLights * 4; i += 4) {
      universe.update({
        [i]: Math.floor(color.r * brightnessFactor),
        [i + 1]: Math.floor(color.g * brightnessFactor),
        [i + 2]: Math.floor(color.b * brightnessFactor),
        [i + 3]: Math.floor(color.w * brightnessFactor),
      });
    }
    // Increment the angle for the next iteration. This determines the pace of brightness change.
    angle += 0.15; // This value can be adjusted for finer control of the "breath" cycle
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
  brightness = 1
) {
  let meteorInterval = 200 / (speed / 100);
  const tailLength = 5; // Length of the meteor's tail
  let headPosition = 0; // Current position of the meteor's head
  interval = setInterval(() => {
    const values = {};
    // Set values for the meteor and its tail
    for (let i = 0; i < tailLength; i++) {
      const position = (headPosition - i + numLights) % numLights; // This ensures we wrap around at the start/end of the strip
      const ledStartChannel = position * 4 + 1; // Start channel for the current LED
      values[ledStartChannel] = meteorColor.r * brightness;
      values[ledStartChannel + 1] = meteorColor.g * brightness;
      values[ledStartChannel + 2] = meteorColor.b * brightness;
      values[ledStartChannel + 3] = meteorColor.w * brightness;
    }
    // Clear out old values to ensure the meteor's trail fades out correctly
    for (let i = 1; i <= numLights * 4; i++) {
      if (!values[i]) values[i] = 0;
    }
    // Update the universe
    universe.update(values);

    // Move the meteor
    headPosition = (headPosition + 1) % numLights;
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
  brightness = 1,
  speed = 50
) {
  let waveInterval = (100 - speed) * 6;
  let peakPosition = 0;

  interval = setInterval(() => {
    const updates = {};

    for (let i = 0; i < numLights; i++) {
      let brightnessFactor;

      if (i === peakPosition) {
        brightnessFactor = 1; // Peak of the wave
      } else if (i === peakPosition - 1 || i === peakPosition + 1) {
        brightnessFactor = 0.7; // One step away from the peak
      } else if (i === peakPosition - 2 || i === peakPosition + 2) {
        brightnessFactor = 0.4; // Two steps away from the peak
      } else {
        brightnessFactor = 0; // Off
      }

      updates[i * 4 + 1] = waveColor.r * brightnessFactor;
      updates[i * 4 + 2] = waveColor.g * brightnessFactor;
      updates[i * 4 + 3] = waveColor.b * brightnessFactor;
      updates[i * 4 + 4] = waveColor.w * brightnessFactor;
    }

    universe.update(updates);

    peakPosition = (peakPosition + 1) % numLights;
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
  brightness = 1,
  restColor = { r: 0, g: 0, b: 0 }
) {
  let currentIndex = 0;
  let catchUpInterval = 100 / (speed / 100);

  interval = setInterval(() => {
    for (let i = 0; i < numLights; i++) {
      const channel = 4 * i + 1;
      const { r, g, b, w } = i === currentIndex ? catchUpColor : restColor;
      universe.update({
        [channel]: r * brightness,
        [channel + 1]: g * brightness,
        [channel + 2]: b * brightness,
        [channel + 3]: w * brightness,
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
function createStaticEffect(universe, numLights, staticColor, brightness = 1) {
  for (let i = 0; i < numLights; i++) {
    const channel = i * 4 + 1;
    const { r, g, b, w } = staticColor;
    universe.update({
      [channel]: r * brightness,
      [channel + 1]: g * brightness,
      [channel + 2]: b * brightness,
      [channel + 3]: w * brightness,
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
  brightness = 1
) {
  let currentLED = 0;
  let stackInterval = 200 / (speed / 100);

  interval = setInterval(() => {
    if (currentLED === 0) {
      for (let i = 1; i <= numLights * 4; i += 4) {
        universe.update({
          [i]: 0,
          [i + 1]: 0,
          [i + 2]: 0,
          [i + 3]: 0,
        });
      }
    }

    // Set the current light's color
    universe.update({
      [currentLED * 4 + 1]: stackColor.r,
      [currentLED * 4 + 2]: stackColor.g,
      [currentLED * 4 + 3]: stackColor.b,
      [currentLED * 4 + 4]: stackColor.w,
    });

    // Move to the next light or reset back to the first light
    if (currentLED < numLights) {
      currentLED++;
    } else {
      currentLED = 0;
    }
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
    currentColorIndex++;
    if (currentColorIndex >= colors.length) {
      currentColorIndex = 0;
    }
  }, 2000);
}

function setLightsColor(universe, color, numLights) {
  const channels = {};

  for (let i = 1; i <= numLights * 4; i += 4) {
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
      const orange = { r: brightness, g: 0.44 * brightness, b: 0 };

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

  for (let i = 1, j = 0; i <= numlights * 4; i += 4, j++) {
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

function chineseNewYearEffect(universe, numLights) {
  let angle = 0;
  interval = setInterval(() => {
    const updates = {};
    const brightnessFactor = (Math.sin(angle) + 1) / 2;

    for (let i = 1; i <= numLights * 4; i += 4) {
      const isGold = Math.random() < 0.2; // 20% chance for a LED to sparkle gold

      if (isGold) {
        updates[i] = 255 * brightnessFactor; // Gold R
        updates[i + 1] = 223 * brightnessFactor; // Gold G
        updates[i + 2] = 0; // Gold B
        updates[i + 3] = 0; // W
      } else {
        updates[i] = 255 * brightnessFactor; // Red R
        updates[i + 1] = 0; // Red G
        updates[i + 2] = 0; // Red B
        updates[i + 3] = 0; // W
      }
    }

    angle += 0.1; // Adjust the value for the breathing effect speed
    universe.update(updates);
  }, 1000); // Adjust interval as needed for the desired effect speed
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
  chineseNewYearEffect,
};
