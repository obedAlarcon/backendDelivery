'use strict';

const { PURCHASES_TABLE, PurchaseSchema } = require('./../models/purchases.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface) {

    await queryInterface.createTable(
      PURCHASES_TABLE,
      PurchaseSchema
    );

  },


  async down (queryInterface) {

    await queryInterface.dropTable(
      PURCHASES_TABLE
    );

  }

};