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

const createGame = async ({ name, image, nft, usdt, size }) => {
  try {
    const prizes = await Prize.findAll();

    const newGame = await Game.create({
      name,
      image,
      nft,
      usdt,
      size,
    });

    await newGame.addPrizes(prizes);

    return newGame;
  } catch (error) {
    console.error("Error al crear el juego:", error);
    throw error; // Propaga el error para que pueda ser manejado por el llamador
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
