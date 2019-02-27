const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp)

const token = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJE1LbjhHWEJGMnRuTWRjeS83TlphZGVTRE8uNkhJMmRiay5idFBlUElOU2RybVYydnZUay9DIiwiY3JlYXRlZEF0IjoiMjAxOS0wMi0yNVQwODowMToyOC45OThaIiwidXBkYXRlZEF0IjoiMjAxOS0wMi0yNVQwODowMToyOC45OThaIiwiaWF0IjoxNTUxMjY5MjcxLCJleHAiOjE1NTM4NjEyNzF9.EjM45_5Y7V79ke3bpIsEqDAnvP_jGZozIjYitbxZBi0";

describe('/GET book', () => {
    it('it should Get all books', (done) => {
        chai.request(app)
            .get('/api/book')
            .auth("admin", "123456")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/POST book', () => {
    it('it sould post the book info', (done) => {
        const book = {
            title: " Husne Ara",
            cost: 10
        };
        chai.request(app)
            .post('/api/book')
            .auth("admin", "123456")
            .send(book)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('message');
                res.body.should.have.property('statusType').eq('success');
                done();
            });
    });
});

//describe('/PUT/:id user', () => {
//    it("should not update the user info", (done) => {
//        const user = {
//            firstName: "Mr.",
//            lastName: "Himu",
//        }
//        const userId = 2;
//        chai.request(app)
//            .put('/api/book/' + userId)
//            .send(user)
//            .end((err, res) => {
//                res.should.have.status(404);
//                res.body.should.be.a('object');
//                res.body.should.have.property('message');
//                res.body.should.have.property('statusType').eq('error');
//                done();
//            });
//    });
//});