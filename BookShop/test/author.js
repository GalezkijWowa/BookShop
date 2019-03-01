const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp)
const authorService = require("../server/services/authorService");

const config = require("../server/config");
const token = config.get("jwtKeyForTesting"); 

describe('AUTHOR/GET', () => {
    it('it should Get all authors', (done) => {
        chai.request(app)
            .get('/api/author')
            .set("Authorization", token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('AUTHOR/POST', () => {
    it('it sould post the author info', (done) => {
        const author = {
            name: " Husne Ara",
            age: 10
        };
        chai.request(app)
            .post('/api/author')
            .set("Authorization", token)
            .send(author)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
                authorService.findById(res.body.id)
                    .then(function (author) {
                        authorService.destroy(author)
                            .then(() => { });
                    });
            });
    });
});

describe('AUTHOR/PUT/:id', () => {
    let authorId;
    authorService.create("Vasilii A. for update", 31)
        .then(function (author) {
            authorId = author.id;
        });
    it("should update author info", (done) => {
        const author = {
            name: " Husne Ara UPDATED",
            age: 15
        };
        chai.request(app)
            .put('/api/author/' + authorId)
            .set("Authorization", token)
            .send(author)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
                authorService.findById(authorId)
                    .then(function (author) {
                        authorService.destroy(author)
                            .then(() => { });
                    });
            });
    });
});

describe('AUTHOR/DELETE/:id', () => {
    authorService.create("Vasilii A. for delete", 39)
        .then(function (author) {
            it("should delete the author", (done) => {
                chai.request(app)
                    .delete('/api/author/' + author.id)
                    .set("Authorization", token)
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
        });
});

describe('AUTHOR/GET/:id', () => {
    let authorId;
    it("should get author info", (done) => {
        authorService.create("Vasilii A.", 31)
            .then(function (author) {
                authorId = author.id;
            chai.request(app)
                .get('/api/author/' + authorId)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
            authorService.findById(authorId)
                .then(function (author) {
                    authorService.destroy(author)
                        .then(() => { });
                    });
            });
        });
});
