import { axios } from "services";
import { endpoints } from "config";
import { Toast } from "components";

export const metaData = (data) => {
  return axios({ url: endpoints.others?.metaData, method: "post", data });
};

export const fileUpload = async (data) => {
  try {
    let res = await axios({
      url: endpoints.others?.fileUpload,
      method: "post",
      data,
    });
    console.log(res);
  } catch (error) {
    Toast({ type: "error", message: error?.message });
  }
};
