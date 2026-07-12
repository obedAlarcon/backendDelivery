const boom = require('@hapi/boom');
const {models}=require('./../libs/sequelize');



class PaymentService{

    async find(){
        const payment= await models.Payment.findAll();
        return payment;
    }


    async findOne(id){
        const payment= await models.Payment.findByPk(id);
        if(!payment){
            throw boom.notFound('payments not found')
        }
        return payment;
    }

   async create(data){
    const newPayment=await models.Payment.create(data);
    return newPayment
   }

   async update(id,changes){
      const payment = await this.findOne(id);
      const response = await payment.update(changes);
      return response;
   }

  async delete(id){
    const payment= await this.findOne(id);
    await payment.destroy();
    return {id}
  }
}

module.exports=PaymentService;