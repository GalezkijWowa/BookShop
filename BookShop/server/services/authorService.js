const Author = require("../database/models").Author;
const Book = require("../database/models").Book;

function findAll() {
    return Author
        .findAll({
            include: [{
                model: Book,
                as: "books"
            }]
        });
}

function findById(id) {
    return Author
        .findById(id, {
            include: [{
                model: Book,
                as: "books"
            }]
        });
}

function create(name, age) {
    return Author
        .create({ name, age });
}

function update(author, name, age) {
    return author
        .update({ name, age });
}

function destroy(author) {
    return author
        .destroy();
}

module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;