const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  groupname: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
});

module.exports = mongoose.model("Groups", userSchema);
