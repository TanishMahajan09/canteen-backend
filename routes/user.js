const express = require("express");
const router = express.Router();
const JWT_SECRET = require("../utils/jwt");
const mongoose = require("mongoose");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/userMiddleware");
const { userSignUp, userSignIn } = require("../zod/user");

router.post("/login", async (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;

  let signIpAs = req.body.signUpAs;
  let obj = { userName, password, signUpAs };
  let verification = userSignIn.safeParse(obj);
  if (!verification.success) {
    return res.json({
      msg: "Wrong format",
    });
  }
  let userfound = await User.findOne({ userName: userName });
  if (!userfound) {
    return res.json({
      msg: "user not found",
    });
  }
  let token = jwt.sign({ userId: userfound._id }, JWT_SECRET);
  return res.status(200).json({
    msg: token,
  });
});

router.post("/signup", async (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let userName = req.body.userName;
  let password = req.body.password;
  let signUpAs = req.body.signUpAs;
  let obj = {
    firstName,
    lastName,
    userName,
    password,
    signUpAs,
  };
  let verification = userSignUp.safeParse(obj);
  if (!verification.success) {
    return res.json({
      msg: "Wrong format",
    });
  }
  let userfound = await User.findOne({ userName: userName });
  if (userfound) {
    return res.json({
      msg: "User already exists",
    });
  }
  let user = await User.create(obj);
  let token = jwt.sign({ userId: user._id }, JWT_SECRET);
  return res.json({
    msg: token,
  });
});

module.exports = router;
