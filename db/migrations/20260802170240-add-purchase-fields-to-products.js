
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('products');

    if (!columns.purchase_price) {
      await queryInterface.addColumn('products', 'purchase_price', {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      });
    }

    if (!columns.min_stock) {
      await queryInterface.addColumn('products', 'min_stock', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5,
      });
    }

    if (!columns.updated_at) {
      await queryInterface.addColumn('products', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }
  },

  async down() {
    // No eliminar columnas que podrían contener datos existentes.
  },
};
