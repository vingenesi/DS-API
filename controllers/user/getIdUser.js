const validator = require("validator");
const { User } = require("../../models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const sendEmail = require("./sendEmail");
const { generateRegistrationToken } = require("../../middleware/generateToken");

const getIdUser = async (req, res) => {
  const { id } = req.body;

  try {
    const findId = await User.findOne({
      where: {
        id
      }
    });

    if (!findId) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.status(200).json(findId);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuário." });
  }
};

module.exports = {
  getIdUser
};
