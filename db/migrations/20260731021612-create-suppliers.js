'use strict';

const { SUPPLIER_TABLE, SupplierSchema } = require('./../models/suppliers.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface) {

    await queryInterface.createTable(
      SUPPLIER_TABLE,
      SupplierSchema
    );

  },


  async down (queryInterface) {

    await queryInterface.dropTable(
      SUPPLIER_TABLE
    );

  }

};