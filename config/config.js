require('dotenv').config();

const config={
    env: process.env.NODE_ENV || 'dev',
    port:process.env.PORT || 5430,
   
    dbUser:process.env.DB_USER,
    dbHost:process.env.DB_HOST,
    dbName:process.env.DB_NAME,
    dbPort:process.env.DB_PORT,
    dbPassword:process.env.DB_PASSWORD,
    apiKey: process.env.API_KEY,
    jwtSecret:process.env.JWT_SECRET,
}
module.exports={config};