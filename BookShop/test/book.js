const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp)
const bookService = require("../server/services/bookService");
const authorService = require("../server/services/authorService");
const config = require("../server/config");
const authService = require("../server/services/authService");

const token = config.get("jwtKeyForTesting"); 

describe('BOOK', () => {
    let token;
    before((done) => {
        let rootUser;
        const testUserName = config.get("testUsername");
        authService
            .findByName(testUserName)
            .then((user) => {
                if (!user) {
                    authService.create(testUserName, config.get("testPassword"))
                        .then((createdUser) => {
                            rootUser = createdUser;
                        });
                }
                else {
                    rootUser = user;
                }
                token = "JWT " + authService.getToken(rootUser);
                done();
            });
    });

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
        let tempBookId;
        after((done) => {
            bookService.findById(tempBookId)
                .then((book) => {
                    bookService.destroy(book)
                        .then(() => { });
                });
            done();
        });

        it('it sould post the book info', (done) => {
            const book = {
                title: "Magica",
                cost: 10
            };
            chai.request(app)
                .post('/api/book')
                .set("Authorization", token)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    tempBookId = res.body.id;
                    done();
                });
        });
    });

    describe('BOOK/PUT/:id', () => {
        let tempBookId;
        before((done) => {
            bookService.create("Magica for update", 150)
                .then((book) => {
                    tempBookId = book.id;
                    done();
                });
            
        });
        after((done) => {
            bookService.findById(tempBookId)
                .then((book) => {
                    bookService.destroy(book)
                        .then(() => { });
                });
            done();
        });

        it("should update book info", (done) => {
            const book = {
                title: " Magica UPDATED",
                cost: 15
            };
            chai.request(app)
                .put('/api/book/' + tempBookId)
                .set("Authorization", token)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('BOOK/DELETE/:id', () => {
        let tempBookId;
        before((done) => {
            bookService.create("Magica for update", 150)
                .then((book) => {
                    tempBookId = book.id;
                    done();
                });

        });
        it("should delete the book", (done) => {
            const bookId = 1;
            chai.request(app)
                .delete('/api/book/' + tempBookId)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

    describe('BOOK/GET/:id', () => {
        let tempBookId;
        before((done) => {
            bookService.create("Magica for update", 150)
                .then((book) => {
                    tempBookId = book.id;
                    done();
                });

        });
        after((done) => {
            bookService.findById(tempBookId)
                .then((book) => {
                    bookService.destroy(book)
                        .then(() => { });
                });
            done();
        });
        it("should get book info", (done) => {
            chai.request(app)
                .get('/api/book/' + tempBookId)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('BOOK/AUTHOR/POST', () => {
        let tempBookauthorId;
        let bookauthor; 

        let tempAuthor;
        let tempBook;
        before((done) => {
            Promise.all([
                authorService.create("Vasilii A. for update", 31),
                bookService.create("Magica for update", 150)
            ])
                .then((results) => {
                    bookauthor = {
                        author_id: results[0].id,
                        book_id: results[1].id,
                    }
                    tempBook = results[1];
                    tempAuthor = results[0];
                    done();
                });
        });
        after((done) => {
            bookService.findById(tempBookauthorId)
                .then((ba) => {
                    bookService.bookAuthorDestroy(ba);
                });
            Promise.all([
                authorService.destroy(tempAuthor),
                bookService.destroy(tempBook)
            ]).then(() => { });
            done();
        });

        it("should add book author", (done) => {
            chai.request(app)
                .post('/api/book/author')
                .set("Authorization", token)
                .send(bookauthor)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    tempBookauthorId = res.body.id;
                    done();
                });
        });
    });
});