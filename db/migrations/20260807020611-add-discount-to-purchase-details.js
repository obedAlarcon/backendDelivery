'use strict';

const { PURCHASE_DETAIL_TABLE } = require('../models/purchase_detail.model');

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      PURCHASE_DETAIL_TABLE,
      'discount',
      {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(5,2)
      }
    );

  },

  async down(queryInterface) {

    await queryInterface.removeColumn(
      PURCHASE_DETAIL_TABLE,
      'discount'
    );

  }

};