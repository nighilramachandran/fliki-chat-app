const { register, login, logout } = require("../controllers/authController");

const router = require("express").Router();

// Route to register
router.post("/register", register);
//login
router.post("/login", login);
//logout
router.post("/logout", logout);

module.exports = router;
