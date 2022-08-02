import { axios } from "services";
import { endpoints } from "config";

export const createMessage = (chatId, data) => {
  return axios({
    url: `${endpoints.message.create}/${chatId}`,
    method: "post",
    data,
  });
};
