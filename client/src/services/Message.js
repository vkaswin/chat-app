import { axios } from "services";
import { endpoints } from "config";

export const createMessage = (chatId, data) => {
  return axios({
    url: `${endpoints.message.createMessage}/${chatId}`,
    method: "post",
    data,
  });
};

export const getReactions = (msgId) => {
  return axios({
    url: `${endpoints.message.getReaction}/${msgId}`,
    method: "get",
  });
};

export const getReactionsByType = (msgId, params) => {
  return axios({
    url: `${endpoints.message.getReactionByType}/${msgId}`,
    method: "get",
    params,
  });
};

export const getSeenByMsgId = (msgId, params) => {
  return axios({
    url: `${endpoints.message.getSeen}/${msgId}`,
    method: "get",
    params,
  });
};
