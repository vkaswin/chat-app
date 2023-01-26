import { axios } from "services";
import { endpoints } from "config/config";
import { Toast } from "components";

export const metaData = (data) => {
  return axios({ url: endpoints.others?.metaData, method: "post", data });
};

export const fileUpload = async (data) => {
  return axios({
    url: endpoints.others?.fileUpload,
    method: "post",
    data,
  });
};
