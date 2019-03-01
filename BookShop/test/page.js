const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp);
const pageService = require("../server/services/pageService");
const config = require("../server/config");
let token;// = config.get("jwtKeyForTesting");

const authService = require("../server/services/authService");

describe('PAGE/GET page', () => {
    before(function () {
        let rootUser;
        const testUserName = "USER FOR DATABASE TEST";
        var tokenAAA =
            authService
                .findByName(testUserName)
                .then(function (user) {
                    if (!user) {
                        authService.create(testUserName, 123456)
                            .then(function (createdUser) {
                                rootUser = createdUser;
                            });
                    }
                    else {
                        rootUser = user;
                    }
                    return "JWT " + authService.getToken(rootUser)
                });
        tokenAAA.then(function (t) {
            token = t;
        });
    });


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
    //let page;
    //before(function () {
    //    page = {
    //        content: "Test page content",
    //        number: 1001,
    //        book_id: 5
    //    };
    //});
    //after(function () {
    //    pageService.findById(pageId)
    //        .then(function (page) {
    //            pageService.destroy(page)
    //                .then(() => { });
    //        });
    //});
    it('it sould post the page info', (done) => {
        const page = {
            content: "Test page content",
            number: 15,
            book_id: 1
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
});

describe('PAGE/PUT/:id page', () => {
    let pageId;
    pageService.create("Test Page Content", 31, 1)
        .then(function (page) {
            pageId = page.id;
        });
    it("should update page info", (done) => {
        const page = {
            content: "Test page content UPDATED",
            number: 3,
            book_id: 2
        };
        chai.request(app)
            .put('/api/page/' + pageId)
            .set("Authorization", token)
            .send(page)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
                pageService.findById(pageId)
                    .then(function (page) {
                        pageService.destroy(page)
                            .then(() => { });
                    });
            });
    });
});

describe('PAGE/DELETE/:id', () => {
    pageService.create("Test Page Content for update", 31, 1)
        .then(function (page) {
            it("should delete the page", (done) => {
                chai.request(app)
                    .delete('/api/page')
                    .set("Authorization", token)
                    .send(page)
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
        });
});

describe('PAGE/GET/:id', () => {
    let pageId;
    pageService.create("Test Page Content", 31, 3)
        .then(function (page) {
            pageId = page.id;
        });
    it("should get page info", (done) => {
        chai.request(app)
            .get('/api/page/' + pageId)
            .set("Authorization", token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
                pageService.findById(pageId)
                    .then(function (page) {
                        pageService.destroy(page)
                            .then(() => { });
                    });
            });
    });
});
