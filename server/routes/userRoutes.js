const { register, login } = require("../controllers/userController");

const router = require("express").Router();

// Route to register
router.post("/register", register);

// Route to login
router.post("/login", login);

module.exports = router;
