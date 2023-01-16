import { axios } from "services";
import { endpoints } from "config";

export const createStatus = (data) => {
  return axios({ url: endpoints.status.create, method: "post", data });
};

export const getAllStatus = () => {
  return axios({
    url: endpoints.status.allStatus,
    method: "get",
  });
};
