const Joi= require('joi');

const id=Joi.number();
const name=Joi.string();
const description=Joi.string();
const price=Joi.number();
const stock=Joi.number();
const imageUrl=Joi.string();
const categoryId=Joi.number()
const isActive =Joi.boolean();


createProductSchema=Joi.object({
    name:name.required(),
    description:description.required(),
    price:price.required(),
    stock:stock.required(),
    imageUrl:imageUrl,
    categoryId:categoryId.required(),
    isActive:isActive.required()
})

updateProductSchema=Joi.object({
    name:name,
    description:description,
    price:price,
    stock:stock,
    imageUrl:imageUrl,
    categoryId:categoryId,
    isActive:isActive,
})

getProductSchema=Joi.object({
    id:id.required(),
})


module.exports={
    createProductSchema,
    updateProductSchema,
    getProductSchema
}