'use strict';
module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {
    content: DataTypes.STRING,
    number: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {});
  Page.associate = function(models) {
      foreignKey: 'book_id'
  };
  return Page;
};