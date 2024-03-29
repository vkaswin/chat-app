export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://chat-app-25ld.onrender.com";

const userURL = "/api/user";
const chatUrl = "/api/chat";
const messageUrl = "/api/message";
const contactUrl = "/api/contact";
const callUrl = "/api/call";
const statusUrl = "/api/status";
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
    search: `${userURL}/list`,
  },
  chat: {
    list: `${chatUrl}/list`,
    chatDetails: `${chatUrl}/detail`,
    chatMessages: `${chatUrl}/messages`,
    markAsReadByMsgId: `${chatUrl}/markAsRead`,
    markAsRead: `${chatUrl}/markAsRead/all`,
    sendReaction: `${messageUrl}/send`,
    addFavourite: `${chatUrl}/favourite`,
    removeFavourite: `${chatUrl}/favourite`,
    getChatId: `${chatUrl}/chatId`,
    chatMessageByRange: `${chatUrl}/messages/range`,
  },
  message: {
    createMessage: `${messageUrl}/create`,
    getReaction: `${messageUrl}/reaction`,
    getReactionByType: `${messageUrl}/reaction/type`,
    getSeen: `${messageUrl}/seen`,
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
  status: {
    create: `${statusUrl}/create`,
    allStatus: `${statusUrl}/list`,
  },
  others: {
    metaData: `${othersUrl}/metadata`,
    fileUpload: `${othersUrl}/fileUpload`,
  },
};
