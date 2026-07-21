const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDERS_TABLE = 'orders';

const OrdersSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

    userId: {                              
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
  },


  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'customer_id',
  },

  deliveryAddress: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'delivery_address',
  },

  deliveryReference: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'delivery_reference',
  },

  total: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },

  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'Pendiente'
  },

  paymentMethod: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'payment_method',
  },

  paymentStatus: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'payment_status',
    defaultValue: 'Pendiente'
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }

};

class Orders extends Model {

  static associate(models) {

    //==========================
    // Cliente
    //==========================
  this.belongsTo(models.User, {        
      as: 'user',
      foreignKey: 'user_id'
    });


    this.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'customer_id'
    });

    //==========================
    // Pagos
    //==========================

    this.hasMany(models.Payment, {
      as: 'payments',
      foreignKey: 'order_id'
    });

    //==========================
    // Productos del pedido
    //==========================

    this.hasMany(models.Order_details, {
      as: 'order_details',
      foreignKey: 'order_id'
    });

  }

  static config(sequelize) {

    return {

      sequelize,

      tableName: ORDERS_TABLE,

      modelName: 'Orders',

      timestamps: false

    };

  }

}

module.exports = {
  ORDERS_TABLE,
  OrdersSchema,
  Orders
};