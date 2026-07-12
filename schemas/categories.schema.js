const Joi= require('joi');


const id = Joi.number();
const name = Joi.string();
const description= Joi.string();


createCategoriesSchema =Joi.object({
    name:name.required(),
    description:description.required()
})

updateCategoriesSchema=Joi.object({
    name:name,
    description:description,
})

getCategoriasSchema =Joi.object({
    id:id.required()
})

module.exports={
    createCategoriesSchema,
    updateCategoriesSchema,
    getCategoriasSchema
}

