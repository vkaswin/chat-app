export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://chat-api-mern.herokuapp.com";
const userURL = "/api/user";
const chatUrl = "/api/chat";
const messageUrl = "/api/message";
const contactUrl = "/api/contact";
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
    createMessage: `${messageUrl}/create`,
    getMessages: `${messageUrl}`,
  },
  contact: {
    getContact: `${contactUrl}`,
    createContact: `${contactUrl}`,
    deleteContact: `${contactUrl}`,
  },
  others: {
    metaData: `${othersUrl}/metadata`,
    fileUpload: `${othersUrl}/fileUpload`,
  },
};
