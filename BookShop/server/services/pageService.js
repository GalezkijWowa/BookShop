const Author = require("../database/models").Author;
const Book = require("../database/models").Book;
const Page = require("../database/models").Page;



function findAll() {
    return Page
        .findAll({
            include: [{
                model: Book,
                as: "book"
            }],
        });
}

function findById(id) {
    return Page
        .findById(id, {
            include: [{
                model: Book,
                as: "book"
            }],
        });
}

function find(number, book_id) {
    return Page.find({
        where: {
            number: number,
            book_id: book_id
        }
    })
}

function create(content, number, book_id) {
    return Page
        .create({ content, number, book_id });
}

function update(page, content, number, book_id) {
    return page
        .update({ content, number, book_id });
}

function destroy(page) {
    return page
        .destroy();
}

module.exports.findAll = findAll;
module.exports.find = find;
module.exports.findById = findById;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;