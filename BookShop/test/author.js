const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp)
const authorService = require("../server/services/authorService");
const authService = require("../server/services/authService");
const config = require("../server/config");

describe('AUTHOR', () => {
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
        let tempAuthorId;
        let author;
        
        afterEach((done) => {
            authorService.findById(tempAuthorId)
                .then((author) => {
                    if (author) {
                        authorService.destroy(author)
                            .then(() => { });
                    }
                });
            done();
        });

        it('it should post the author info', (done) => {
            author = {
                name: "Husne Ara",
                age: 10
            };
            chai.request(app)
                .post('/api/author')
                .set("Authorization", token)
                .send(author)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    tempAuthorId = res.body.id;
                    done();
                });
        });

        it('it shouldn\'t post the author info', (done) => {
            author = {
                name: "Husne Ara",
                age: -12
            };
            chai.request(app)
                .post('/api/author')
                .set("Authorization", token)
                .send(author)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    tempAuthorId = res.body.id;
                    done();
                });
        });

        it('it shouldn\'t post the author info', (done) => {
            author = {
                name: "Husne Ara",
            };
            chai.request(app)
                .post('/api/author')
                .set("Authorization", token)
                .send(author)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    tempAuthorId = res.body.id;
                    done();
                });
        });

        it('it shouldn\'t post the author info', (done) => {
            author = {
                age: 24
            };
            chai.request(app)
                .post('/api/author')
                .set("Authorization", token)
                .send(author)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    tempAuthorId = res.body.id;
                    done();
                });
        });
    });

    describe('AUTHOR/PUT/:id', () => {
        let tempAuthorId;
        beforeEach((done) => {
            authorService.create("Vasilii A. for update", 31)
                .then((author) => {
                    tempAuthorId = author.id;
                    done();
                });
        });

        afterEach((done) => {
            authorService.findById(tempAuthorId)
                .then((author) => {
                    if (author) {
                        authorService.destroy(author)
                            .then(() => { });
                    }
                });
            done();
        });
        
        it("should update author info", (done) => {
            let author = {
                name: "Husne Ara",
                age: 10
            };
            chai.request(app)
                .put('/api/author/' + tempAuthorId)
                .set("Authorization", token)
                .send(author)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("shouldn update author info", (done) => {
            const author = {
                age: 15
            };
            chai.request(app)
                .put('/api/author/' + tempAuthorId)
                .set("Authorization", token)
                .send(author)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should update author info", (done) => {
            const author = {
                name: "Husne Ara UPDATED"
            };
            chai.request(app)
                .put('/api/author/' + tempAuthorId)
                .set("Authorization", token)
                .send(author)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("shouldn't update author info", (done) => {
            const author = {
                name: "Husne Ara UPDATED",
                age: -15
            };
            chai.request(app)
                .put('/api/author/' + tempAuthorId)
                .set("Authorization", token)
                .send(author)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("shouldn't update author info", (done) => {
            const author = {
                name: "Husne Ara UPDATED",
                age: 15
            };
            chai.request(app)
                .put('/api/author/' + 12344321)
                .set("Authorization", token)
                .send(author)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('AUTHOR/DELETE/:id', () => {
        let tempAuthorId;
        before((done) => {
            authorService.create("Vasilii A. for update", 31)
                .then((author) => {
                    tempAuthorId = author.id;
                    done();
                });
        });

        afterEach((done) => {
            authorService.findById(tempAuthorId)
                .then((author) => {
                    if (author) {
                        authorService.destroy(author)
                            .then(() => { });
                    }
                });
            done();
        });

        it("should delete the author", (done) => {
            chai.request(app)
                .delete('/api/author/' + tempAuthorId)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });

        it("shouldn\'t delete the author", (done) => {
            chai.request(app)
                .delete('/api/author/' + 1234311)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('AUTHOR/GET/:id', () => {
        let tempAuthorId;
        beforeEach((done) => {
            authorService.create("Vasilii A. for update", 31)
                .then((author) => {
                    tempAuthorId = author.id;
                    done();
                });
        });

        afterEach((done) => {
            authorService.findById(tempAuthorId)
                .then((author) => {
                    if (author) {
                        authorService.destroy(author)
                            .then(() => { });
                    }
                });
            done();
        });

        it("should get author info", (done) => {
            authorService.create("Vasilii A.", 31)
                .then((author) => {
                    authorId = author.id;
                    chai.request(app)
                        .get('/api/author/' + tempAuthorId)
                        .set("Authorization", token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
                });
        });

        it("shouldn't get author info", (done) => {
            authorService.create("Vasilii A.", 31)
                .then((author) => {
                    authorId = author.id;
                    chai.request(app)
                        .get('/api/author/' + 1234)
                        .set("Authorization", token)
                        .end((err, res) => {
                            res.should.have.status(404);
                            res.body.should.be.a('object');
                            done();
                        });
                });
        });
    });
});
