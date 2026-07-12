const Joi = require('joi');

const id =Joi.number().integer();
const name =Joi.string();
const email=Joi.string().email();
const phone=Joi.string();
const password=Joi.string().min(6);
const role=Joi.string();



const createUserSchema=Joi.object({
name:name.required(),
email:email.required(),
phone:phone.required(),
password:password.required(),
role:role.required(),

})

const updateUserSchema=Joi.object({
    name:name,
    email:email,
    phone:phone,
    role:role

})

const getUserSchema=Joi.object({
    id:id.required()
})

module.exports ={
    createUserSchema,
    updateUserSchema,
    getUserSchema
}