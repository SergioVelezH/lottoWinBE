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

module.exports = {
  postNewUser,
};
