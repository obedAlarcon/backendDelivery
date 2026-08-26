const { Model, Sequelize, DataTypes } = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  // Precio de compra
  purchasePrice: {
    allowNull: false,
    type: DataTypes.DECIMAL(12, 2),
    field: 'purchase_price',
    defaultValue: 0
  },

  // Precio de venta
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(12, 2),
  },

  stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  // Stock mínimo
  minStock: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'min_stock',
    defaultValue: 5
  },

  imageUrl: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'image_url',
  },

  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'category_id',
  },

  isActive: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },

  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  }

};

class Product extends Model {

  static associate(models) {

    this.belongsTo(models.Categories, {
      as: 'category',
      foreignKey: 'category_id',
    });

    this.hasMany(models.Order_details, {
      as: 'order_details',
      foreignKey: 'product_id'
    });

    // Relación con detalle de compras
    this.hasMany(models.PurchaseDetail, {
      as: 'purchase_details',
      foreignKey: 'product_id'
    });

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    };
  }

}

module.exports = {
  PRODUCT_TABLE,
  ProductSchema,
  Product
};