'use strict';

const { TaxSchema, TAX_TABLE } = require('./../models/taxes.model');

module.exports = {
  async up(queryInterface) {

    await queryInterface.createTable(
      TAX_TABLE,
      TaxSchema
    );

  },

  async down(queryInterface) {

    await queryInterface.dropTable(TAX_TABLE);

  }
};