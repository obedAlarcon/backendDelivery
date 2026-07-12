const {Strategy, ExtractJwt }=require('passport-jwt');

const{config}=require('./../../../config/config');

const options ={

    // de aqui sacamos el token 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    //traemos el secret 
    secretOrKey: config.jwtSecret
}
// creamos la extrategia 
//traemo slas opciones que es donde nos trae la cabezaa del token 

// traemos el payload que es el cuerpo de token
 
const jwtStrategy = new Strategy(options,(payload, done)=>{
return done(null, payload);
});

module.exports=jwtStrategy;

