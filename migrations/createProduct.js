'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
            discountPercentual: {
                type: Sequelize.FLOAT
            },
            category: {
                type: Sequelize.STRING
            },
            productName: {
                type: Sequelize.STRING
            },
            discountPrice: {
                type: Sequelize.FLOAT
            },
            price: {
                type: Sequelize.FLOAT
            },
            isDiscount: {
                type: Sequelize.BOOLEAN
            },
            url: {
                type: Sequelize.STRING
            }
        }
)},
async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
}}