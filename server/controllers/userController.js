const User = require("../model/userModel");
const bycrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { email, username, loginPassword } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "User Name Already exist", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email Already exist", status: false });
    }
    const hashedPassword = await bycrypt.hash(loginPassword, 10);
    const user = await User.create({
      email,
      username,
      loginPassword: hashedPassword,
    });
    delete user.loginPassword;
    return res.json({ status: true, user, msg: "User Created Successfully" });
  } catch (ex) {
    next(ex);
  }
};
