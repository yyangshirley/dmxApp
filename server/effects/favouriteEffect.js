// Run the Christmas light sequence in a loop
const createchristmas = (universe, numLights) => {
  const colors = [
    { r: 255, g: 0, b: 0 }, // Red
    { r: 0, g: 255, b: 0 }, // Green
    { r: 255, g: 215, b: 0 }, // Gold
  ];

  let currentColorIndex = 0;

  interval = setInterval(() => {
    // setLightsColor(colors[currentColorIndex]);
    const channels = {};
    let color = colors[currentColorIndex];
    for (let i = 1; i <= numLights * 3; i += 3) {
      channels[i] = color.r;
      channels[i + 1] = color.g;
      channels[i + 2] = color.b;
    }

    universe.update(channels);

    currentColorIndex++;
    if (currentColorIndex >= colors.length) {
      currentColorIndex = 0;
    }
  }, 2000);
};
function setLightsColor(color, numLights) {
  const channels = {};

  for (let i = 1; i <= numLights * 3; i += 3) {
    channels[i] = color.r;
    channels[i + 1] = color.g;
    channels[i + 2] = color.b;
  }

  universe.update(channels);
}

module.exports = {
  createchristmas,
};
