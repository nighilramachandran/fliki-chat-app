const socketIO = require("socket.io");
const Group = require("../model/groupModel");

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

    socket.on("join", async ({ groupId, groupname, userId, username }) => {
      socket.join(groupId);
      try {
        const group = await Group.findById(groupId);
        if (group) {
          const userExists = group.users.some((user) =>
            user.userId.equals(userId)
          );

          if (userExists) {
            io.sockets.emit("groupJoined", {
              message: `Already joined the group ${groupname}`,
              status: false,
            });
          } else if (!userExists) {
            group.users.push({
              userId: userId,
              username: username,
            });
            await group.save();
            io.sockets.emit("groupJoined", {
              message: `Joined the group ${groupname}`,
              status: true,
            });
          }
        } else {
          console.log("group no");
        }
      } catch (error) {
        console.log("error", error);
      }
    });

    // if someone emits send message
    socket.on("send-message", ({ msg, groupId, name }) => {
      console.log("name", name, "send message", msg);
      io.sockets.to(groupId).emit("new-message", { msg, groupId, name });
    });
  });
};

module.exports = initSocket;
