const {
  creategroup,
  getAllGroups,
  // joinGroup,
  getChatGroup,
} = require("../controllers/groupController");

const router = require("express").Router();

// Route to create a group
router.post("/group", creategroup);

// Route to get all groups
router.get("/group", getAllGroups);

// Route to get all groups
router.post("/chat-group", getChatGroup);

// Route to join groups
// router.post("/join-group", joinGroup);

module.exports = router;
