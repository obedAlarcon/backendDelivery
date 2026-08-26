const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./products.model');
const { Payment, PaymentSchema } = require('./payments.model');
const { Orders, OrdersSchema } = require('./orders.model');
const { Order_details, Order_detailsSchema } = require('./order_details.model');
const { Categories, CategoriesSchema } = require('./categories.model');
const { Customer, CustomerSchema } = require('./customer.model');
const {PurchaseDetail,  PurchaseDetailSchema}=require('./purchase_detail.model');

const { Purchase, PurchaseSchema } = require('./purchases.model');

const { Supplier, SupplierSchema } = require('./suppliers.model');
const {Tax, TaxSchema}=require('./taxes.model');
const{PurchaseDetailTax,PurchaseDetailTaxSchema}=require('./purchase-detail-tax.model');


function setupModels(sequelize){


    User.init(UserSchema,User.config(sequelize));


    Customer.init(CustomerSchema,Customer.config(sequelize) );


    Product.init(ProductSchema, Product.config(sequelize));


    Payment.init( PaymentSchema, Payment.config(sequelize));


    Orders.init( OrdersSchema, Orders.config(sequelize));


    Order_details.init( Order_detailsSchema,Order_details.config(sequelize));


    Categories.init(CategoriesSchema,Categories.config(sequelize));
    
     
    // =========================
    // MODULO COMPRAS
    // =========================
PurchaseDetail.init( PurchaseDetailSchema,PurchaseDetail.config(sequelize));

Purchase.init(PurchaseSchema, Purchase.config(sequelize));
Supplier.init(SupplierSchema,Supplier.config(sequelize));

Tax.init(TaxSchema,Tax.config(sequelize));
PurchaseDetailTax.init(PurchaseDetailTaxSchema,PurchaseDetailTax.config(sequelize));

    // =========================
    // ASSOCIATIONS
    // =========================

    User.associate(sequelize.models);

    Customer.associate(sequelize.models);

    Product.associate(sequelize.models);

    Payment.associate(sequelize.models);

    Order_details.associate(sequelize.models);

    Orders.associate(sequelize.models);

    Categories.associate(sequelize.models);
     PurchaseDetail.associate(sequelize.models);
     Purchase.associate(sequelize.models);
     Supplier.associate(sequelize.models);
     Tax.associate(sequelize.models);
     PurchaseDetailTax.associate(sequelize.models);
    // Compras


    

}


module.exports = setupModels;