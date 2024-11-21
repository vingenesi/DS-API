const { User, Address } = require("../../models");

const createAddressData = async (addressData, options) => {
  const { user_id, rua, bairro, cidade, cep, complemento } = addressData;

  if (!user_id || !rua || !bairro || !cidade || !cep || !complemento) {
    throw new Error("Todos os dados do endereço são obrigatórios.");
  }

  const user = await User.findByPk(user_id);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const newAddress = await Address.create(
    {
      user_id,
      rua,
      bairro,
      cidade,
      cep,
      complemento
    },
    { transaction: options }
  );

  return newAddress;
};

module.exports = {
  createAddressData
};
