'use strict';

const ORDER_DETAILS_TABLE = 'order_details';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.changeColumn(
      ORDER_DETAILS_TABLE,
      'price',
      {
        allowNull: false,
        type: Sequelize.DECIMAL(12, 2)
      }
    );

    await queryInterface.changeColumn(
      ORDER_DETAILS_TABLE,
      'subtotal',
      {
        allowNull: false,
        type: Sequelize.DECIMAL(12, 2)
      }
    );

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.changeColumn(
      ORDER_DETAILS_TABLE,
      'price',
      {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    );

    await queryInterface.changeColumn(
      ORDER_DETAILS_TABLE,
      'subtotal',
      {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    );

  }

};