'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('products', 'purchase_price', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    });

    await queryInterface.addColumn('products', 'min_stock', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 5
    });

    await queryInterface.addColumn('products', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });

  },

  async down(queryInterface) {

    await queryInterface.removeColumn('products', 'purchase_price');

    await queryInterface.removeColumn('products', 'min_stock');

    await queryInterface.removeColumn('products', 'updated_at');

  }
};