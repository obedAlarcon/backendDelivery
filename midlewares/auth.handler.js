const boom = require('@hapi/boom');
const {config} = require('./../config/config');

function checkApikey(req,res,next){
    const apikey = req.headers['api'];
    const expected = config.apiKey || config.dbPassword;
    if (!config.apiKey) {
        // eslint-disable-next-line no-console
        console.warn('Warning: API_KEY not set. Using DB password as API key fallback.');
    }
    if(apikey === expected){
        next();
    }else{
        next(boom.unauthorized());
    }
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
