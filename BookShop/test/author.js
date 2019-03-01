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
        before((done) => {
            author = {
                name: "Husne Ara",
                age: 10
            };
            done();
        });

        after((done) => {
            authorService.findById(tempAuthorId)
                .then((author) => {
                    authorService.destroy(author)
                        .then(() => { });
                });
            done();
        });

        it('it sould post the author info', (done) => {
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
    });

    describe('AUTHOR/PUT/:id', () => {
        let tempAuthorId;
        before((done) => {
            authorService.create("Vasilii A. for update", 31)
                .then((author) => {
                    tempAuthorId = author.id;
                    done();
                });
        });

        after((done) => {
            authorService.findById(tempAuthorId)
                .then((author) => {
                    authorService.destroy(author)
                        .then(() => { });
                });
            done();
        });
        
        it("should update author info", (done) => {
            const author = {
                name: " Husne Ara UPDATED",
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

        it("should delete the author", (done) => {
            chai.request(app)
                .delete('/api/author/' + tempAuthorId)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

    describe('AUTHOR/GET/:id', () => {
        let tempAuthorId;
        before((done) => {
            authorService.create("Vasilii A. for update", 31)
                .then((author) => {
                    tempAuthorId = author.id;
                    done();
                });
        });

        after((done) => {
            authorService.findById(tempAuthorId)
                .then((author) => {
                    authorService.destroy(author)
                        .then(() => { });
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
    });

});
