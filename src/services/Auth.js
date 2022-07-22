import { axios } from "services";
import { endpoints } from "config";

export const login = (data) => {
  return axios({ url: endpoints.auth.login, method: "post", data });
};
