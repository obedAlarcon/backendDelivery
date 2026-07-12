'use strict';
const {ORDER_DETAILS_TABLE,Oder_detailsSchema}=require('./../models/order_details');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_DETAILS_TABLE,Oder_detailsSchema);
   
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.drop(ORDER_DETAILS_TABLE);
  }
};
