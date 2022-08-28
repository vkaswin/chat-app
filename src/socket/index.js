import { io } from "socket.io-client";
import { baseURL } from "config";

export const socket = {
  io: null,
  getIo() {
    return this.io;
  },
  init(userId) {
    const socketIO = io(baseURL);

    socketIO.on("connect", async () => {
      this.io = socketIO;
      this.io.emit("join-room", userId);
    });
  },
  close() {
    this.io && this.io.close();
  },
};
