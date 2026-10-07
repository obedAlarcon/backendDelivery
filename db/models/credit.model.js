const { Model, DataTypes, Sequelize } = require('sequelize');

const CREDIT_TABLE = 'credits';

const CreditSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  orderId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'order_id',
  },

  precioContado: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
    field: 'precio_contado',
  },

  porcentajeIncremento: {
    allowNull: false,
    type: DataTypes.DECIMAL(5, 2),
    field: 'porcentaje_incremento',
  },

  totalCredito: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
    field: 'total_credito',
  },

  numeroCuotas: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'numero_cuotas',
  },

  valorCuota: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
    field: 'valor_cuota',
  },

  totalPagado: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
    field: 'total_pagado',
    defaultValue: 0,
  },

  
  fechaProximoPago: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_proximo_pago',
  },


  estado: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'Pendiente',
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }

};

class Credit extends Model {

  static associate(models) {

    this.belongsTo(models.Orders, {
      as: 'order',
      foreignKey: 'order_id',
    });

  }

  static config(sequelize) {

    return {
      sequelize,
      tableName: CREDIT_TABLE,
      modelName: 'Credit',
      timestamps: false,
    };

  }

}

module.exports = {
  CREDIT_TABLE,
  CreditSchema,
  Credit
};