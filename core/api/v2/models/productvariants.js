'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductVariants = sequelize.define('ProductVariants', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productPrice: DataTypes.DECIMAL,
    productPriceDisc: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER,
    createdDate: DataTypes.DATE,
    modifiedDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProductVariants;
};