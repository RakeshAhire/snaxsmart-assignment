const { Router } = require("express");
const { handleLogin, handleSignup } = require("../controllers/user");


const userRouter = Router();

userRouter.post("/login",  handleLogin)
userRouter.post("/register", handleSignup)

module.exports = { userRouter }