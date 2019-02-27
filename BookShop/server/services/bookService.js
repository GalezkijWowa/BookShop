const Author = require("../database/models").Author;
const Book = require("../database/models").Book;
const Page = require("../database/models").Page;
const BookAuthor = require("../database/models").BookAuthor;

function findAll() {
    return Book
        .findAll({
            include: [{
                model: Page,
                as: "pages"
            },
            {
                model: Author,
                as: "authors"
            }
            ],
        })
}

function findById(id) {
    return Book
        .findById(id, {
            include: [{
                model: Page,
                as: "pages"
            },
            {
                model: Author,
                as: "authors"
            }
            ],
        })
}

function create(title, cost) {
    return Book
        .create({ title, cost });
}

function update(book, title, cost) {
    return book
        .update({ title, cost });
}

function destroy(book) {
    return book
        .destroy();
}

function bookAuthorFind(book_id, author_id) {
    return BookAuthor.find({
        where: {
            book_id,
            author_id
        }
    });
}

function bookAuthorCreate(book_id, author_id) {
    return BookAuthor
        .create({ book_id, author_id })
}

module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
module.exports.bookAuthorFind = bookAuthorFind;
module.exports.bookAuthorCreate = bookAuthorCreate;