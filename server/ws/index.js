const socketIO = require("socket.io");
const Group = require("../models/groupModel");

const initSocket = (http) => {
  const io = socketIO(http, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("logged", async (vals) => {
      // console.log("comming in", vals);
      // const user = await Auth.findOne(vals.email);
      // console.log(user);
    });

    socket.on("join", async ({ name, groupId, userId }) => {
      socket.join(groupId);

      try {
        const groupIdCheck = await Group.findById(groupId);
        if (groupIdCheck) {
          const isUserAlreadyMember = groupIdCheck.members.some((member) =>
            member.userId.equals(userId)
          );
          if (!isUserAlreadyMember) {
            const newMember = {
              userId: userId,
              name: name,
            };
            groupIdCheck.members.push(newMember);
            await groupIdCheck.save();
            console.log(`${name} joined the group ${groupId}`);
          } else {
            console.log(`${name} is already a member of the group ${groupId}`);
          }
        } else {
          console.error(`Group ${groupId} not found`);
        }
      } catch (error) {
        console.log("error", error);
      }
    });

    // if someone emits send message
    socket.on("send-message", async ({ msg, groupId, name, userId }) => {
      io.sockets
        .to(groupId)
        .emit("new-message", { msg, groupId, name, userId });

      try {
        const groupIdCheck = await Group.findById(groupId);
        if (groupIdCheck) {
          const newMessage = {
            sender: {
              userId: userId,
              name: name,
              content: msg,
            },
          };
          groupIdCheck.messages.push(newMessage);
          await groupIdCheck.save();
        } else {
          console.error(`Group ${groupId} not found`);
        }
      } catch (error) {
        console.log("error", error);
      }
    });
  });
};

module.exports = initSocket;
