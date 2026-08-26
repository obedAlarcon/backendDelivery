const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class SupplierService {

  async create(data) {

    const newSupplier = await models.Supplier.create({
      ...data,
      isActive: data.isActive ?? true
    });

    return newSupplier;

  }

  async find() {

    const response = await models.Supplier.findAll({
      include: ['purchases']
    });

    return response;

  }

  async findOne(id) {

    const supplier = await models.Supplier.findByPk(id, {
      include: ['purchases']
    });

    if (!supplier) {
      throw boom.notFound('Supplier not found');
    }

    return supplier;

  }

  async update(id, changes) {

    const supplier = await this.findOne(id);

    const response = await supplier.update(changes);

    return response;

  }

  async delete(id) {

    const supplier = await this.findOne(id);

    await supplier.destroy();

    return { id };

  }

}

module.exports = SupplierService;