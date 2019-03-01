const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
const app = require('../app');
const should = chai.should();



describe('AUTH/SINGIN', () => {
    it("should singin user", (done) => {
        const user = {
            username: "admin",
            password: "123456",
        }
        chai.request(app)
            .post('/api/auth/singin')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('AUTH/REGISTER', () => {
    it("should register user", (done) => {
        const user = {
            username: Math.random().toString(36).substr(2, 5),
            password: "123456",
        }
        chai.request(app)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
    });
});