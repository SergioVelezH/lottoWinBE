const { Game, Prize } = require("../db");

const getAllGames = async () => {
  const games = await Game.findAll({
    include: {
      model: Prize,
      as: "prizes", // Asegúrate de que este alias coincida con lo que definiste en la relación
    },
  });
  return games;
};

const createGame = async ({ name, image, nft, size }) => {
  try {
    // Obtén todos los premios
    const prizes = await Prize.findAll();
    // Calcula la sumatoria del campo 'usdt' de todos los premios
    const totalUsdt = prizes.reduce((sum, prize) => sum + prize.usdt, 0);
    // Crea el juego con la sumatoria de 'usdt' de los premios
    const newGame = await Game.create({
      name,
      image,
      nft,
      usdt: totalUsdt, // Asigna la sumatoria al campo usdt del juego
      size,
    });
    // Asocia el juego con los premios
    await newGame.addPrizes(prizes);

    return newGame;
  } catch (error) {
    console.error("Error al crear el juego:", error);
    throw error;
  }
};

const getGameById = async (id) => {
  const game = await Game.findOne({
    where: { id },
    include: {
      model: Prize,
      as: "prizes", // Asegúrate de usar el alias correcto si has definido uno en la asociación
    },
  });
  if (!game) {
    throw new Error("Game not found");
  }
  return game;
};

module.exports = {
  getAllGames,
  createGame,
  getGameById,
};
