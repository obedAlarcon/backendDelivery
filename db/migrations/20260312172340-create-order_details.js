
'use strict';

const {
  ORDER_DETAILS_TABLE,
  Order_detailsSchema,
} = require('./../models/order_details.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      ORDER_DETAILS_TABLE,
      Order_detailsSchema
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_DETAILS_TABLE);
  },
};