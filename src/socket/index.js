import { io } from "socket.io-client";
import { baseURL } from "config";

export const socket = {
  io: null,
  getIo() {
    return this.io;
  },
  init(userId) {
    const socketIO = io(baseURL);

    socketIO.on("connect", () => {
      socketIO.emit("join-room", userId);
      this.io = socketIO;
    });
  },
};
