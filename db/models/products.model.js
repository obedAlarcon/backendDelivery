const {Model,Sequelize,DataTypes}=require('sequelize');



const PRODUCT_TABLE = 'products';
const ProductSchema={
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER,


    },

    name:{
        allowNull:false,
        type:DataTypes.STRING,

    },
    description:{
        allowNull:false,
        type:DataTypes.STRING,

    },
    price:{
        allowNull:false,
        type:DataTypes.INTEGER,

    },
    stock:{
        allowNull:false,
        type:DataTypes.INTEGER,

    },
    imageUrl:{
        allowNull:false,
        type:DataTypes.STRING,
        field:'image_url',
    },
    categoryId:{
        allowNull:false,
        type:DataTypes.INTEGER,
        field:'category_id',
    },
    isActive:{
        allowNull:false,
        type:DataTypes.BOOLEAN,
        field:'is_active'
    },
    createdAt:{
        allowNull:false,
        type:DataTypes.DATE,
        field:'created_at',
        defaultValue: Sequelize.NOW
    }

}

class Product extends Model{
    static associate(models){
 this.belongsTo(models.Categories,{
    as:'category',
    foreignKey:'category_id',
 });
  
 this.hasMany(models.Order_details,{
    as:'order_details',
      foreignKey:'product_id'
 })

    }

    static config(sequelize){
        return{
            sequelize,
            tableName:PRODUCT_TABLE,
            modelName:'Product',
            timestamps:false
        }
    }
}
module.exports={
    PRODUCT_TABLE,
    ProductSchema,
    Product 
}