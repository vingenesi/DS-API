const validator = require("validator");
const { User } = require("../../models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const sendEmail = require("./sendEmail");
const { generateRegistrationToken } = require("../../middleware/generateToken");

const createUser = async (req, res) => {
  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Nome, email e senha são obrigatórios." });
  }
  const { name, email, cpf, fone, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Formato de e-mail inválido." });
  }

  try {
    const findUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { cpf }]
      }
    });

    if (findUser) {
      if (findUser.email === email) {
        return res.status(409).json({ error: "E-mail já cadastrado." });
      }
      if (findUser.cpf === cpf) {
        return res.status(409).json({ error: "CPF já cadastrado." });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      cpf,
      fone,
      password: hashedPassword
    });
    const registrationToken = generateRegistrationToken(newUser);

    /*
    sendEmail(
      email,
      "Bem-vindo à aplicação",
      `Olá ${name}, sua conta foi criada com sucesso!`,
      res
    );
    */
    return res.status(201).json({
      newUser,
      registrationToken
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
};
module.exports = {
  createUser
};
