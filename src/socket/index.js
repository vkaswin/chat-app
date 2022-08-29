import { io } from "socket.io-client";
import { baseURL } from "config";
import { updateUserStatus } from "services/User";

export const socket = {
  io: null,
  userId: null,
  getIo() {
    return this.io;
  },
  init(userId) {
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    document.addEventListener("online", this.handleOnline);
    document.addEventListener("offline", this.handleOffline);

    const socketIO = io(baseURL);

    socketIO.on("connect", async () => {
      this.io = socketIO;
      this.userId = userId;
      this.io.emit("join-room", userId);
      this.io.on("user-status", this.handleUserStatus);
    });

    updateUserStatus({ status: true });
  },
  handleVisibilityChange() {
    updateUserStatus({
      status: document.visibilityState === "visible",
    });
  },
  handleOnline() {
    console.log("online");
  },
  handleOffline() {
    console.log("offline");
  },
  handleUserStatus({ userId, status }) {
    if (userId === this.userId) return;
    const elements = document.querySelectorAll(`[data-userid='${userId}']`);
    elements.forEach((ele) => {
      if (ele.tagName === "SPAN") {
        ele.textContent = status ? "Online" : "Offline";
      } else {
        ele.setAttribute("data-status", status);
      }
    });
  },
  close() {
    this.io && this.io.close();
    updateUserStatus({ status: false });
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
    document.removeEventListener("online", this.handleOnline);
    document.removeEventListener("offline", this.handleOffline);
  },
};
