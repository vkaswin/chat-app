export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://chat-api-mern.herokuapp.com";
const userURL = "/api/users";
const chatUrl = "/api/chats";
const messageUrl = "/api/messages";
const othersUrl = "/api/";

export const sockets = {
  chat: `${baseURL}/chats`,
};

export const endpoints = {
  auth: {
    login: `${userURL}/login`,
    register: `${userURL}/register`,
  },
  chat: {
    getChats: `${chatUrl}`,
  },
  message: {
    create: `${messageUrl}/create`,
    getMessages: `${messageUrl}`,
  },
  others: {
    metaData: `${othersUrl}/metadata`,
    fileUpload: `${othersUrl}/fileUpload`,
  },
};
