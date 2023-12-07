const User = require("../model/userModel");
const bycrypt = require("bcrypt");
module.exports.register = (req, res, next) => {
  console.log("==========>req in server", req.body);

  const { email, username, loginPassword } = req.body;
  //   res.send([1, 2, 3]);
};
