const express = require("express");
const { getUserToken } = require("../Service/authentication");
const router = express.Router();

router.get("/auth", (req, res) => {
  const Token = req.cookies.usertoken;
  if (Token) {
    // console.log(Token);
    const userPayload = getUserToken(Token);
    userPayload ? res.json({ success: true }) : res.json({ success: false });
  } else {
    res.json({ success: false });
  }
});
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("usertoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Match the secure flag
      sameSite: "None",
    });
    res.json({ success: true });
  } catch (error) {}
});
module.exports = router;
