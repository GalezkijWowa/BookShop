const Book = require("../database/models").Book;
const Page = require("../database/models").Page;
const Author = require("../database/models").Author;
const BookAuthor = require("../database/models").BookAuthor;


function list(req, res) {
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
        .then((books) => res.status(200).send(books))
        .catch((error) => { res.status(400).send(error); });
}

function getById(req, res) {
    return Book
        .findById(req.params.id, {
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
    if (req.body.cost === undefined || req.body.cost < 0) res.status(400).send({
        message: "Cost undefined or less than 0",
    });
    else {
        return Book
            .create({
                title: req.body.title,
                cost: req.body.cost
            })
            .then((book) => res.status(201).send(book))
            .catch((error) => res.status(400).send(error));
    }
}

function update(req, res) {
    return Book
        .findById(req.params.id, {
            include: [{
                model: Page,
                as: "pages"
            },
            {
                model: Author,
                as: "authors"
            }],
        })
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "Book Not Found",
                });
            }
            return book
                .update({
                    title: req.body.title,
                    cost: req.body.cost
                })
                .then(() => res.status(200).send(book))
                .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
}

function del(req, res) {
    return Book
        .findById(req.params.id)
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "Book Not Found",
                });
            }
            return book
                .destroy()
                .then(() => res.status(204).send())
                .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
}

function addBookAuthor(req, res) {
    Promise.all([
        BookAuthor.find({
            where: {
                book_id: req.body.book_id,
                author_id: req.body.author_id
            }
        }),
        Book.findById(req.body.book_id),
        Author.findById(req.body.author_id)
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
            return BookAuthor
                .create({
                    book_id: req.body.book_id,
                    author_id: req.body.author_id
                })
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