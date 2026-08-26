const Joi = require('joi');

const id = Joi.number();

const name = Joi.string();

const description = Joi.string();

const purchasePrice = Joi.number();

const price = Joi.number();

const stock = Joi.number();

const minStock = Joi.number();

const imageUrl = Joi.string();

const categoryId = Joi.number();

const isActive = Joi.boolean();

const createProductSchema = Joi.object({

  name: name.required(),

  description: description.required(),

  purchasePrice: purchasePrice.required(),

  price: price.required(),

  stock: stock.required(),

  minStock: minStock.required(),

  imageUrl: imageUrl,

  categoryId: categoryId.required(),

  isActive: isActive.required()

});

const updateProductSchema = Joi.object({

  name: name,

  description: description,

  purchasePrice: purchasePrice,

  price: price,

  stock: stock,

  minStock: minStock,

  imageUrl: imageUrl,

  categoryId: categoryId,

  isActive: isActive

});

const getProductSchema = Joi.object({

  id: id.required()

});

module.exports = {

  createProductSchema,

  updateProductSchema,

  getProductSchema

};