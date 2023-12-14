const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
});

const memberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const groupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  members: [memberSchema],
  messages: [messageSchema],
});

module.exports = mongoose.model("Groups", groupSchema);
