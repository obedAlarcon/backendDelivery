const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class TaxService {

  async create(data) {

    const newTax = await models.Tax.create(data);

    return newTax;

  }

  async find() {

    const taxes = await models.Tax.findAll({

      order: [['id', 'ASC']]

    });

    return taxes;

  }

  async findOne(id) {

    const tax = await models.Tax.findByPk(id);

    if (!tax) {

      throw boom.notFound('Tax not found');

    }

    return tax;

  }

  async update(id, changes) {

    const tax = await this.findOne(id);

    const response = await tax.update(changes);

    return response;

  }

  async delete(id) {

    const tax = await this.findOne(id);

    await tax.destroy();

    return {

      id

    };

  }

}

module.exports = TaxService;