const { Model, DataTypes, Sequelize } = require('sequelize');

const SUPPLIER_TABLE = 'suppliers';

const  SupplierSchema= {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING(120)
  },

  company: {
    allowNull: false,
    type: DataTypes.STRING(150)
  },

  nit: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(30)
  },

  email: {
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    type: DataTypes.STRING(150)
  },

  phone: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },

  address: {
    allowNull: false,
    type: DataTypes.STRING(255)
  },

  contactPerson: {
    allowNull: true,
    field:'contact_person',
    type: DataTypes.STRING(120)
  },

  observations: {
    allowNull: true,
    type: DataTypes.TEXT
  },

  isActive: {
    allowNull: false,
    defaultValue: true,
    field:'is_active',
    type: DataTypes.BOOLEAN
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



class Supplier extends Model {

  static associate(models) {

    this.hasMany(models.Purchase, {
      as: 'purchases',
      foreignKey: 'supplierId'
    });

  }

  static config(sequelize) {

    return {
      sequelize,
      tableName: SUPPLIER_TABLE,
      modelName: 'Supplier',
      timestamps: false
    };

  }

}

module.exports = {
 SUPPLIER_TABLE,
 SupplierSchema,
 Supplier
};