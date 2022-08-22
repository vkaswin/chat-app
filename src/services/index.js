import Axios from "axios";
import { cookies } from "utils";
import { baseURL } from "config";

export const axios = Axios.create({ baseURL });

axios.interceptors.request.use(
  (config) => {
    const cookie = cookies();

    const token = cookie.get("authToken");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const event = new CustomEvent("logout");
      document.dispatchEvent(event);
    }
    return Promise.reject(error?.response?.data);
  }
);
