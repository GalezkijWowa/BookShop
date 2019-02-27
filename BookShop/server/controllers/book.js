const bookService = require("../services/bookService");
const authorService = require("../services/authorService");


function list(req, res) {
    return bookService
        .findAll()
        .then((books) => res.status(200).send(books))
        .catch((error) => { res.status(400).send(error); });
}

function getById(req, res) {
    return bookService
        .findById(req.params.id)
        .then((book) => {
            if (!book) {
                return res.status(404).send({
                    message: "Book Not Found",
                });
            }
            return res.status(200).send(book);
        })
        .catch((error) => res.status(400).send(error));
}

function add(req, res) {
    if (!req.body.cost || req.body.cost < 0) res.status(400).send({
        message: "Cost undefined or less than 0",
    });
    else {
        return bookService
            .create(req.body.title, req.body.cost)
            .then((book) => res.status(201).send(book))
            .catch((error) => res.status(400).send(error));
    }
}

function update(req, res) {
    return bookService
        .findById(req.params.id)
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "Book Not Found",
                });
            }
            return bookService
                .update(book, req.body.title, req.body.cost)
                .then(() => res.status(200).send(book))
                .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
}

function del(req, res) {
    return bookService
        .findById(req.params.id)
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "Book Not Found",
                });
            }
            return bookService
                .destroy(book)
                .then(() => res.status(204).send())
                .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
}

function addBookAuthor(req, res) {
    Promise.all([
        bookService.bookAuthorFind(req.body.book_id, req.body.author_id),
        bookService.findById(req.body.book_id),
        authorService.findById(req.body.author_id)
    ]).then(function (results) {
        if (results[0]) {
            res.status(400).send({ msg: "Relationship already exists." });
        }
        else if (!results[1]) {
            res.status(404).send({ msg: "Book not found." });
        }
        else if (!results[2]) {
            res.status(404).send({ msg: "Author not found." });
        }
        else {
            return bookService
                .bookAuthorCreate(req.body.book_id, req.body.author_id)
                .then((bookauthor) => res.status(201).send(bookauthor))
                .catch((error) => res.status(400).send(error));
        }
    });
}

module.exports.list = list;
module.exports.add = add;
module.exports.getById = getById;
module.exports.update = update;
module.exports.del = del;
module.exports.addBookAuthor = addBookAuthor;