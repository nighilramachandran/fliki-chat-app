const Group = require("../model/groupModel");
const User = require("../model/userModel");

//function to create group

module.exports.creategroup = async (req, res, next) => {
  try {
    const { groupname } = req.body;
    const groupnameCheck = await Group.findOne({ groupname });
    if (groupnameCheck) {
      return res.json({ msg: "Group Name Already exist", status: false });
    }

    const groups = await Group.create({
      groupname: groupname,
    });

    return res.json({
      status: true,
      groups,
      msg: "Group Created Successfully",
    });
  } catch (ex) {
    next(ex);
  }
};

// Function to get all groups
module.exports.getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();

    if (!groups || groups.length === 0) {
      return res.json({ msg: "No Groups Found", status: false });
    }

    return res.json({ status: true, groups, msg: "" });
  } catch (ex) {
    next(ex);
  }
};

// Function to join group
module.exports.joinGroup = async (req, res, next) => {
  try {
    const { groupId, username, userId } = req.body;

    const user = await User.findById(userId);

    const groups = await Group.findById(groupId);

    if (!user || !groups) {
      return res.json({ msg: "User or group not found", status: false });
    }

    // Check if the user is already in the group
    if (groups.users.some((user) => user.userId.equals(userId))) {
      return res.json({ msg: "User is already in the group", status: false });
    }

    groups.users.push({
      userId: userId,
      username: username,
      isOnline: true,
    });
    await groups.save();

    let allGroup = await Group.find();

    return res.json({
      status: true,
      groups: allGroup,
      msg: "Joined Group Successfully",
    });
  } catch (ex) {
    next(ex);
  }
};
