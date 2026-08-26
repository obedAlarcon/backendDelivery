const Joi = require('joi');

const id =Joi.number().integer();
const name = Joi.string().min(3).max(100);
const email=Joi.string().email();
const phone = Joi.string().pattern(/^[0-9]+$/).min(7).max(15);
const password=Joi.string().min(6);
const role=Joi.string();
const isActive = Joi.boolean();


const createUserSchema=Joi.object({
name:name.required(),
email:email.required(),
phone:phone.required(),
password:password.required(),
role:role.required(),
  isActive: isActive.default(true)

})

const updateUserSchema=Joi.object({
    name:name,
    email:email,
    phone:phone,
    role:role,
      isActive:isActive
})

const getUserSchema=Joi.object({
    id:id.required()
})

module.exports ={
    createUserSchema,
    updateUserSchema,
    getUserSchema
}