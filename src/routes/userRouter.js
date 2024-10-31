const { Router } = require("express");
const { createNewUserHandler, connectWalletHandler, updateBalanceHandler } = require("../handlers/userHandlers");

const userRouter = Router();

userRouter.post("/" , createNewUserHandler)
userRouter.post("/new",connectWalletHandler)
userRouter.put('/balance', updateBalanceHandler);


module.exports = userRouter;
