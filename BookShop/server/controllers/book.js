const Book = require("../models").Book;
const Page = require("../models").Page;
const Author = require("../models").Author;
const BookAuthor = require("../models").BookAuthor;

module.exports = {
    list(req, res) {
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
    },

    getById(req, res) {
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
    },

    add(req, res) {
        return Book
            .create({
                title: req.body.title,
                cost: req.body.cost
            })
            .then((book) => res.status(201).send(book))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
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
    },

    delete(req, res) {
        return Book
            .findById(req.params.id)
            .then(book => {
                if (!book) {
                    return res.status(400).send({
                        message: "Book Not Found",
                    });
                }
                return book
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    addBookAuthor(req, res) {
        return BookAuthor
            .create({
                book_id: req.body.book_id,
                author_id: req.body.author_id
            })
            .then((bookauthor) => res.status(201).send(bookauthor))
            .catch((error) => res.status(400).send(error));
    },
};