import { io } from "socket.io-client";
import { baseURL } from "config";

export const socket = {
  io: null,
  userId: null,
  init(userId) {
    this.userId = userId;
    this.io = io(baseURL);
    this.io.on("connect", () =>
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent("socket"));
      }, 50)
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
