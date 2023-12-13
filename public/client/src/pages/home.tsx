import { Typography } from "@mui/material";
// import socketIO from "socket.io-client";
import { useAppSelector } from "../redux/hooks";

// const socket = socketIO("http://localhost:3005/");

// socket.on("connect", () => {
//   console.log("Connected socket on client");
//   console.log("socket id", socket.id);
// });

// ==============================================

// socket.on("connect", () => {
//   console.log("Connected socket on client");

//   // if you want to join group
//   // like axio.post("join api")
//   // socket.emit("join", { name: "najeb", groupId: "qweq" });

//   // if you want to send message
//   // axios.post("send message")
// });
// // will be called when you receive a message
// socket.on("new-message", (message) => {
//   console.log("new message", message);
// });
// //
// socket.on("logout", () => console.log("Logout"));
// socket.on("join", () => console.log("join"));

// socket.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   socket.on("disconnect", () => {
//     console.log("🔥: A user disconnected");
//   });
// });

// const sendMessage = () => {
//   // const sendMessage = (msg, groupId, name) => {
//   socket.emit("send-message", {
//     test: 1,
//     msg: "hello najeb test by nIhguk",
//     groupId: "qweq",
//     name: "najeb",
//   });
// };

// console.log(socket);
// socket.on("connect", () => {
//   console.log("Connect", socket.id); // x8WIv7-mJelg7on_ALbx
// });
const Home = () => {
  const { user } = useAppSelector((state) => state.Auth);
  // socket.emit("logged", user);

  return <Typography>Home</Typography>;
};

export default Home;
