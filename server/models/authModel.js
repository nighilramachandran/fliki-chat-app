const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    require: false,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Users", authSchema);
