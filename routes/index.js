const express = require('express');

const categoriesRouter=require('./categories.router');
const dashboardRouter=require('./dashboard.router');
const order_detailsRouter=require('./order_details.router');
const ordersRouter =require('./orders.router');
const paymentsRouter=require('./payments.router');
const productsRouter= require('./products.router');
const userRouter=require('./user.router');
const authRouter=require('./auth.router');



function routerApi(app){
    const router = express.Router();
     app.use('/api/v1/', router);
    router.use('/categories',categoriesRouter);
    router.use('/dashboard',dashboardRouter);
    router.use('/order_details',order_detailsRouter);
    router.use('/orders',ordersRouter);
    router.use('/payments',paymentsRouter);
    router.use('/products', productsRouter);
    router.use('/user',userRouter);
    router.use('/auth',authRouter);

}
module.exports=routerApi;