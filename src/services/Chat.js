import { axios } from "services";
import { endpoints } from "config";

export const sendMessage = (data) => {
  return axios({ url: endpoints.chat.sendMessage, method: "post", data });
};
