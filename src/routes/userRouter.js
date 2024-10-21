const { Router } = require("express");
const { createNewUserHandler } = require("../handlers/userHandlers");

const userRouter = Router();

userRouter.post("/" , createNewUserHandler)

module.exports = userRouter;
