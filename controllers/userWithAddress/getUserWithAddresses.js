const validator = require("validator");
const { User, Address } = require("../../models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const sendEmail = require("../user/sendEmail");
const { generateRegistrationToken } = require("../../middleware/generateToken");

const getUserWithAddresses = async (req, res) => {
  const { id } = req.params;
  try {


    const user = await User.findOne({
      where: {
        id
      },
      include: [
        {
          model: Address, // O modelo que será incluído
          as: "Addresses" // Usa o alias definido na associação User.hasMany
        }
      ]
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
