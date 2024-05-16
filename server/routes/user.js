import express from "express";
import User from "../models/user.js";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "Please provide fullName, email, and password",
    });
  }
  const alreadyPresent = User.findOne({ email: email });
  console.log(alreadyPresent);
  if (alreadyPresent !== null) {
    return res.status(400).json({
      message: "this user already exist",
      success: false,
      path: "login",
    });
  }

  await User.create({
    fullName,
    email,
    password,
  });
  return res.status(200).json({
    success: true,
    message: "User Created successfully",
  });
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPassword(email, password);

    return res.cookie("token", token).status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Incorrect email or password",
    });
  }
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logged Out successfully",
  });
});

export default userRouter;
