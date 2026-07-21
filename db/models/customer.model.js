
const { Model, DataTypes, Sequelize } = require('sequelize');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING
  },

  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },

  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },

  address: {
    allowNull: false,
    type: DataTypes.STRING
  },

  reference: {
    allowNull: true,
    type: DataTypes.STRING
  },

  isActive: {
    allowNull: false,
    field: 'is_active',
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }

};

class Customer extends Model {

  static associate(models) {

    this.hasMany(models.Orders, {
      as: 'orders',
      foreignKey: 'customer_id'
    });

  }

  static config(sequelize) {

    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    };

  }

}

module.exports = {
  CUSTOMER_TABLE,
  CustomerSchema,
  Customer
};