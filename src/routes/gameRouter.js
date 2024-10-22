const { Router } = require("express");
const { getAllGamesHandler } = require("../handlers/gameHandler");

const gameRouter = Router();

gameRouter.get("/", getAllGamesHandler);

module.exports = gameRouter;
