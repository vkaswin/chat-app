import { axios } from "services";
import { endpoints } from "./config";

export const getChatByType = (type) => {
  return axios({ url: `${endpoints.chat.list}/${type}`, method: "get" });
};

export const getChatById = (chatId, params) => {
  return axios({
    url: `${endpoints.chat.chatDetails}/${chatId}`,
    method: "get",
    params,
  });
};

export const getChatMessagesByMsgId = (chatId, msgId, params) => {
  return axios({
    url: `${endpoints.chat.chatMessages}/${chatId}/${msgId}`,
    method: "get",
    params,
  });
};

export const addToFavourite = (chatId) => {
  return axios({
    url: `${endpoints.chat.addFavourite}/${chatId}`,
    method: "put",
  });
};

export const removeFromFavourite = (chatId) => {
  return axios({
    url: `${endpoints.chat.removeFavourite}/${chatId}`,
    method: "delete",
  });
};

export const markAsReadByMsgId = (chatId, msgId) => {
  return axios({
    url: `${endpoints.chat.markAsReadByMsgId}/${chatId}/${msgId}`,
    method: "put",
  });
};

export const markAsRead = (chatId) => {
  return axios({
    url: `${endpoints.chat.markAsRead}/${chatId}`,
    method: "put",
  });
};

export const sendReaction = (msgId, data) => {
  return axios({
    url: `${endpoints.chat.sendReaction}/${msgId}`,
    method: "post",
    data,
  });
};

export const getChatId = (userId) => {
  return axios({ url: `${endpoints.chat.getChatId}/${userId}`, method: "get" });
};

export const getChatMessageByRange = (chatId, params) => {
  return axios({
    url: `${endpoints.chat.chatMessageByRange}/${chatId}`,
    method: "get",
    params,
  });
};
