import axios from "axios";
import store from "./stroe";
const instance = axios.create({
  timeout: 1000,
});

instance.interceptors.request.use(
  function (config) {
    const token = store.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Accept"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
