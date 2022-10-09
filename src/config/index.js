export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://vkaswin-chat-api.herokuapp.com";
//  "https://chat-app-api-bn2t.onrender.com";
const userURL = "/api/user";
const chatUrl = "/api/chat";
const messageUrl = "/api/message";
const contactUrl = "/api/contact";
const callUrl = "/api/call";
const reactionUrl = "/api/reaction";
const othersUrl = "/api/";

export const sockets = {
  chat: `${baseURL}/chats`,
  message: `${baseURL}/message`,
};

export const endpoints = {
  user: {
    login: `${userURL}/login`,
    register: `${userURL}/register`,
    status: `${userURL}/status`,
  },
  chat: {
    list: `${chatUrl}/list`,
    chatDetails: `${chatUrl}/detail`,
    chatMessages: `${chatUrl}/messages`,
    markAsReadByMsgId: `${chatUrl}/markAsRead`,
    markAsRead: `${chatUrl}/markAsRead/all`,
    reactions: `${reactionUrl}/all`,
  },
  message: {
    createMessage: `${messageUrl}/create`,
  },
  contact: {
    getContact: `${contactUrl}`,
    createContact: `${contactUrl}`,
    deleteContact: `${contactUrl}`,
  },
  call: {
    history: `${callUrl}/history`,
    initiate: `${callUrl}/initiate`,
    join: `${callUrl}/join`,
  },
  others: {
    metaData: `${othersUrl}/metadata`,
    fileUpload: `${othersUrl}/fileUpload`,
  },
};
