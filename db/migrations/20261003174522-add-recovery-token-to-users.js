
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('users');

    if (!columns.recovery_token) {
      await queryInterface.addColumn('users', 'recovery_token', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down() {
    // No eliminar recovery_token automáticamente para proteger los datos.
  },
};
