const { getAllGames } = require("../controllers/gameControllers");

const getAllGamesHandler = async (req, res) => {
  try {
    const Game = await getAllGames();
    res.status(200).json(Game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllGamesHandler,
};
