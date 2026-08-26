const boom = require('@hapi/boom');
const {config} = require('./../config/config');

function checkApikey(req, res, next) {
  const apikey = req.headers['api'];

  if (!config.apiKey) {
    return next(boom.internal('API_KEY no configurada'));
  }

  if (apikey === config.apiKey) {
    return next();
  }

  next(boom.unauthorized());
}

function checkRoles(...roles){
  return (req, res, next) => {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
      return next(boom.forbidden('Access denied'));
    }
    next();
  };
}

module.exports={checkApikey, checkRoles};
