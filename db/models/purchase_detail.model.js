const { Model, DataTypes, Sequelize } = require('sequelize');

const { PRODUCT_TABLE } = require('./products.model');
const { PURCHASES_TABLE } = require('./purchases.model');

const PURCHASE_DETAIL_TABLE = 'purchase_details';

const PurchaseDetailSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  purchaseId: {
    allowNull: false,
    field: 'purchase_id',
    type: DataTypes.INTEGER,
    references: {
      model: PURCHASES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },

  productId: {
    allowNull: false,
    field: 'product_id',
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },

  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },

  cost: {
    allowNull: false,
    type: DataTypes.DECIMAL(12,2)
  },

  discount: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.DECIMAL(5,2)
  },

  subtotal: {
    allowNull: false,
    type: DataTypes.DECIMAL(12,2)
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  },

  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'updated_at'
  }

};

class PurchaseDetail extends Model {

  static associate(models) {

    this.belongsTo(models.Purchase, {
      as: 'purchase',
      foreignKey: 'purchaseId'
    });

    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId'
    });

    this.hasMany(models.PurchaseDetailTax, {
      as: 'taxes',
      foreignKey: 'purchaseDetailId'
    });

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PURCHASE_DETAIL_TABLE,
      modelName: 'PurchaseDetail',
      timestamps: false
    };
  }

}

module.exports = {
  PURCHASE_DETAIL_TABLE,
  PurchaseDetailSchema,
  PurchaseDetail
};