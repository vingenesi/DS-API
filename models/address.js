"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.User, {
        foreignKey: "id",
        as: "user"
      });
    }
  }
  Address.init(
    {
      user_id: DataTypes.INTEGER,
      rua: DataTypes.STRING,
      bairro: DataTypes.STRING,
      cidade: DataTypes.STRING,
      cep: DataTypes.STRING,
      complemento: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "Addresses"
    }
  );
  return Address;
};
