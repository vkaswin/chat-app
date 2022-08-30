import { axios } from "services";
import { endpoints } from "config";
import { cookies } from "utils";

export const loginUser = (data) => {
  return axios({ url: endpoints.user.login, method: "post", data });
};

export const registerUser = (data) => {
  return axios({ url: endpoints.user.register, method: "post", data });
};

export const updateUserStatus = async (status, token) => {
  const cookie = cookies();

  const authToken = token || cookie.get("authToken");

  if (!authToken) return;

  return axios({
    url: endpoints.user.status,
    method: "put",
    data: { status, token: authToken },
  });
};
