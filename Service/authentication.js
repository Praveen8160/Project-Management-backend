const jwt = require("jsonwebtoken");
const setUserToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.username,
      email: user.email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );
};
const getUserToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    return payload;
  } catch (error) {
    console.log("error at getting token", error);
  }
};
module.exports = {
  setUserToken,
  getUserToken,
};
