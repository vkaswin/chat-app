import { axios } from "services";
import { endpoints } from "config";

export const loginUser = (data) => {
  return axios({ url: endpoints.user.login, method: "post", data });
};

export const registerUser = (data) => {
  return axios({ url: endpoints.user.register, method: "post", data });
};

export const updateUserStatus = async (data) => {
  return axios({ url: endpoints.user.status, method: "put", data });
};
