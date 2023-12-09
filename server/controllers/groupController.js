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

    const group = await Group.create({
      groupname,
    });
    return res.json({
      status: true,
      group,
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

    return res.json({ status: true, groups });
  } catch (ex) {
    next(ex);
  }
};

// Function to join group
module.exports.joinGroup = async (req, res, next) => {
  try {
    // console.log("comming", req.body);

    const { groupId, username, userId } = req.body;

    const user = await User.findById(userId);
    const group = await Group.findById(groupId);

    // console.log("group", group);

    // Check if the user and group exist
    if (!user || !group) {
      return res.json({ msg: "User or group not found", status: false });
    }

    // // Check if the user is already in the group
    // if (group.users.includes(userId)) {
    //   return res.json({ msg: "User is already in the group", status: false });
    // }

    // Check if the user is already in the group
    if (group.users.some((user) => user.userId.equals(userId))) {
      return res.json({ msg: "User is already in the group", status: false });
    }

    // Add the user to the group
    // group.users.push(userId);
    group.users.push({
      userId: userId,
      username: username,
      isOnline: true,
    });
    await group.save();

    return res.json({
      status: true,
      group,
      msg: "Joined Group Successfully",
    });
  } catch (ex) {
    next(ex);
  }
};
