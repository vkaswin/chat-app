const { User } = require("../models");
const { verifyTokenSocket } = require("../middleware");

const socketHandler = async (socket) => {
  const {
    user,
    handshake: {
      auth: { chatId },
    },
  } = socket;

  if (user) {
    try {
      if (chatId) {
        socket.join([user.id, chatId]);
      } else {
        socket.join(user.id);
      }
      await User.findByIdAndUpdate(user.id, {
        $set: { status: true },
      });
      socket.broadcast.emit("user-status", { userId: user.id, status: true });
    } catch (error) {
      console.log(error);
    }
  }

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
  });

  socket.on("user-status", (status) => {
    socket.broadcast.emit("user-status", status);
  });

  socket.on("send-offer", (data, chatId) => {
    socket.to(chatId).emit("receive-offer", data);
  });

  socket.on("send-answer", (answer, chatId) => {
    socket.to(chatId).emit("receive-answer", answer);
  });

  socket.on("start-typing", (chatId, user, name) => {
    let rooms = socket.adapter.rooms;

    if (typeof user === "string" && rooms.has(user))
      return socket.to(user).emit("start-typing", chatId, name);

    if (!Array.isArray(user)) return;

    user.forEach((id) => {
      if (!rooms.has(id)) return;
      socket.to(id).emit("start-typing", chatId, name);
    });
  });

  socket.on("end-typing", (chatId, user, name) => {
    let rooms = socket.adapter.rooms;

    if (typeof user === "string" && rooms.has(user))
      return socket.to(user).emit("end-typing", chatId, name);

    if (!Array.isArray(user)) return;

    user.forEach((id) => {
      if (!rooms.has(id)) return;
      socket.to(id).emit("end-typing", chatId, name);
    });
  });

  socket.on("disconnect", async () => {
    try {
      if (!user) return;
      if (chatId) {
        socket.leave([user.id, chatId]);
      } else {
        socket.leave(user.id);
      }
      await User.findByIdAndUpdate(user.id, {
        $set: { status: false },
      });
      socket.broadcast.emit("user-status", { userId: user.id, status: false });
    } catch (error) {
      console.log(error);
    }
  });
};

const socket = {
  io: null,
  init(server) {
    this.io = require("socket.io")(server, {
      cors: { origin: "*" },
    });

    this.io.use(verifyTokenSocket);

    this.io.on("connection", socketHandler);
  },
  getRooms() {
    if (!this.io) return;
    let rooms = this.io.sockets.adapter.rooms;
    return rooms.size > 0 ? rooms : null;
  },
  getRoomById(roomId) {
    if (!this.io) return;
    let rooms = this.io.socket.adapter.rooms;
    let room = rooms.get(roomId);
    if (!room || room.size === 0) return;
    return room;
  },
};

module.exports = socket;
