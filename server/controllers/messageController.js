const { json } = require("express");
const Message = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  const { message, groupId, senderId } = req.body;

  console.log("req.body", req.body);

  const data = await Message.create({
    message: { text: message },
    groupId: groupId,
    senderId: senderId,
  });
  if (!data) {
    return res.json({ msg: "data not saved successfully" });
  }
  if (data) {
    return res.json({ msg: "data saved successfully" });
  }
};
module.exports.getAllMessage = async (req, res, next) => {};
