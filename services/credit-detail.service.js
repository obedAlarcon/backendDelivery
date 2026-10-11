const { models } = require('../libs/sequelize');

class CreditDetailService {

  async find(id) {
    const credit = await models.Credit.findByPk(id, {
      include: [
        {
          association: 'order',
        },
      ],
    });

    if (!credit) {
      throw new Error('Crédito no encontrado');
    }

    return credit;
  }

}

module.exports = CreditDetailService;