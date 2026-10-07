const {Sequelize}=require('sequelize');

const {config}=require('./../config/config');

const setupModels= require('./../db/models/index');

const USER =encodeURIComponent(config.dbUser);
const PASSWORD=encodeURIComponent(config.dbPassword);
const URI =`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
console.log('DB_USER:', config.dbUser ? 'OK' : 'VACIO');
console.log('DB_HOST:', config.dbHost ? 'OK' : 'VACIO');
console.log('DB_NAME:', config.dbName ? 'OK' : 'VACIO');
console.log('DB_PORT:', config.dbPort ? 'OK' : 'VACIO');
console.log('DB_PASSWORD:', config.dbPassword ? 'OK' : 'VACIO');
const sequelize = new Sequelize(URI,{
    dialect:'postgres',
    logging:false,

})
setupModels(sequelize);
module.exports=sequelize;