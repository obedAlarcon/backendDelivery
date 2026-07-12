const {config}=require('./../config/config');


 const USER =encodeURIComponent(config.dbUser);
const PASSWORD=encodeURIComponent(config.dbPassword);
const URI =`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

module.exports={
    development:{
        url:URI,
        dialect:'postgres'
    },

    production:{
        url:URI,
        dialect:'postgres'
    }

}

// se intalla sequelize-cli --save-dev, con esto empezamos manipular las migraciones 