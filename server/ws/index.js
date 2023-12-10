const socketIO = require("socket.io");

const initSocket = (http) => {
  const io = socketIO(http, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("join", ({ name, groupId }) => {
      console.log("name", name, "group", groupId);
      socket.join(groupId);
    });

    // if someone emits send message
    socket.on("send-message", ({ msg, groupId, name }) => {
      console.log("name", name, "send message", msg);
      io.sockets.to(groupId).emit("new-message", { msg, groupId, name });
    });
  });
};

module.exports = initSocket;
