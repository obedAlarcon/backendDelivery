const boom = require('@hapi/boom');

const {models}=require('../libs/sequelize');

class OrdersService{

  async find(){
    const orders = await models.Orders.findAll({
         include:[
    'user',
    {
      association:'order_details',
      
    }
  ]
    });
    return orders;
  }
  
   async create(data){
     const newOrders= await models.Orders.create(data);
     return newOrders;
   }

    async findOne(id){
        const orders=await models.Orders.findByPk(id)

        if(!orders){
          throw boom.notFound('orders, not found')
        }
                 return orders;
    }
    
     async update(id, changes){
        const orders = await this.findOne(id);
        const response= await orders.update(changes);
        return response;
     }

    async delete(id){
        const orders= await this.findOne(id);
        await orders.destroy();
        return {id};
    }

}


module.exports= OrdersService;