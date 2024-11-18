"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Address, {
        foreignKey: "user_id",
        as: 'Addresses',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      cpf: DataTypes.STRING,
      fone: DataTypes.STRING,
      password: DataTypes.STRING,
      active: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "User",
      tableName: 'Users',
    }
  );
  return User;
};
