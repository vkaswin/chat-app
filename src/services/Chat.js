import { axios } from "services";
import { endpoints } from "config";

export const getRecentChats = () => {
  return axios({ url: endpoints.chat.recentChats, method: "get" });
};

export const getFavouriteChats = () => {
  return axios({ url: endpoints.chat.favouriteChats, method: "get" });
};

export const getGroupChats = () => {
  return axios({ url: endpoints.chat.groupChats, method: "get" });
};

export const getChatById = (chatId) => {
  return axios({
    url: `${endpoints.chat.chatDetails}/${chatId}`,
    method: "get",
  });
};

export const addToFavourite = (chatId) => {
  return axios({ url: endpoints.chat.addFavourite, method: "put" });
};

export const removeFromFavourite = (chatId) => {
  return axios({ url: endpoints.chat.removeFavourite, method: "delete" });
};

export const markAsRead = (chatId, data) => {
  return axios({
    url: `${endpoints.chat.markAsRead}/${chatId}`,
    method: "put",
    data,
  });
};
