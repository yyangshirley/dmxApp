import { createStore } from "vuex";

export default createStore({
  state: {
    pixelNum: 1,
    customLed: [],
    mono: {},
    favouriteList: [],
  },
  mutations: {
    updateLight(state, pixelNum) {
      if (pixelNum > 0 && pixelNum <= 512) state.pixelNum = pixelNum;
    },
    SET_CUSTOM(state, led) {
      if (state.customLed.length > 0) {
        state.customLed.forEach((obj) => {
          if (obj.index == led.index) {
            obj.color = led.color;
            return;
          }
        });
        state.customLed.push({ index: led.index, color: led.color });
      } else {
        state.customLed.push({ index: led.index, color: led.color });
      }
    },
    SET_MONO(state, led) {
      Object.keys(led).forEach((key) => {
        state.mono[key] = led[key];
      });
    },
    updateFavouriteList(state, favouriteList) {
      state.favouriteList = favouriteList;
    },
  },
  actions: {
    updateLed({ commit }, led) {
      commit("SET_CUSTOM", led);
    },
    updateMonoEffect({ commit }, led) {
      commit("SET_MONO", led);
    },
  },
  getters: {
    customLed: (state) => state.customLed,
    mono: (state) => state.mono,
  },
});
