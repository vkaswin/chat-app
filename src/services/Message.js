import { axios } from "services";
import { endpoints } from "config";

export const createMessage = (chatId, data) => {
  return axios({
    url: `${endpoints.message.createMessage}/${chatId}`,
    method: "post",
    data,
  });
};

export const getMessagesByChatId = (chatId, params) => {
  return axios({
    url: `${endpoints.message.getMessages}/${chatId}`,
    method: "get",
    params,
  });
};
