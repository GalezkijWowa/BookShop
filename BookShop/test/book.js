const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp)
const bookService = require("../server/services/bookService");
const authorService = require("../server/services/authorService");
const config = require("../server/config");

const token = config.get("jwtKeyForTesting"); 

describe('BOOK/GET', () => {
    it('it should Get all books', (done) => {
        chai.request(app)
            .get('/api/book')
            .set("Authorization", token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('BOOK/POST', () => {
    it('it sould post the book info', (done) => {
        const book = {
            title: " Magica",
            cost: 10
        };
        chai.request(app)
            .post('/api/book')
            .set("Authorization", token)
            .send(book)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
                bookService.findById(res.body.id)
                    .then(function (book) {
                        bookService.destroy(book)
                            .then(() => { });
                    });
            });
    });
});

describe('BOOK/PUT/:id', () => {
    let bookId;
    bookService.create("Magica for update", 150)
        .then(function (book) {
            bookId = book.id;
        });
    it("should update book info", (done) => {
        const book = {
            title: " Magica UPDATED",
            cost: 15
        };
        chai.request(app)
            .put('/api/book/' + bookId)
            .set("Authorization", token)
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
                bookService.findById(bookId)
                    .then(function (book) {
                        bookService.destroy(book)
                            .then(() => { });
                    });
            });
    });
});

describe('BOOK/DELETE/:id', () => {
    bookService.create("Magica delete", 39)
        .then(function (book) {
            it("should delete the book", (done) => {
                const bookId = 1;
                chai.request(app)
                    .delete('/api/book/' + bookId)
                    .set("Authorization", token)
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
        });
});

describe('BOOK/GET/:id', () => {
    let bookId;
    bookService.create("Test Title", 150)
        .then(function (book) {
            bookId = book.id;
        });
    it("should get book info", (done) => {
        chai.request(app)
            .get('/api/book/' + bookId)
            .set("Authorization", token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
                bookService.findById(bookId)
                    .then(function (book) {
                        bookService.destroy(book)
                            .then(() => { });
                    });
            });
    });
});

describe('BOOK/AUTHOR/POST', () => {
    it("should add book author", (done) => {
        Promise.all([
            authorService.create("Vasilii A. for update", 31),
            bookService.create("Magica for update", 150)
        ])
            .then(function (results) {
                const bookauthor = {
                    author_id: results[0].id,
                    book_id: results[1].id,
                }
                chai.request(app)
                    .post('/api/book/author')
                    .set("Authorization", token)
                    .send(bookauthor)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        done();
                        bookService.findById(res.body.id)
                            .then(function (bookauthor) {
                                bookService.bookAuthorDestroy(bookauthor);
                            });
                        Promise.all([
                            authorService.destroy(results[0]),
                            bookService.destroy(results[1]),
                        ]).then(() => { });     
                    });
            });
    });
});