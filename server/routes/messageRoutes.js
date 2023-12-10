const {
  addMessage,
  getAllMessage,
} = require("../controllers/messageController");

const router = require("express").Router();

// Route to Add Message
router.post("/addmsg", addMessage);

// Route to Get Message
router.post("/getmsg", getAllMessage);

module.exports = router;
