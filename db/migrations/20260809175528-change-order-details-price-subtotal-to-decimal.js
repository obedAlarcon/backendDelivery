
'use strict';

const ORDER_DETAILS_TABLE = 'order_details';

module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable(ORDER_DETAILS_TABLE);

    if (!/decimal|numeric/i.test(columns.price.type)) {
      await queryInterface.changeColumn(ORDER_DETAILS_TABLE, 'price', {
        allowNull: false,
        type: Sequelize.DECIMAL(12, 2),
      });
    }

    if (!/decimal|numeric/i.test(columns.subtotal.type)) {
      await queryInterface.changeColumn(ORDER_DETAILS_TABLE, 'subtotal', {
        allowNull: false,
        type: Sequelize.DECIMAL(12, 2),
      });
    }
  },

  async down() {
    // No convertir los importes a INTEGER para evitar pérdida de decimales.
  },
};
