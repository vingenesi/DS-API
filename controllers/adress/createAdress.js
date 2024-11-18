const { User, Address } = require("../../models");

async function createAdress(req, res) {
  const { user_id, rua, bairro, cidade, cep, complemento } = req.body;

  if (!user_id || !rua || !bairro || !cidade || !cep || !complemento) {
    return res.status(400).json({ error: "Todos os dados são obrigatórios." });
  }

  const user = await User.findByPk(user_id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  try {
    const addAdress = await Address.create({
      user_id,
      rua,
      bairro,
      cidade,
      cep,
      complemento
    });

    return res.status(201).json({ addAdress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  createAdress
};
