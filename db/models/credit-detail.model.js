const { Model, DataTypes } = require('sequelize');

const CREDIT_DETAIL_TABLE = 'credit_details';

const CreditDetailSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  creditId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'credit_id',
  },

  numeroCuota: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'numero_cuota',
  },

  valor: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  },

  fechaVencimiento: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'fecha_vencimiento',
  },

  fechaPago: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_pago',
  },

  estado: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'Pendiente',
  },
};

class CreditDetail extends Model {
  static associate(models) {
    this.belongsTo(models.Credit, {
      as: 'credit',
      foreignKey: 'credit_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CREDIT_DETAIL_TABLE,
      modelName: 'CreditDetail',
      timestamps: false,
    };
  }
}

module.exports = {
  CREDIT_DETAIL_TABLE,
  CreditDetailSchema,
  CreditDetail,
};