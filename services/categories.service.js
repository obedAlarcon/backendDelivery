const boom = require('@hapi/boom');

const {models}=require('./../libs/sequelize');



class CategoriesService{
     async find(){
        const categories = await models.Categories.findAll()
        
        return categories;
     }

     async findOne(id){
        const categories = await models.Categories.findByPk(id,{
            include:['products']
        });
        if(!categories){
            throw boom.notFound('Category not found');
        }
        return categories;
     }

     async create(data){
        const newCategories = await models.Categories.create(data);
        return newCategories;
     }

     async update(id,changes){
        const categories= await this.findOne(id);
        const response= await categories.update(changes);
        return response;
     }

     async delete(id){
        const categories = await this.findOne(id);
        await categories.destroy();
        return {id};
     }

}

module.exports= CategoriesService;