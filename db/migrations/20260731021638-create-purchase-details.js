'use strict';

const { PURCHASE_DETAIL_TABLE, PurchaseDetailSchema } = require('./../models/purchase_detail.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface) {

    await queryInterface.createTable(
      PURCHASE_DETAIL_TABLE,
      PurchaseDetailSchema
    );

  },


  async down (queryInterface) {

    await queryInterface.dropTable(
      PURCHASE_DETAIL_TABLE
    );

  }

};