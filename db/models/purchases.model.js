const { Model, DataTypes, Sequelize } = require('sequelize');

const { SUPPLIER_TABLE } = require('./suppliers.model');
const { USER_TABLE } = require('./user.model');

const PURCHASES_TABLE = 'purchases';

const PurchaseSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  supplierId: {
    allowNull: false,
    field: 'supplier_id',
    type: DataTypes.INTEGER,
    references: {
      model: SUPPLIER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },

  userId: {
    allowNull: false,
    field: 'user_id',
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },

  paymentMethod: {
    allowNull: false,
    field: 'payment_method',
    type: DataTypes.STRING
  },

  invoiceNumber: {
    allowNull: false,
    unique: true,
    field: 'invoice_number',
    type: DataTypes.STRING(50)
  },

  notes: {
    allowNull: true,
    type: DataTypes.TEXT
  },

  total: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.DECIMAL(12,2)
  },

  status: {
    allowNull: false,
    defaultValue: 'Completada',
    type: DataTypes.STRING(30)
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

class Purchase extends Model {

  static associate(models) {

    this.belongsTo(models.Supplier, {
      as: 'supplier',
      foreignKey: 'supplierId'
    });

    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });

    this.hasMany(models.PurchaseDetail, {
      as: 'purchaseDetails',
      foreignKey: 'purchaseId'
    });

  }

  static config(sequelize) {

    return {
      sequelize,
      tableName: PURCHASES_TABLE,
      modelName: 'Purchase',
      timestamps: false
    };

  }

}

module.exports = {
  PURCHASES_TABLE,
  PurchaseSchema,
  Purchase
};