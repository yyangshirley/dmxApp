import http from "./http";

class LedService {
  customLed(id, data) {
    return http.post(`/led/custom/${id}`, data);
  }
  monoLed(data) {
    return http.post(`/led/mono`, data);
  }
  getFavouriteLed() {
    return http.get(`/led/getFavouriteLed`);
  }
  createFavouriteLed(data) {
    return http.post(`/led/createFavouriteLed`, data);
  }
  closeAll(ledNum) {
    return http.post(`/led/closeAll`, { ledNum: ledNum });
  }
}

export default new LedService();
