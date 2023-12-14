const {
  creategroup,
  getAllGroups,
  getGroupById,
} = require("../controllers/groupController");

const router = require("express").Router();

// Route to create a group
router.post("/create", creategroup);

// // Route to get all groups
router.get("/all-group", getAllGroups);

//group by ud
router.post("/group-by-id", getGroupById);

module.exports = router;
