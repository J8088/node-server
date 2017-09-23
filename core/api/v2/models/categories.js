'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    categoryId: DataTypes.INTEGER,
    categoryParentId: DataTypes.INTEGER,
    categoryType: DataTypes.TEXT,
    categoryCode: DataTypes.TEXT,
    categoryName: DataTypes.TEXT,
    categoryDesc: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER,
    createdDate: DataTypes.DATE,
    modifiedDate: DataTypes.DATE
  });

  Categories.associate = (models) => {
    Categories.belongsTo(models.ProductsToCategories, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };

  return Categories;
};