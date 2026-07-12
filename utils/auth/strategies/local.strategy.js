

const {Strategy}=require('passport-local');
const boom = require('@hapi/boom');
const bcrypt=require('bcrypt');

const UserService= require('./../../../services/user.service');
const service = new UserService
const LocalStrategy =new Strategy({
    usernameField:'email',
    passwordField:'password'
},async(email, password, done)=>{

    try {
        const user = await service.findByEmail(email);
        console.log('Email recibido:', email);
console.log('Usuario encontrado:', user);
        if(!user){
            done(boom.unauthorized(), false);
        }
        const isMatch = await bcrypt.compare(password, user.password);

console.log('Contraseña coincide:', isMatch);
        if(!isMatch){
            done(boom.unauthorized(), false);
        }
        delete user.dataValues.password;
         done(null, user); 
    } catch (error) {
        done (error, false);  
    }
})


module.exports=LocalStrategy;