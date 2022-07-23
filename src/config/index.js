export const baseURL = "http://localhost:8000";
export const authURL = "/api/auth";
export const chatUrl = "/api/chat";

export const endpoints = {
  auth: {
    login: `${authURL}/login`,
    register: `${authURL}/register`,
  },
  chat: {
    sendMessage: `${chatUrl}/send`,
  },
};
