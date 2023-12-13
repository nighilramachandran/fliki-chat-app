const Auth = require("../models/authModel");
const bycrypt = require("bcrypt");

//register

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const usernameCheck = await Auth.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "User Name Already exist", status: false });
    }
    const emailCheck = await Auth.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email Already exist", status: false });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = await Auth.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({
      status: true,
      user: { ...user._doc, password: undefined },
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

    const user = await Auth.findOne({ email });

    if (!user) {
      return res.json({ msg: "Invalid Credential", status: false });
    }
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Invalid Credential", status: false });
    }

    // Update the isOnline field to true
    await Auth.updateOne({ _id: user._id }, { $set: { isOnline: true } });

    // Fetch the updated user
    const updatedUser = await Auth.findById(user._id);

    delete user.password;
    return res.json({
      status: true,
      user: { ...updatedUser._doc, password: undefined },
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await Auth.findOne({ email });

    if (!user) {
      return res.json({ msg: "Invalid Credential", status: false });
    }

    //  Update the isOnline field to false
    await Auth.updateOne({ _id: user._id }, { $set: { isOnline: false } });

    // Fetch the updated user
    const updatedUser = await Auth.findById(user._id);

    delete updatedUser.password;
    return res.json({
      status: true,
      user: {},
      user: { ...updatedUser._doc, password: undefined },
    });
  } catch (ex) {
    next(ex);
  }
};
