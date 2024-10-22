const { Game } = require("../db");

const getAllGames = async () => {
  return await Game.findAll(); 
};

module.exports = {
  getAllGames,
};
