import { axios } from "services";
import { endpoints } from "config";

export const getAllChats = () => {
  return axios({ url: endpoints.chat.getChats, method: "get" });
};
