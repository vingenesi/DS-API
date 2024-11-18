const { createAddressData } = require("../adress/createAddressData");
const { createUserData } = require("../user/createUserData");
const createUserWithAddress = async (req, res) => {
  const {
    name,
    email,
    cpf,
    fone,
    password,
    rua,
    bairro,
    cidade,
    cep,
    complemento
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !rua ||
    !bairro ||
    !cidade ||
    !cep ||
    !complemento
  ) {
    return res.status(400).json({ error: "Todos os dados são obrigatórios." });
  }

  try {
    const newUser = await createUserData({
      name,
      email,
      cpf,
      fone,
      password
    });

    const newAddress = await createAddressData({
      user_id: newUser.id,
      rua,
      bairro,
      cidade,
      cep,
      complemento
    });
    
    return res.status(201).json({
      user: newUser,
      address: newAddress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUserWithAddress
};
