const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp)
const authService = require("../server/services/authService");

describe('AUTH/SINGIN', () => {
    const userCreds = {
        username: Math.random().toString(36).substr(2, 6),
        password: "123456",
    }

    authService.create(userCreds.username, userCreds.password)
        .then(function (user) {
            const userCredsForLogin = {
                username: userCreds.username,
                password: userCreds.password,
            }
            it("should singin user", (done) => {
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