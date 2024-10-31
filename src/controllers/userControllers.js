require("dotenv").config();
const axios = require("axios");
const { User } = require("../db");
const { Sequelize } = require("sequelize");

const postNewUser = async (name, email, image, wallet) => {
  const existingUser = await User.findOne({ where: { name } });

  if (existingUser) {
    throw new Error("There is already a user with the same name");
  }

  return await User.create({
    name,
    email,
    image,
    wallet,
  });
};

const createUserWithWallet = async () => {
  try {
    const newUser = await User.create({
      balance: "0", // Hardcodear el balance a 0 al crear el usuario
    });
    return newUser;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
};

const updateUserBalance = async (userId, newBalance) => {
  try {
    const user = await User.findByPk(userId); // Buscar al usuario por ID

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    user.balance = newBalance; // Actualizar el balance
    await user.save(); // Guardar los cambios

    return user;
  } catch (error) {
    throw new Error("Error al actualizar el balance: " + error.message);
  }
};

module.exports = {
  postNewUser,
  createUserWithWallet,
  updateUserBalance,
};
