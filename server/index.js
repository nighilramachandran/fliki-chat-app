const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const groupRoute = require("./routes/groupRoute");
const initSocket = require("./ws/index");

const app = express();
require("dotenv").config();
const http = require("http").createServer(app);

app.use(cors());
app.use(express.json());

//auth
app.use("/api/auth", authRoute);

//group
app.use("/api/group", groupRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection succesfull");
  })
  .catch((error) => {
    console.log(`error in db ${error.message}`);
  });

const server = app.listen(process.env.PORT, () => {
  console.log("listing to port", `${process.env.PORT}`);
});

initSocket(server);
