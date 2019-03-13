const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp);

const config = require("../server/config");
const pageService = require("../server/services/pageService");
const authService = require("../server/services/authService");
const bookService = require("../server/services/bookService");

describe('PAGE', () => {
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

    describe('PAGE/GET page', () => {
        it('it should Get all pages', (done) => {
            chai.request(app)
                .get('/api/page')
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('PAGE/POST', () => {
        let pageId;
        let page;
        let tempBook;
        beforeEach((done) => {
            bookService.create("TestTitle", 150)
                .then((book) => {
                    tempBook = book;
                    done();
                });
        });

        afterEach((done) => {
            pageService.findById(pageId)
                .then((page) => {
                    if (page) {
                        pageService.destroy(page)
                            .then(() => { });
                    }
                });
            bookService.destroy(tempBook)
                .then(() => {});
            done();
        });
        it('it should post the page info', (done) => {
            page = {
                content: "Test page content",
                number: 1,
                book_id: tempBook.id
            };
            chai.request(app)
                .post('/api/page')
                .set("Authorization", token)
                .send(page)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    pageId = res.body.id;
                    done();
                });
        });

        it('it shouldn\t post the page info', (done) => {
            page = {
                number: 1,
                book_id: tempBook.id
            };
            chai.request(app)
                .post('/api/page')
                .set("Authorization", token)
                .send(page)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    pageId = res.body.id;
                    done();
                });
        });

        it('it shouldn\t post the page info', (done) => {
            page = {
                content: "Test page content",
                book_id: tempBook.id
            };
            chai.request(app)
                .post('/api/page')
                .set("Authorization", token)
                .send(page)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    pageId = res.body.id;
                    done();
                });
        });

        it('it shouldn\t post the page info', (done) => {
            page = {
                content: "Test page content",
                number: 1
            };
            chai.request(app)
                .post('/api/page')
                .set("Authorization", token)
                .send(page)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    pageId = res.body.id;
                    done();
                });
        });

        it('it shouldn\t post the page info', (done) => {
            page = {
                content: "Test page content",
                number: -41,
                book_id: tempBook.id
            };
            chai.request(app)
                .post('/api/page')
                .set("Authorization", token)
                .send(page)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    pageId = res.body.id;
                    done();
                });
        });
    });

    describe('PAGE/PUT/:id page', () => {
        let tempPage;
        let tempBook;
        beforeEach((done) => {
            bookService.create("TestTitle", 100)
                .then((book) => {
                    tempBook = book;
                    pageService.create("Test Page Content for update", 1, book.id)
                        .then((page) => {
                            tempPage = page;
                            done();
                        });
                });
        });

        afterEach((done) => {
            bookService.destroy(tempBook)
                .then(() => { });

            pageService.destroy(tempPage)
                .then(() => { });
            done();
        });

        it("should update page info", (done) => {
            const page = {
                content: "Test page content UPDATED",
                number: 1,
                book_id: tempBook.id
            };
            chai.request(app)
                .put('/api/page/' + tempPage.id)
                .set("Authorization", token)
                .send(page)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("shouldn't update page info", (done) => {
            const page = {
                content: "Test page content UPDATED",
                book_id: tempBook.id
            };
            chai.request(app)
                .put('/api/page/' + tempPage.id)
                .set("Authorization", token)
                .send(page)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("shouldn't update page info", (done) => {
            const page = {
                content: "Test page content UPDATED",
                number: 1
            };
            chai.request(app)
                .put('/api/page/' + tempPage.id)
                .set("Authorization", token)
                .send(page)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("shouldn't update page info", (done) => {
            const page = {
                content: "Test page content UPDATED",
                number: -31,
                book_id: tempBook.id
            };
            chai.request(app)
                .put('/api/page/' + tempPage.id)
                .set("Authorization", token)
                .send(page)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("shouldn't update page info", (done) => {
            const page = {
                number: 1,
                book_id: tempBook.id
            };
            chai.request(app)
                .put('/api/page/' + tempPage.id)
                .set("Authorization", token)
                .send(page)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('PAGE/DELETE/:id', () => {
        let tempPage;
        let tempBook;
        beforeEach((done) => {
            bookService.create("TestTitle", 100)
                .then((book) => {
                    tempBook = book;
                    pageService.create("Test Page Content for update", 1, book.id)
                        .then((page) => {
                            tempPage = page;
                            done();
                        });
                });
        });

        afterEach((done) => {
            bookService.destroy(tempBook)
                .then(() => { });
            done();
        });

        it("should delete the page", (done) => {
            chai.request(app)
                .delete('/api/page/' + tempPage.id)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });

        it("shouldn't get page info", (done) => {
            chai.request(app)
                .delete('/api/page/' + 123345345)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('PAGE/GET/:id', () => {
        let tempPage;
        let tempBook;
        before((done) => {
            bookService.create("TestTitle", 100)
                .then((book) => {
                    tempBook = book;
                    pageService.create("Test Page Content for update", 1, book.id)
                        .then((page) => {
                            tempPage = page;
                            done();
                        });
                });
        });

        after((done) => {
            bookService.destroy(tempBook)
                .then(() => { });

            pageService.destroy(tempPage)
                .then(() => { });
            done();
        });

        it("should get page info", (done) => {
            chai.request(app)
                .get('/api/page/' + tempPage.id)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("shouldn't get page info", (done) => {
            chai.request(app)
                .get('/api/page/' + 123123)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

