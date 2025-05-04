import Category from "./categoryModel.js";
import Products from "./productModel.js";

// hasMany association
Category.hasMany(Products, {
    foreignKey: 'category_id',
    sourceKey: 'id_category',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})

// belongsTo association
Products.belongsTo(Category,{
    foreignKey: 'category_id',
    targetKey: 'id_category',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})

export default { Category, Products };

