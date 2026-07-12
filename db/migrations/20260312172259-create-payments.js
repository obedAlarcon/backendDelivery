'use strict';
 const {PAYMENT_TABLE, PaymentSchema}=require('./../models/payments.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
   await queryInterface.createTable(PAYMENT_TABLE, PaymentSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.drop(PAYMENT_TABLE);
  }
};
