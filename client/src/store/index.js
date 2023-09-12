import { createStore } from "vuex";

export default createStore({
  state: {
    pixelNum: 1,
    led: new Map(),
    favouriteList: [],
  },
  mutations: {
    updateLight(state, pixelNum) {
      if (pixelNum > 0 && pixelNum <= 512) state.pixelNum = pixelNum;
    },
    // num, color, brightness, animation, speed
    updateLed(state, led) {
      state.led.set(led.num, {
        color: led.color
          ? led.color
          : {
              r: 0,
              g: 0,
              b: 0,
              a: 0,
            },
        num: led.num,
        // brightness: led.brightness ? led.brightness : 1,
        mode: led.mode ? led.mode : 1,
        speed: led.speed ? led.speed : 100,
      });
    },
    updateFavouriteList(state, favouriteList) {
      state.favouriteList = favouriteList;
    },
  },
});
