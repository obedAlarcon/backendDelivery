
'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    // Eliminar campos que ahora pertenecen al detalle
    await queryInterface.removeColumn(
      'credits',
      'total_pagado'
    );

    await queryInterface.removeColumn(
      'credits',
      'saldo'
    );

    await queryInterface.removeColumn(
      'credits',
      'fecha_proximo_pago'
    );

    await queryInterface.removeColumn(
      'credits',
      'dias_mora'
    );

    // Agregar número de paz y salvo
    await queryInterface.addColumn(
      'credits',
      'numero_paz_salvo',
      {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
      }
    );

  },

  async down(queryInterface, Sequelize) {

    // Eliminar número de paz y salvo
    await queryInterface.removeColumn(
      'credits',
      'numero_paz_salvo'
    );

    // Restaurar campos anteriores
    await queryInterface.addColumn(
      'credits',
      'total_pagado',
      {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      }
    );

    await queryInterface.addColumn(
      'credits',
      'saldo',
      {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      }
    );

    await queryInterface.addColumn(
      'credits',
      'fecha_proximo_pago',
      {
        allowNull: false,
        type: Sequelize.DATE,
      }
    );

    await queryInterface.addColumn(
      'credits',
      'dias_mora',
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }
    );

  },

};

