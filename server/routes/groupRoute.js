const { creategroup } = require("../controllers/groupController");

const router = require("express").Router();

// Route to create a group
router.post("/group", creategroup);

// // Route to get all groups
// router.get("/all-group", getAllGroups);

module.exports = router;
