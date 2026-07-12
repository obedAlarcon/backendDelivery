'use strict';
const { ORDERS_TABLE, OrdersSchema }=require('./../models/orders.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable(ORDERS_TABLE, OrdersSchema);
  },

  async down (queryInterface, Sequelize) {
    await  queryInterface.drop(ORDERS_TABLE);
  }
};
