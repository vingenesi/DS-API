const { User } = require("../../models");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const createUserData = async (userData) => {
    const { name, email, cpf, fone, password } = userData;
  
    if (!name || !email || !password) {
      throw new Error("Nome, email e senha são obrigatórios.");
    }
  
    if (!validator.isEmail(email)) {
      throw new Error("Formato de e-mail inválido.");
    }
  
    const findUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { cpf }],
      },
    });
  
    if (findUser) {
      if (findUser.email === email) throw new Error("E-mail já cadastrado.");
      if (findUser.cpf === cpf) throw new Error("CPF já cadastrado.");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = await User.create({
      name,
      email,
      cpf,
      fone,
      password: hashedPassword,
    });
  
    return newUser;
  };
  
  module.exports = { createUserData };