"use strict";
const moment = require('moment'); 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("card_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      nome_no_cartao:{
        type: Sequelize.STRING,
      },
      card_number: {
        type: Sequelize.STRING,
      },
      payment_method: {
        type: Sequelize.ENUM("CREDITO", "DEBITO"),
        defaultValue: "CREDITO",
        allowNull: false
      },
      expiration_date: {
        type: Sequelize.DATEONLY,
      },
      cvv: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("card_users");
  }
};
