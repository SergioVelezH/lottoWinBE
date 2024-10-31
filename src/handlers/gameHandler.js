const {
  getAllGames,
  createGame,
  getGameById,
} = require("../controllers/gameControllers");

const getAllGamesHandler = async (req, res) => {
  try {
    const Game = await getAllGames();
    res.status(200).json(Game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createGameHandler = async (req, res) => {
  const { name, image, nft, usdt, size } = req.body;

  try {
    const newGame = await createGame({ name, image, nft, usdt, size });
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGameByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await getGameById(id);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllGamesHandler,
  createGameHandler,
  getGameByIdHandler,
};
