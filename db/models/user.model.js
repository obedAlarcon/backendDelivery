
const {Model,DataTypes,Sequelize}=require('sequelize');

const USER_TABLE= 'users';
const UserSchema={
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
         type:DataTypes.INTEGER
    },
    name:{
        allowNull:false,
        type:DataTypes.STRING
    },
    email:{
        allowNull:false,
        unique:true,
        type:DataTypes.STRING
    },
    phone:{
        allowNull:false,
        type:DataTypes.STRING
    },
    password:{
        allowNull:false,
        type:DataTypes.STRING
    },
    role:{
        allowNull:false,
        type:DataTypes.STRING,
        defaultValue:'customer'
    },
    isActive: {
  field: 'is_active',
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: true,
},

    createdAt:{
        allowNull:false,
        type:DataTypes.DATE,
        field:'created_at',
        defaultValue:Sequelize.NOW
    }


}
class User extends Model{
    static associate(models){
      this.hasMany(models.Orders,{
        as:'orders',
        foreignKey:'user_id'
      })
    }

    static config(sequelize){
        return{
            sequelize,
            tableName:USER_TABLE,
            modelName:'User',
            timestamps:false
        }
    }
}

module.exports ={
    USER_TABLE, UserSchema, User
}