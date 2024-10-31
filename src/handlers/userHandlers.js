const {
  postNewUser,
  createUserWithWallet,
  updateUserBalance,
} = require("../controllers/userControllers");

const createNewUserHandler = async (req, res) => {
  const { name, email, image, wallet } = req.body;

  try {
    const response = await postNewUser(name, email, image, wallet);
    const { id } = response.dataValues;
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const connectWalletHandler = async (req, res) => {
  try {
    const newUser = await createUserWithWallet(); // Crear el usuario con la wallet y balance 0
    return res.status(201).json(newUser); // Retornar el usuario creado
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateBalanceHandler = async (req, res) => {
  const { userId, newBalance } = req.body; // Recibir los datos del frontend

  try {
    const updatedUser = await updateUserBalance(userId, newBalance); // Actualizar el balance
    return res.status(200).json(updatedUser); // Retornar el usuario con el balance actualizado
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewUserHandler,
  connectWalletHandler,
  updateBalanceHandler,
};
