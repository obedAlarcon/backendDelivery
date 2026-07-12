const express = require('express');
const passport = require('passport');
const path = require('path');
const { checkApikey } = require('./midlewares/auth.handler');
const routerApi = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const cors = require('cors');
const { logErrors, errorHandler } = require('./midlewares/error.handler');

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

require('./utils/auth');
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('hola este es el servidor de app de pedidos');
});

app.get('/test', (req, res) => {
  res.json({ message: 'API funcionando' });
});

app.get('/nueva-ruta', checkApikey, (req, res) => {
  res.send('esta es la nueva ruta');
});

routerApi(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(logErrors);
app.use(errorHandler);

module.exports = app;
