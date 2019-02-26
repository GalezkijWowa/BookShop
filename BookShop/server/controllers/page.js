const Page = require("../models").Page;
const Book = require("../models").Book;

module.exports = {
    list(req, res) {
        return Page
            .findAll({
                include: [{
                    model: Book,
                    as: "book"
                }],
            })
            .then((pages) => res.status(200).send(pages))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Page
            .findById(req.params.id, {
                include: [{
                    model: Book,
                    as: "book"
                }],
            })
            .then((page) => {
                if (!page) {
                    return res.status(404).send({
                        message: "Page Not Found",
                    });
                }
                return res.status(200).send(page);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return Page
            .create({
                content: req.body.content,
                number: req.body.number,
                book_id: req.body.book_id,
            })
            .then((page) => res.status(201).send(page))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Page
            .findById(req.params.id, {
                include: [{
                    model: Book,
                    as: "book"
                }],
            })
            .then(page => {
                if (!page) {
                    return res.status(404).send({
                        message: "Page Not Found",
                    });
                }
                return page
                    .update({
                        content: req.body.content,
                        number: req.body.number,
                        book_id: req.body.book_id
                    })
                    .then(() => res.status(200).send(page))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Page
            .findById(req.params.id)
            .then(page => {
                if (!page) {
                    return res.status(400).send({
                        message: "Page Not Found",
                    });
                }
                return page
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};