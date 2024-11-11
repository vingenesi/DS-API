'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    id: DataTypes.INTEGER,
    discountPercentual: DataTypes.FLOAT,
    category: DataTypes.STRING,
    productName: DataTypes.STRING,
    discountPrice: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    isDiscount: DataTypes.BOOLEAN,
    url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};