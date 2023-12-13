const socketIO = require("socket.io");
const Auth = require("../models/authModel");

const initSocket = (http) => {
  const io = socketIO(http, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("logged", async (vals) => {
      console.log("comming in", vals);
      const user = await Auth.findOne(vals.email);
      console.log(user);
    });
  });

  // io.on("connection", (socket) => {
  //   console.log("connected on server");
  //   console.log(socket.id);
  //   // socket.on("disconnect", () => {
  //   //   console.log("disconnected");
  //   // });

  //   socket.on("join", ({ name, groupId }) => {
  //     console.log("name", name, "group", groupId);
  //   });

  //   // if someone emits send message
  //   socket.on("send-message", ({ msg, groupId, name, userId }) => {
  //     console.log("name", name, "send message", msg);
  //     io.sockets
  //       .to(groupId)
  //       .emit("new-message", { msg, groupId, name, userId });
  //   });
  // });
};

module.exports = initSocket;
