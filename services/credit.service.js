const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CreditService {

  async find() {
    const credits = await models.Credit.findAll();
    return credits;
  }

  async findOne(id) {
    const credit = await models.Credit.findByPk(id);

    if (!credit) {
      throw boom.notFound('credit not found');
    }

    return credit;
  }

  async create(data) {
    const newCredit = await models.Credit.create(data);
    return newCredit;
  }

  async update(id, changes) {
    const credit = await this.findOne(id);

    const response = await credit.update(changes);

    return response;
  }

  async delete(id) {
    const credit = await this.findOne(id);

    await credit.destroy();

    return { id };
  }
}

module.exports = CreditService;