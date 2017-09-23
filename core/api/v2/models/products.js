'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    brandId: DataTypes.INTEGER,
    productName: DataTypes.TEXT,
    productPrice: DataTypes.DECIMAL,
    productDesc: DataTypes.TEXT,
    productImgPath: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER,
    createdDate: DataTypes.DATE,
    modifiedDate: DataTypes.DATE
  });

  Products.associate = (models) => {
    Products.belongsTo(models.ProductsToCategories, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  return Products;
};