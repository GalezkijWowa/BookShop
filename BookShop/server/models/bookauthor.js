'use strict';
module.exports = (sequelize, DataTypes) => {
  const BookAuthor = sequelize.define('BookAuthor', {
    author_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {});
  BookAuthor.associate = function(models) {
    // associations can be defined here
  };
  return BookAuthor;
};