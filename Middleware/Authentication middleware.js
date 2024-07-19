const { getUserToken } = require("../Service/authentication.js");
function checkAUthenticationCookie(token) {
  return (req, res, next) => {
    const usertoken = req.cookies[token];
    if (!usertoken) {
      return next();
    }
    try {
      const userPayload = getUserToken(usertoken);
      // console.log("User Payload:", userPayload);
      req.users = userPayload;
      return next();
    } catch (error) {
      console.error("Error decoding token:", error);
      return res.sendStatus(403);
    }
  };
}
module.exports = checkAUthenticationCookie;
