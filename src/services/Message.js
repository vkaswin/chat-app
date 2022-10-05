import { axios } from "services";
import { endpoints } from "config";

export const createMessage = (chatId, data) => {
  return axios({
    url: `${endpoints.message.createMessage}/${chatId}`,
    method: "post",
    data,
  });
};
