
'use strict';

const { PURCHASE_DETAIL_TABLE } = require('../models/purchase_detail.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();

    const exists = tables.some(
      (table) =>
        (typeof table === 'string' ? table : table.tableName)
          .toLowerCase() === PURCHASE_DETAIL_TABLE.toLowerCase()
    );

    if (!exists) {
      return;
    }

    const columns = await queryInterface.describeTable(PURCHASE_DETAIL_TABLE);

    if (!columns.discount) {
      await queryInterface.addColumn(PURCHASE_DETAIL_TABLE, 'discount', {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(5, 2),
      });
    }
  },

  async down() {
    // No eliminar columnas automáticamente para proteger los datos.
  },
};
