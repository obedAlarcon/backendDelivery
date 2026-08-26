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
      // VALIDAR DATOS DEL CLIENTE
      //==========================================

      if (!data.customer) {

        throw boom.badRequest(
          'Los datos del cliente son obligatorios'
        );

      }

      const {
        name,
        email,
        phone,
        address,
        reference
      } = data.customer;


      if (!name || !email || !phone || !address) {

        throw boom.badRequest(
          'Nombre, correo, teléfono y dirección son obligatorios'
        );

      }


      //==========================================
      // BUSCAR CLIENTE POR EMAIL
      //==========================================

      let customer = await models.Customer.findOne({

        where: {
          email: email.trim().toLowerCase()
        },

        transaction

      });


      //==========================================
      // CREAR CLIENTE SI NO EXISTE
      //==========================================

      if (!customer) {

        customer = await models.Customer.create({

          name: name.trim(),

          email: email.trim().toLowerCase(),

          phone: phone.trim(),

          address: address.trim(),

          reference: reference
            ? reference.trim()
            : null

        }, {

          transaction

        });

        console.log(
          'CLIENTE CREADO:',
          customer.id
        );

      } else {

        console.log(
          'CLIENTE EXISTENTE:',
          customer.id
        );

        //==========================================
        // ACTUALIZAR DATOS DEL CLIENTE
        //==========================================

        await customer.update({

          name: name.trim(),

          phone: phone.trim(),

          address: address.trim(),

          reference: reference
            ? reference.trim()
            : null

        }, {

          transaction

        });

      }


      //==========================================
      // VALIDAR PRODUCTOS
      //==========================================

      if (
        !data.items ||
        !Array.isArray(data.items) ||
        data.items.length === 0
      ) {

        throw boom.badRequest(
          'El pedido no contiene productos'
        );

      }


      //==========================================
      // CALCULAR TOTAL
      //==========================================

      const calculatedTotal = data.items.reduce(
        (sum, item) => {

          return sum +
            (Number(item.quantity) * Number(item.price));

        },
        0
      );


      //==========================================
      // CREAR PEDIDO
      //==========================================

      const newOrder = await models.Orders.create({

        customerId: customer.id,

        // Por ahora queda el usuario administrativo 1
        userId: 1,

        deliveryAddress:
          data.deliveryAddress || address,

        deliveryReference:
          data.deliveryReference || reference,

        total: calculatedTotal,

        paymentMethod:
          data.paymentMethod,

        status:
          data.status || 'Pendiente',

        paymentStatus:
          data.paymentStatus || 'Pendiente'

      }, {

        transaction

      });


      console.log(
        'PEDIDO CREADO:',
        newOrder.id
      );


      //==========================================
      // CREAR DETALLES DEL PEDIDO
      //==========================================

      const details = data.items.map(item => ({

        order_id: newOrder.id,

        product_id: item.productId,

        quantity: Number(item.quantity),

        price: Number(item.price),

        subtotal:
          Number(item.quantity) *
          Number(item.price)

      }));


      await models.Order_details.bulkCreate(
        details,
        {
          transaction
        }
      );


      console.log(
        'DETALLES CREADOS:',
        details
      );


      //==========================================
      // DESCONTAR INVENTARIO
      //==========================================

      for (const item of data.items) {

        const product =
          await models.Product.findByPk(
            item.productId,
            {
              transaction
            }
          );


        if (!product) {

          throw boom.notFound(
            `Producto ${item.productId} no encontrado`
          );

        }


        if (
          Number(product.stock) <
          Number(item.quantity)
        ) {

          throw boom.badRequest(
            `Stock insuficiente para ${product.name}`
          );

        }


        await product.update({

          stock:
            Number(product.stock) -
            Number(item.quantity)

        }, {

          transaction

        });

      }


      //==========================================
      // CONFIRMAR TRANSACCIÓN
      //==========================================

      await transaction.commit();


      console.log(
        'TRANSACCION CONFIRMADA:',
        newOrder.id
      );


      //==========================================
      // DEVOLVER PEDIDO COMPLETO
      //==========================================

      return await this.findOne(
        newOrder.id
      );


    } catch (error) {

      await transaction.rollback();

      console.error(
        'ERROR CREANDO PEDIDO:',
        error
      );

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

      order: [
        ['createdAt', 'DESC']
      ]

    });

  }


  //==========================================
  // Obtener uno
  //==========================================

  async findOne(id) {

    const order =
      await models.Orders.findByPk(id, {

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

        ]

      });


    if (!order) {

      throw boom.notFound(
        'Pedido no encontrado'
      );

    }


    return order;

  }
async findByCustomerEmail(email) {

  const orders = await models.Orders.findAll({

    include: [

      {
        association: 'customer',

        where: {
          email: email
        }
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

  return orders;

}

  //==========================================
  // Actualizar
  //==========================================

  async update(id, changes) {

    const order =
      await this.findOne(id);

    const response =
      await order.update(changes);

    return response;

  }


  //==========================================
  // Eliminar
  //==========================================

  async delete(id) {

    const order =
      await this.findOne(id);

    await order.destroy();

    return {

      message:
        'Pedido eliminado'

    };

  }

}


module.exports = OrdersService;