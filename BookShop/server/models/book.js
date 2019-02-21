'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    cost: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
      Book.hasMany(models.Page, {
          foreignKey: 'book_id',
          as: 'pages'
      });
      Book.belongsToMany(models.Author, {
          through: 'BookAuthor',
          as: 'authors',
          foreignKey: 'book_id'
      });
  };
  return Book;
};