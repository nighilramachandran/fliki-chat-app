const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

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
