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

export const getMessagesByMsgId = (chatId, msgId, params) => {
  return axios({
    url: `${endpoints.message.getMessages}/${chatId}/${msgId}`,
    method: "get",
    params,
  });
};

export const getNewMessagesByChatId = (chatId, params) => {
  return axios({
    url: `${endpoints.message.newMessages}/${chatId}`,
    method: "get",
    params,
  });
};
