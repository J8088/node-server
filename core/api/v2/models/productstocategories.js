'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductsToCategories = sequelize.define('ProductsToCategories', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER,
    createdDate: DataTypes.DATE,
    modifiedDate: DataTypes.DATE
  });

  ProductsToCategories.associate = (models) => {
    ProductsToCategories.hasMany(models.Products, {
      foreignKey: 'productId',
      as: 'toProducts',
    });
  };

  ProductsToCategories.associate = (models) => {
    ProductsToCategories.hasMany(models.Categories, {
      foreignKey: 'categoryId',
      as: 'toCategories',
    });
  };

  return ProductsToCategories;
};


