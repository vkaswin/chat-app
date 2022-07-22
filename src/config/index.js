export const baseURL = "http://localhost:8000";
export const authURL = "/api/auth";

export const endpoints = {
  auth: {
    login: `${authURL}/login`,
    register: `${authURL}/register`,
  },
};
