const { createAddressData } = require("../adress/createAddressData");
const { createUserData } = require("../user/createUserData");
const { createCardUserData } = require("../cardUser/cardUserData");
const { sequelize } = require("../../models");

const finalizaCompra = async (req, res) => {
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
    complemento,
    payment_method,
    card_number,
    nome_no_cartao,
    expiration_date,
    cvv
  } = req.body;

  const transaction = await sequelize.transaction();
  try {
    const newUser = await createUserData({
      name,
      email,
      cpf,
      fone,
      password
    });

    const newAddress = await createAddressData(
      {
        user_id: newUser.id,
        rua,
        bairro,
        cidade,
        cep,
        complemento
      },
      transaction
    );

    const newCard = await createCardUserData(
      {
        user_id: newUser.id,
        payment_method,
        card_number,
        nome_no_cartao,
        expiration_date,
        cvv
      },
      transaction
    );
    await transaction.commit();
    return res.status(201).json({
      user: newUser,
      address: newAddress,
      card: newCard
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

module.exports = { finalizaCompra };
