import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.11:3000",
  // baseURL: "https://led-controller-e4ce59ff567a.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});
