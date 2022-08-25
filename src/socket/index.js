import { io } from "socket.io-client";
import { baseURL } from "config";
import { sessionStorage } from "utils";
import { updateUserStatus } from "services/User";

export const socket = {
  io: null,
  getIo() {
    return this.io;
  },
  init(userId, statusCallback) {
    const socketIO = io(baseURL);

    socketIO.on("connect", async () => {
      this.io = socketIO;
      this.io.emit("join-room", userId);
      window.addEventListener("online", this.changeUserStatus.bind(this, true));
      window.addEventListener(
        "offline",
        this.changeUserStatus.bind(this, false)
      );
      this.io.on("status", statusCallback);
    });
  },
  async changeUserStatus(status) {
    const session = sessionStorage();

    if (status == session.get("status")) return;

    try {
      let res = await updateUserStatus({ status });
      console.log(res);
      session.set("status", status);
    } catch (error) {
      console.log(error);
    }
  },
  close() {
    window.removeEventListener(
      "online",
      this.changeUserStatus.bind(this, true)
    );
    window.removeEventListener(
      "offline",
      this.changeUserStatus.bind(this, false)
    );
    this.io && this.io.close();
  },
};
