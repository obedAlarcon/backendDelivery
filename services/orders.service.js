const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

const models = sequelize.models;
console.log(models);
console.log(Object.keys(models));
class OrdersService {

  //==========================================
  // Crear pedido
  //==========================================

  async create(data) {

    const transaction = await sequelize.transaction();

    try {

      //==========================================
      // Buscar cliente
      //==========================================

      const customer = await models.Customer.findByPk(
        data.customerId,
        { transaction }
      );

      if (!customer) {

        throw boom.notFound('Cliente no encontrado');

      }

      //==========================================
      // Calcular total
      //==========================================

      const calculatedTotal = data.items.reduce((sum, item) => {

        return sum + (item.quantity * item.price);

      }, 0);

      //==========================================
      // Crear pedido
      //==========================================

      const newOrder = await models.Orders.create({

        customerId: customer.id,

        userId: 1, // luego lo reemplazaremos por req.user.id

        deliveryAddress: data.deliveryAddress,

        deliveryReference: data.deliveryReference,

        total: calculatedTotal,

        paymentMethod: data.paymentMethod,

         status: data.status,

  paymentStatus: data.paymentStatus

      }, { transaction });

      //==========================================
      // Crear detalle del pedido
      //==========================================

      const details = data.items.map(item => ({

        order_id: newOrder.id,

        product_id: item.productId,

        quantity: item.quantity,

        price: item.price,

        subtotal: item.quantity * item.price

      }));

      await models.Order_details.bulkCreate(details, { transaction });

      //==========================================
      // Descontar inventario
      //==========================================

      for (const item of data.items) {

  const product = await models.Product.findByPk(
    item.productId,
    { transaction }
  );

        if (!product) {

          throw boom.notFound(`Producto ${item.productId} no encontrado`);

        }

        if (product.stock < item.quantity) {

          throw boom.badRequest(
            `Stock insuficiente para ${product.name}`
          );

        }

        await product.update({

          stock: product.stock - item.quantity

        }, { transaction });

      }

      await transaction.commit();

      return await this.findOne(newOrder.id);

    } catch (error) {

      await transaction.rollback();

      throw error;

    }

  }

  //==========================================
  // Obtener todos
  //==========================================

  async find() {

    return await models.Orders.findAll({

      include: [

        {
          association: 'customer'
        },

        {
          association: 'user'
        },

        {
          association: 'order_details',
          include: [
            {
              association: 'product'
            }
          ]
        }

      ],

      order: [['createdAt', 'DESC']]

    });

  }

  //==========================================
  // Obtener uno
  //==========================================
async findOne(id) {

  console.log('Buscando pedido:', id);

  const order = await models.Orders.findByPk(id, {
    include: [
      { association: 'customer' },
      { association: 'user' },
      {
        association: 'order_details',
        include: [
          { association: 'product' }
        ]
      }
    ]
  });

  console.log('Pedido encontrado:', order);

  if (!order) {
    throw boom.notFound('Pedido no encontrado');
  }

  return order;

}
  //==========================================
  // Eliminar
  //==========================================

  async delete(id) {

    const order = await this.findOne(id);

    await order.destroy();

    return {
      message: 'Pedido eliminado'
    };

  }

}

module.exports = OrdersService;