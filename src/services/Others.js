import { axios } from "services";
import { endpoints } from "config";

export const metaData = (data) => {
  return axios({ url: endpoints.others?.metaData, method: "post", data });
};

export const uploadFile = (data) => {
  return axios({ url: endpoints.others?.fileUpload, method: "post", data });
};
