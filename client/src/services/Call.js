import { axios } from "services";
import { endpoints } from "config";

export const getCallHistory = () => {
  return axios({ url: endpoints.call.history, method: "get" });
};

export const initiateCall = (chatId, data) => {
  return axios({
    url: `${endpoints.call.initiate}/${chatId}`,
    method: "post",
    data,
  });
};
