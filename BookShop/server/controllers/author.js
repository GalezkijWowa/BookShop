﻿const Author = require('../models').Author;
const Book = require('../models').Book;
const Page = require('../models').Page;

module.exports = {
    list(req, res) {
        return Author
            .findAll({
                include: [{
                    model: Book,
                    as: 'books'
                }]
            })
            .then((authors) => res.status(200).send(authors))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Author
            .findById(req.params.id, {
                include: [{
                    model: Book,
                    as: 'books'
                }]
            })
            .then((author) => {
                if (!author) {
                    return res.status(404).send({
                        message: 'Author Not Found',
                    });
                }
                return res.status(200).send(author);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return Author
            .create({
                name: req.body.name,
                age: req.body.age
            })
            .then((author) => res.status(201).send(author))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Author
            .findById(req.params.id, {
                include: [{
                    model: Book,
                    as: 'books'
                }]
            })
            .then(author => {
                if (!author) {
                    return res.status(404).send({
                        message: 'Author Not Found',
                    });
                }
                return author
                    .update({
                        name: req.body.name,
                        age: req.body.age
                    })
                    .then(() => res.status(200).send(author))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Author
            .findById(req.params.id)
            .then(author => {
                if (!author) {
                    return res.status(400).send({
                        message: 'Author Not Found',
                    });
                }
                return author
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};