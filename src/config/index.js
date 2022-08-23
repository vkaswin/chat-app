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
  message: `${baseURL}/message`,
};

export const endpoints = {
  auth: {
    login: `${userURL}/login`,
    register: `${userURL}/register`,
  },
  chat: {
    recentChats: `${chatUrl}/recent`,
    favouriteChats: `${chatUrl}/favourite`,
    groupChats: `${chatUrl}/group`,
    chatDetails: `${chatUrl}/detail`,
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
