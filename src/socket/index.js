import { connect, io as socketIO } from "socket.io-client";
import { baseURL } from "config";

export const socket = {
  io: null,
  userId: null,
  init(userId) {
    console.log(this.io);
    this.userId = userId;
    this.io = socketIO(baseURL);
    const connect = function () {
      setTimeout(this.handleConnected.bind(this), 10);
    };
    this.io.on("connect", connect.bind(this));
  },
  handleConnected() {
    let chatId = sessionStorage.getItem("chatId");
    chatId && this.io.emit("join-chat", chatId);
    this.io.emit("join-user", this.userId);
    this.io.on("user-status", this.handleUserStatus.bind(this));
    document.addEventListener("chatId", this.handleChat.bind(this));
    document.dispatchEvent(new CustomEvent("socket"));
  },
  on(...args) {
    console.log(args);
    this.io.on(...args);
  },
  emit(...args) {
    console.log(args);
    this.io.emit(...args);
  },
  close() {
    document.removeEventListener("chatId", this.handleChat);
    this.io.close();
    this.io = null;
  },
  handleUserStatus({ userId, status }) {
    if (userId === this.userId) return;

    const elements = document.querySelectorAll(`[userid='${userId}']`);

    elements.forEach((ele) => {
      if (ele.tagName === "SPAN") {
        ele.textContent = status ? "Online" : "Offline";
      } else {
        ele.setAttribute("status", status);
      }
    });
  },
  handleChat({ detail: { chatId, oldChatId } }) {
    console.log("handleChat");
    this.io.emit("leave-chat", oldChatId);
    this.io.emit("join-chat", chatId);
  },
};
