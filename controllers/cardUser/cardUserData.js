const { User, card_user } = require("../../models");

const createCardUserData = async (CardUserData, options) => {
  const {
    user_id,
    payment_method,
    card_number,
    nome_no_cartao,
    expiration_date,
    cvv
  } = CardUserData;

  if (
    !user_id ||
    !payment_method ||
    !card_number ||
    !nome_no_cartao ||
    !expiration_date ||
    !cvv
  ) {
    throw new Error("Todos os campos do cartão são obrigatórios.");
  }

  const user = await User.findByPk(user_id);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const newCard = await card_user.create(
    {
      user_id,
      payment_method,
      card_number,
      nome_no_cartao,
      expiration_date,
      cvv
    },
    { transaction: options }
  );

  return newCard;
};

module.exports = {
  createCardUserData
};
