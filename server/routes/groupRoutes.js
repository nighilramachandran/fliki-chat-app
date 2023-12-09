const {
  creategroup,
  getAllGroups,
  joinGroup,
} = require("../controllers/groupController");

const router = require("express").Router();

// Route to create a group
router.post("/group", creategroup);

// Route to get all groups
router.get("/group", getAllGroups);

// Route to join groups
router.post("/join-group", joinGroup);

module.exports = router;
