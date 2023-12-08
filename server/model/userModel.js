const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   require: false,
  //   min: 3,
  //   max: 20,
  //   unique: false,
  // },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true,
  },
  userPassword: {
    type: String,
    require: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Users", userSchema);
