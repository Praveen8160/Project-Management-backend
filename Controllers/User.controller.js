const User = require("../models/User.model.js");
const { setUserToken } = require("../Service/authentication.js");
const handelUserSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    // console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ success: false });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ success: false });
    }
    await User.create({
      username,
      email,
      password,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("server error in register", error);
    return res.status(500).json({ success: false });
  }
};
const handleUserSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      const passwordcheck = await checkUser.checkpassword(password);
      if (passwordcheck) {
        const usertoken = setUserToken(checkUser);
        res.cookie("usertoken", usertoken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({ success: false });
      }
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (error) {
    console.log("server error in Login", error);
    return res.status(500).json({ success: false });
  }
};
const handlegetAllUser = async (req, res) => {
  try {
    const allUser = await User.find({}, "username");
    // console.log("users", allUser);
    res.status(200).json(allUser);
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
module.exports = { handelUserSignup, handleUserSignin, handlegetAllUser };
