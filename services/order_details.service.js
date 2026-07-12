const { models } = require('../libs/sequelize');

class Order_detailsService{

  async find(){
    const order_details = await models.Order_details.findAll();
    return order_details;
  }

  async findOne(id){
    const order_details = await models.Order_details.findByPk(id,{
      include:['order']
    });
    return order_details;
  }

  async create(data){
    const newOrder_details = await models.Order_details.create(data);
    return newOrder_details;
  }

  async update(id, changes){
    const order_details = await this.findOne(id);
    const response = await order_details.update(changes);
    return response;
  }

  async delete(id){
    const order_details = await this.findOne(id);
    await order_details.destroy();
    return { id };
  }
}

module.exports = Order_detailsService;