const { generateAuthToken } = require("../../middleware/generateToken");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  try {
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha inválida." });
    }

    const authToken = generateAuthToken(user);

    return res.status(200).json({
      message: "Login bem-sucedido",
      authToken
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao fazer o login usuário." });
  }
};

module.exports = {
  loginUser
};
