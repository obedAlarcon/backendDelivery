const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
class ProductService {
  async find() {
    const products = await models.Product.findAll({
      include:['category']
    });
    
    return products;
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;
  }


async lowStock() {

  return await models.Product.findAll({

    attributes: ['id', 'name', 'stock'],

    order: [['stock', 'ASC']],

    limit: 5

  });

}







  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}
module.exports = ProductService;