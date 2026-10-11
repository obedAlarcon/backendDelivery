
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

const frontendPath = path.join(
  __dirname,
  'delivery-app',
  'dist',
  'delivery-app',
  'browser'
);

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(frontendPath));

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

require('./utils/auth');
app.use(passport.initialize());

app.get('/test', (req, res) => {
  res.json({ message: 'API funcionando' });
});

app.get('/nueva-ruta', checkApikey, (req, res) => {
  res.send('esta es la nueva ruta');
});

routerApi(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  if (
    req.path.startsWith('/api/') ||
    req.path === '/api' ||
    req.path.startsWith('/uploads/') ||
    req.path === '/uploads' ||
    req.path.startsWith('/api-docs') ||
    req.path === '/test' ||
    req.path === '/nueva-ruta'
  ) {
    return next();
  }

  res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
    if (err) {
      next(err);
    }
  });
});

app.use(logErrors);
app.use(errorHandler);

module.exports = app;