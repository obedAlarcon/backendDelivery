
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('credit_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      credit_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'credits',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      numero_cuota: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },

      fecha_vencimiento: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },

      fecha_pago: {
        allowNull: true,
        type: Sequelize.DATE,
      },

      estado: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Pendiente',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('credit_details');
  },
};
