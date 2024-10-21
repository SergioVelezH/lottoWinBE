const { postNewUser } = require("../controllers/userControllers");

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

module.exports = {
  createNewUserHandler,
};
