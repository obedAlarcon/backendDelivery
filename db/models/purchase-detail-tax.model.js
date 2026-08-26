const { Model, DataTypes, Sequelize } = require('sequelize');

const { PURCHASE_DETAIL_TABLE } = require('./purchase_detail.model');
const { TAX_TABLE } = require('./taxes.model');

const PURCHASE_DETAIL_TAX_TABLE = 'purchase_detail_taxes';

const PurchaseDetailTaxSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  purchaseDetailId: {
    allowNull: false,
    field: 'purchase_detail_id',
    type: DataTypes.INTEGER,
    references: {
      model: PURCHASE_DETAIL_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },

  taxId: {
    allowNull: false,
    field: 'tax_id',
    type: DataTypes.INTEGER,
    references: {
      model: TAX_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },

  percentage: {
    allowNull: false,
    type: DataTypes.DECIMAL(5,2)
  },

  amount: {
    allowNull: false,
    type: DataTypes.DECIMAL(12,2)
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

class PurchaseDetailTax extends Model {

  static associate(models) {

    this.belongsTo(models.PurchaseDetail, {
      as: 'purchaseDetail',
      foreignKey: 'purchaseDetailId'
    });

    this.belongsTo(models.Tax, {
      as: 'tax',
      foreignKey: 'taxId'
    });

  }

  static config(sequelize) {

    return {
      sequelize,
      tableName: PURCHASE_DETAIL_TAX_TABLE,
      modelName: 'PurchaseDetailTax',
      timestamps: false
    };

  }

}

module.exports = {
  PURCHASE_DETAIL_TAX_TABLE,
  PurchaseDetailTaxSchema,
  PurchaseDetailTax
};