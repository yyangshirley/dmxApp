module.exports = {
 /**
  * 
  * @param {*} universe 
  * @param {*} numLights 
  * @param {*} meteorColor 
  * @param {*} meteorInterval 
  * @param {*} restColor 
  */
  createMeteorEffect:(universe,numLights,meteorColor,meteorInterval = 100,brightness = 1,restColor = { r: 0, g: 0, b: 0 }) => {
    let currentIndex = 0;
    universe.start()

    setInterval(() => {
      for (let i = 0; i < numLights; i++) {
        const channel = i * 3 + 1;
        const { r, g, b } = i === currentIndex ? meteorColor : restColor;
        universe.update({ [channel]: (r*brightness), [channel + 1]: (g%brightness), [channel + 2]: (b*brightness) });
      }
  
      currentIndex = (currentIndex + 1) % (numLights + 1);
    }, meteorInterval); // Interval for updating the channels (adjust as needed)
  },
/**
 * 
 * @param {*} universe 
 * @param {*} numLights 
 * @param {*} color 
 * @param {*} breathInterval 
 */
  createBreathingEffect: (universe, numLights, color, breathInterval = 2000, brightness=1) => {
    universe.start()

    let increasing = true;
    let intensity = {};
    return setInterval(() => {
      if(increasing) {
        brightness += 0.2
      } else {
        brightness -= 0.2
      }
      if(brightness >= 1) {
        increasing = false;
      } else if(brightness<=0) {
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
        const channel = 3*i+1;
        universe.update({ 
          [channel]: color['r'] * brightness, 
          [channel + 1]: color['g'] * brightness, 
          [channel + 2 ]: color['b'] * brightness });
      }
    }, breathInterval); // Interval for updating the channels (adjust as needed)
  },
 /**
  * 
  * @param {*} universe 
  * @param {*} numLights 
  * @param {*} waveColor 
  * @param {*} restColor 
  * @param {*} waveInterval 
  */
  createWaveEffect: (universe,numLights, waveColor,waveInterval = 500,brightness = 1, restColor = { r: 0, g: 0, b: 0 }) => {
    universe.start()
    let currentIndex = 0;
    setInterval(() => {
      const currentColor = currentIndex === 0 ? waveColor : restColor;
      for (let i = 0; i < numLights; i++) {
        const channel = i * 3 + 1;
        const { r, g, b } = currentColor;
        universe.update({ [channel]: r*brightness, [channel + 1]: g*brightness, [channel + 2]: b*brightness });
      }
      currentIndex = (currentIndex + 1) % (numLights + 1);
    }, waveInterval); // Interval for updating the channels (adjust as needed)
  },
/**
 * 
 * @param {*} universe 
 * @param {*} numLights 
 * @param {*} catchUpColor 
 * @param {*} catchUpInterval 
 * @param {*} restColor 
 */
  createCatchUpEffect: (universe,numLights ,catchUpColor,catchUpInterval = 50,brightness = 1, restColor = { r: 0, g: 0, b: 0 }) => {
    let currentIndex = 0;
    universe.start()

    setInterval(() => {
      for (let i = 0; i < numLights; i++) {
        // const intensity = i === currentIndex ? (currentIndex / numLights) : 0;
        const channel = 3*i + 1;
        const { r, g, b } = i === currentIndex ? catchUpColor : restColor;
        universe.update({ [channel]: r *brightness, [channel + 1]: g *brightness, [channel + 2 ]: b*brightness });
      }
  
      currentIndex = (currentIndex + 1) % numLights;
    }, catchUpInterval); // Interval for updating the channels (adjust as needed)
  },
 /**
  * 
  * @param {*} universe 
  * @param {*} numLights 
  * @param {*} staticColor 
  */
  createStaticEffect: (universe,numLights,staticColor,brightness = 1) => {
    universe.start()

    for (let i = 0; i < numLights; i++) {
      const channel = i * 3 + 1;
      const { r, g, b } = staticColor;
      universe.update({ [channel]: r*brightness, [channel + 1]: g*brightness, [channel + 2]: b*brightness });
    }
  },
/**
 * 
 * @param {*} universe 
 * @param {*} numLights 
 * @param {*} stackColor 
 * @param {*} stackInterval 
 * @param {*} restColor 
 */
  createStackEffect: (universe,numLights,stackColor,stackInterval = 100,brightness = 1,restColor = { r: 0, g: 0, b: 0 }) => {
    let currentIndex = 0;
    universe.start()

  setInterval(() => {
    for (let i = 0; i < numLights; i++) {
      const channel = i * 3 + 1;
      const { r, g, b } = i === currentIndex ? stackColor : restColor;
      universe.update({ [channel]: r*brightness, [channel + 1]: g*brightness, [channel + 2]: b*brightness });
    }

    currentIndex = (currentIndex + 1) % numLights;
  }, stackInterval); // Interval for updating the channels (adjust as needed)
  }
}