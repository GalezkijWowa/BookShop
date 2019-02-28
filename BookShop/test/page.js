const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp);
const pageService = require("../server/services/pageService");

const token = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInVzZXJuYW1lIjoidGVzdCIsInBhc3N3b3JkIjoiJDJhJDEwJEdhQTFPS0ZmTm0wQXBiUDJaL3pvWi5PTEJMVWhycEUzU1dyZXdNL3BjMTZSdHJ2OXptWi9tIiwiY3JlYXRlZEF0IjoiMjAxOS0wMi0yNlQxNDowNTo1NC4xMjNaIiwidXBkYXRlZEF0IjoiMjAxOS0wMi0yNlQxNDowNTo1NC4xMjNaIiwiaWF0IjoxNTUxMzAxNTA4LCJleHAiOjE1NTM4OTM1MDh9.wupkX9LEF0hVouW-a-DC9lROuTV8kitRQc3iJFOPp34";

const userCredentials = {
    username: 'test',
    password: '123456'
}

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
    it('it sould post the page info', (done) => {
        const page = {
            content: "Test page content",
            number: 100,
            book_id: 5
        };
        chai.request(app)
            .post('/api/page')
            .set("Authorization", token)
            .send(page)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
                pageService.findById(res.body.id)
                    .then(function (page) {
                        pageService.destroy(page)
                            .then(() => { });
                    });
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
