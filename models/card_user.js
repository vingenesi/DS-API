"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class card_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      card_user.belongsTo(models.User, {
        foreignKey: "id",
        as: "user"
      });
    }
  }
  card_user.init(
    {
      user_id: DataTypes.INTEGER,
      nome_no_cartao: DataTypes.STRING,
      expiration_date: DataTypes.DATE,
      cvv: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "card_user"
    }
  );
  return card_user;
};
