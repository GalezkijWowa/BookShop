const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp)


describe('AUTH/SINGIN', () => {
    it("should singin user", (done) => {
        const user = {
            username: "test",
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

//describe('AUTH/REGISTER', () => {
//    it("should register user", (done) => {
//        const user = {
//            username: "test1sa423",
//            password: "123456",
//        }
//        chai.request(app)
//            .post('/api/auth/register')
//            .send(user)
//            .end((err, res) => {
//                res.should.have.status(201);
//                res.body.should.be.a('object');
//                done();
//            });
//    });
//});