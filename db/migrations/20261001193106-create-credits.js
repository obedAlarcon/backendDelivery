'use strict';

const { CreditSchema, CREDIT_TABLE } = require('./../models/credit.model');

module.exports = {

  async up(queryInterface) {

    await queryInterface.createTable(
      CREDIT_TABLE,
      CreditSchema
    );

  },

  async down(queryInterface) {

    await queryInterface.dropTable(CREDIT_TABLE);

  }

};