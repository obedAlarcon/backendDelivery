const {Model,Sequelize, DataTypes}=require('sequelize');

const PAYMENT_TABLE = 'payment';

const PaymentSchema={
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
    transactionId:{
        allowNull:false,
        type:DataTypes.INTEGER,
        field:'transaction_id',
    },
    provider:{
        allowNull:false,
        type:DataTypes.STRING,

    },
    amount:{
        allowNull:false,
        type:DataTypes.DECIMAL,

    },
    status:{
        allowNull:false,
        type:DataTypes.STRING,
    },

    createdAt:{
        allowNull:false,
        type:DataTypes.DATE,
        field:'created_at',
        defaultValue: Sequelize.NOW
    }
}



class Payment extends Model{
    static associate(models){
  this.belongsTo(models.Orders,{
    as:'order',
    foreignKey:'order_id',
  })
    }

    static config(sequelize){
        return{
            sequelize,
            tableName:PAYMENT_TABLE,
            modelName:'Payment',
            timestamps:false,
        }
    }
}

module.exports={
    PAYMENT_TABLE,
    PaymentSchema,
    Payment
}