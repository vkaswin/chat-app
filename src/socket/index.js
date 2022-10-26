import { io } from "socket.io-client";
import { baseURL } from "config";
import { cookies } from "utils";

export const socket = {
  io: null,
  init() {
    this.io = io(baseURL, {
      auth: {
        token: cookies().get("auth_token"),
        chatId: sessionStorage.getItem("chatId"),
      },
    });
    this.io.on("connect", () =>
      document.dispatchEvent(new CustomEvent("socket"))
    );
  },
  on(...args) {
    this.io.on(...args);
  },
  emit(...args) {
    this.io.emit(...args);
  },
  close() {
    this.io.disconnect();
  },
};
