const authorService = require("../services/authorService");

function list(req, res) {
     return authorService
        .findAll()
        .then((authors) => res.status(200).send(authors))
        .catch((error) => { res.status(400).send(error); });
}

function getById(req, res) {
    return authorService
        .findById(req.params.id)
        .then((author) => {
            if (!author) {
                return res.status(404).send({
                    message: "Author Not Found",
                });
            }
            return res.status(200).send(author);
        })
        .catch((error) => res.status(400).send(error));
}

function add(req, res) {
    if (!req.body.age || req.body.age < 0) res.status(400).send({
        message: "Age undefined or less then 0",
    });
    else {
        return authorService
            .create(req.body.name, req.body.age)
            .then((author) => res.status(201).send(author))
            .catch((error) => res.status(400).send(error));
    }  
}

function update(req, res) {
    if (req.body.age !== undefined && req.body.age < 0) res.status(400).send({
        message: "age less then 0",
    });
    else {
        return authorService
            .findById(req.params.id)
            .then(author => {
                if (!author) {
                    return res.status(404).send({
                        message: "Author Not Found",
                    });
                }
                let tempName = req.body.name ? req.body.name : author.name;
                let tempAge = req.body.age ? req.body.age : author.age;

                return authorService
                    .update(author, tempName, tempAge)
                    .then(() => res.status(200).send(author))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}

function del(req, res) {
    return authorService
        .findById(req.params.id)
        .then(author => {
            if (!author) {
                return res.status(404).send({
                    message: "Author Not Found",
                });
            }
            return authorService
                .destroy(author)
                .then(() => res.status(204).send({ message: "Removed" }))
                .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
}


module.exports.list = list;
module.exports.add = add;
module.exports.getById = getById;
module.exports.update = update;
module.exports.del = del;