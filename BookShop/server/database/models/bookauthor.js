"use strict";
module.exports = (sequelize, DataTypes) => {
  const BookAuthor = sequelize.define("BookAuthor", {
      author_id: {
          allowNull: false,
          type: DataTypes.INTEGER
      },
      book_id: {
          allowNull: false,
          type: DataTypes.INTEGER
      } 
  }, {});
  BookAuthor.associate = function(models) {
    // associations can be defined here
  };
  return BookAuthor;
};