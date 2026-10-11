
'use strict';

const {
  ORDER_DETAILS_TABLE,
  Order_detailsSchema,
} = require('./../models/order_details.model');

module.exports = {
  async up(queryInterface) {
    const columns = await queryInterface.describeTable(ORDER_DETAILS_TABLE);

    if (Object.keys(columns).length === 0) {
      await queryInterface.createTable(
        ORDER_DETAILS_TABLE,
        Order_detailsSchema
      );
    }

    const [constraints] = await queryInterface.sequelize.query(`
      SELECT conname
      FROM pg_constraint
      WHERE conrelid = 'public.order_details'::regclass;
    `);

    const names = constraints.map((constraint) => constraint.conname);

    if (!names.includes('fk_order_details_order')) {
      await queryInterface.addConstraint(ORDER_DETAILS_TABLE, {
        fields: ['order_id'],
        type: 'foreign key',
        name: 'fk_order_details_order',
        references: { table: 'orders', field: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    if (!names.includes('fk_order_details_product')) {
      await queryInterface.addConstraint(ORDER_DETAILS_TABLE, {
        fields: ['product_id'],
        type: 'foreign key',
        name: 'fk_order_details_product',
        references: { table: 'products', field: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
    }
  },

  async down() {
    // No elimina la tabla ni sus datos.
  },
};
