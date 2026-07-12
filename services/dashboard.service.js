const { models } = require('./../libs/sequelize');

class DashboardService {
  async getStats() {
    const [ordersCount, usersCount, productsCount, categoriesCount, paymentsTotal, pendingOrders, completedOrders, recentOrders] =
      await Promise.all([
        models.Orders.count(),
        models.User.count(),
        models.Product.count(),
        models.Categories.count(),
        models.Payment.sum('amount'),
        models.Orders.count({ where: { status: 'pending' } }),
        models.Orders.count({ where: { status: 'completed' } }),
        models.Orders.findAll({
          limit: 6,
          order: [['createdAt', 'DESC']],
          include: [{ association: 'user', attributes: ['name'] }],
        }),
      ]);

    return {
      ordersCount,
      usersCount,
      productsCount,
      categoriesCount,
      totalRevenue: Number(paymentsTotal || 0),
      pendingOrders,
      completedOrders,
      recentOrders,
    };
  }
}

module.exports = DashboardService;
