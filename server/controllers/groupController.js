const Group = require("../model/groupModel");

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
