const {Model, Sequelize, DataTypes} = require('sequelize');

const ORDER_DETAILS_TABLE ='order_details';

const Order_detailsSchema={
  id:{
    allowNull:false,
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER,
  },

  orderId:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'order_id',
  },

  productId:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'product_id'
  },

  quantity:{
    allowNull:false,
    type:DataTypes.INTEGER,
  },

  price:{
    allowNull:false,
    type:DataTypes.INTEGER,
  },

  subtotal:{
    allowNull:false,
    type:DataTypes.INTEGER,
  },

  createdAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Order_details extends Model{

  static associate(models){

    this.belongsTo(models.Product,{
      as:'product',
      foreignKey:'product_id'
    });

    this.belongsTo(models.Orders,{
      as:'order',
      foreignKey:'order_id'
    });

  }

  static config(sequelize){
    return{
      sequelize,
      tableName:ORDER_DETAILS_TABLE,
      modelName: 'Order_details',
      timestamps:false
    }
  }
}

module.exports={
  ORDER_DETAILS_TABLE,
  Order_detailsSchema,
  Order_details
}