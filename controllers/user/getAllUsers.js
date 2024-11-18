const validator = require("validator");
const { User } = require("../../models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const sendEmail = require("./sendEmail");
const { generateRegistrationToken } = require("../../middleware/generateToken");

const getAllUsers = async (req, res) => {
  try {
    const findAllUsers = await User.findAll({
      attributes: ["name", "email", "cpf", "fone", "active"]
    });

    return res.status(200).json(findAllUsers);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};
module.exports = {
  getAllUsers
};
