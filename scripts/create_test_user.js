const sequelize = require('../libs/sequelize');
const UserService = require('../services/user.service');

async function run(){
  try{
    await sequelize.authenticate();
    console.log('DB connection OK');
    const service = new UserService();
    const user = await service.create({
      name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
      password: 'secret123',
      role: 'customer'
    });
    console.log('Created user:', user.dataValues);
    process.exit(0);
  }catch(err){
    console.error('Could not create test user:', err.message);
    console.error('\nTo run the DB locally:');
    console.error('  1) Install Docker Desktop');
    console.error('  2) From project root run: docker-compose up -d');
    console.error('  3) Copy .env.example to .env and adjust values to match docker-compose (DB_HOST=localhost, DB_PORT=15432, DB_USER=obed, DB_PASSWORD=obed2025@, DB_NAME=pedidos)');
    console.error('  4) Run: npm run migrations:run');
    process.exit(1);
  }
}

run();
