'use strict';

const { PurchaseDetailTaxSchema, PURCHASE_DETAIL_TAX_TABLE } = require('../models/purchase-detail-tax.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(PURCHASE_DETAIL_TAX_TABLE, PurchaseDetailTaxSchema);
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.dropTable(PURCHASE_DETAIL_TAX_TABLE)
  }
};
