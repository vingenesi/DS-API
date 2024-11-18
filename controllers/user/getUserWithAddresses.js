const validator = require("validator");
const { User } = require("../../models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const sendEmail = require("./sendEmail");
const { generateRegistrationToken } = require("../../middleware/generateToken");

const getUserWithAddresses = async (req, res) => {
  try {
    if (req.user.id !== parseInt(req.params.id, 10)) {
      return res.status(403).json({ error: "Acesso não autorizado!" });
    }

    const user = await User.findByPk(req.params.id, {
      include: [{ model: Address, as: "addresses" }]
    });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.json(user);
  } catch (error) {
    console.log("Erro ao buscar usuário:", error); // Log do erro para debug
    res.status(500).json({ error: "Erro ao buscar usuário com endereços." });
  }
};
module.exports = {
  getUserWithAddresses
};
