const { Model, DataTypes, Sequelize } = require('sequelize');

const TAX_TABLE = 'taxes';

const TaxSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(100)
  },

  code: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(20)
  },

  percentage: {
    allowNull: false,
    type: DataTypes.DECIMAL(5,2)
  },

  description: {
    allowNull: true,
    type: DataTypes.TEXT
  },

  isActive: {
    allowNull: false,
    defaultValue: true,
    field: 'is_active',
    type: DataTypes.BOOLEAN
  },

  createdAt: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
    type: DataTypes.DATE
  },

  updatedAt: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'updated_at',
    type: DataTypes.DATE
  }

};

class Tax extends Model {

  static associate(models) {

    this.hasMany(models.PurchaseDetailTax, {
      as: 'purchaseDetailTaxes',
      foreignKey: 'taxId'
    });

  }

  static config(sequelize) {

    return {
      sequelize,
      tableName: TAX_TABLE,
      modelName: 'Tax',
      timestamps: false
    };

  }

}

module.exports = {
  TAX_TABLE,
  TaxSchema,
  Tax
};