const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class PurchaseService {

  async create(data) {

    console.log('DATA RECIBIDA:', data);
    console.log('TOTAL RECIBIDO:', data.total);
    console.log('DETALLES:', data.details);

    const {
      details,
      ...purchaseData
    } = data;

    console.log('DETAILS ES ARRAY:', Array.isArray(details));
    console.log('CANTIDAD DETAILS:', details?.length);

    // Temporal mientras conectamos el usuario del token
    purchaseData.userId = 1;

    /*==========================================
      GENERAR NÚMERO DE FACTURA
    ==========================================*/

    const lastPurchase = await models.Purchase.findOne({
      order: [['id', 'DESC']]
    });

    let invoiceNumber = 'FV-001';

    if (lastPurchase) {

      const lastNumber = parseInt(
        lastPurchase.invoiceNumber.replace('FV-', ''),
        10
      );

      invoiceNumber =
        `FV-${String(lastNumber + 1).padStart(3, '0')}`;

    }

    purchaseData.invoiceNumber = invoiceNumber;

    console.log('PURCHASE DATA:', purchaseData);

    // Crear cabecera
    const purchase = await models.Purchase.create(
      purchaseData
    );

    console.log('DESPUÉS DE CREAR:', purchase.toJSON());

    let totalPurchase = 0;

    for (const item of details) {

      console.log('DETALLE:', item);

      // Total general
      totalPurchase += Number(item.total);

      // Crear detalle
      const purchaseDetail =
        await models.PurchaseDetail.create({

          purchaseId: purchase.id,

          productId: item.productId,

          quantity: item.quantity,

          cost: item.cost,

          discount: item.discount ?? 0,

          subtotal: item.subtotal

        });

      // Actualizar inventario
      const product =
        await models.Product.findByPk(item.productId);

      if (product) {

        console.log('STOCK ANTES:', product.stock);

        product.stock =
          Number(product.stock) +
          Number(item.quantity);

        product.purchasePrice =
          Number(item.cost);

        await product.save();

        console.log('STOCK DESPUÉS:', product.stock);

      }

      // Guardar impuestos
      if (item.taxId) {

        await models.PurchaseDetailTax.create({

          purchaseDetailId: purchaseDetail.id,

          taxId: item.taxId,

          percentage: item.taxRate,

          amount: item.taxAmount

        });

      }

    }

    // Guardar total compra
    await purchase.update({

      total: totalPurchase

    });

    return await this.findOne(
      purchase.id
    );

  }

  async find() {

    return await models.Purchase.findAll({

      include: [

        'supplier',

        'user',

        {

          association: 'purchaseDetails',

          include: [

            'product',

            {
              association: 'taxes',
              include: [
                'tax'
              ]
            }

          ]

        }

      ]

    });

  }

  async findOne(id) {

    const purchase =
      await models.Purchase.findByPk(id, {

       include: [

  'supplier',

  {
    association: 'user',
    attributes: [
      'name',
      'role'
    ]
  },

  {

    association: 'purchaseDetails',

    include: [

      'product',

      {
        association:'taxes',
        include:[
          'tax'
        ]
      }

    ]

  }

]
      });

    if (!purchase) {

      throw boom.notFound(
        'Purchase not found'
      );

    }

    return purchase;

  }

  async update(id, changes) {

    const purchase =
      await this.findOne(id);

    await purchase.update(changes);

    return await this.findOne(id);

  }

  async delete(id) {

    const purchase =
      await this.findOne(id);

    await purchase.destroy();

    return {
      id
    };

  }

}

module.exports = PurchaseService;