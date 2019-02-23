'use strict';
module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {
    content: DataTypes.STRING,
    number: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {});
    Page.associate = function (models) {
        Page.belongsTo(models.Book, {
            foreignKey: 'book_id',
            as: 'book'
        });
    };
  return Page;
};