const validator = require("validator");
const { User } = require("../../models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const sendEmail = require("./sendEmail");
const { generateRegistrationToken } = require("../../middleware/generateToken");

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const updatedUser = await User.update({ active: false }, { where: { id } });
    console.log("Resultado da atualização:", updatedUser);

    if (updatedUser[0] === 0) {
      return res.status(400).json({ error: "Falha ao excluir usuário." });
    }

    return res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    //console.error("Erro ao excluir usuário:", error);
    return res.status(500).json({ error: "Falha ao excluir usuário." });
  }
};

module.exports = {
  deleteUser
};
