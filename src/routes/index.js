const { Router } = require("express");
const gameRouter = require("./gameRouter");
const prizeRouter = require("./prizeRouter");
const userRouter = require("./userRouter");

const mainRouter = Router();

mainRouter.use("/game", gameRouter);
mainRouter.use("/prize", prizeRouter);
mainRouter.use("/user", userRouter);




module.exports = mainRouter;
