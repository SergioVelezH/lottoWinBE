const { Router } = require("express");
const { getAllGamesHandler, createGameHandler, getGameByIdHandler } = require("../handlers/gameHandler");

const gameRouter = Router();

gameRouter.get("/", getAllGamesHandler);
gameRouter.post("/new", createGameHandler)
gameRouter.get("/:id", getGameByIdHandler)

module.exports = gameRouter;
