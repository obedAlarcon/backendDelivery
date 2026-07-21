'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('orders', 'customer_id', {

      type: Sequelize.INTEGER,

      allowNull: true,

      references: {

        model: 'customers',

        key: 'id'

      },

      onUpdate: 'CASCADE',

      onDelete: 'RESTRICT'

    });

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.removeColumn('orders', 'customer_id');
  }
};
