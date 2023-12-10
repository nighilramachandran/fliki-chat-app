const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      username: String,
      isOnline: Boolean,
    },
  ],
});

module.exports = mongoose.model("Groups", groupSchema);
