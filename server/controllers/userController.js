const User = require("../model/userModel");
const bycrypt = require("bcrypt");

//register

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
      userPassword: hashedPassword,
    });
    delete user.loginPassword;
    return res.json({
      status: true,
      user: { ...user._doc, userPassword: undefined },
      msg: "User Created Successfully",
    });
  } catch (ex) {
    next(ex);
  }
};

//login

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ msg: "Invalid Credential", status: false });
    }
    const isPasswordValid = await bycrypt.compare(password, user.userPassword);
    if (!isPasswordValid) {
      return res.json({ msg: "Invalid Credential", status: false });
    }
    delete user.userPassword;
    return res.json({
      status: true,
      user: { ...user._doc, userPassword: undefined },
    });
  } catch (ex) {
    next(ex);
  }
};
