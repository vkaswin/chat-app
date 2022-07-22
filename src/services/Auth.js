import { axios } from "services";
import { endpoints } from "config";

export const loginUser = (data) => {
  return axios({ url: endpoints.auth.login, method: "post", data });
};

export const registerUser = (data) => {
  return axios({ url: endpoints.auth.register, method: "post", data });
};
