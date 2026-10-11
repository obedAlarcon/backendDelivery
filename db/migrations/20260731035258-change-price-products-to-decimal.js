
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('products');

    if (!/decimal|numeric/i.test(columns.price.type)) {
      await queryInterface.changeColumn('products', 'price', {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      });
    }
  },

  async down() {
    // No convertir precios a INTEGER para evitar perder decimales.
  }
};
