const{User,UserSchema}=require('./user.model');
const {Product,ProductSchema}=require('./products.model');
const {Payment,PaymentSchema}=require('./payments.model');
const {Orders,OrdersSchema}=require('./orders.model');
const {Order_details,Order_detailsSchema}=require('./order_details.model');
const {Categories,CategoriesSchema}=require('./categories.model');
const {Customer,CustomerSchema}= require('./customer.model')

function setupModels(sequelize){
    User.init(UserSchema,User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Product.init(ProductSchema,Product.config(sequelize));
    Payment.init(PaymentSchema,Payment.config(sequelize));
    Orders.init(OrdersSchema,Orders.config(sequelize));
    Order_details.init(Order_detailsSchema,Order_details.config(sequelize));
    Categories.init(CategoriesSchema,Categories.config(sequelize));



 User.associate(sequelize.models);
 Customer.associate(sequelize.models);
 Product.associate(sequelize.models);
 Payment.associate(sequelize.models);
 Order_details.associate(sequelize.models);
 Orders.associate(sequelize.models);
 Categories.associate(sequelize.models);

}

module.exports=setupModels;


