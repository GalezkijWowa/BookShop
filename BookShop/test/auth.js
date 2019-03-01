//const chai = require('chai');
//const chaiHttp = require('chai-http');
//chai.use(chaiHttp)
//const app = require('../app');
//const should = chai.should();
//const config = require("../server/config");
//const authService = require("../server/services/authService");

//describe('AUTH/SINGIN', () => {
//    let testUserName = config.get("testUsername");
//    let userpassword = config.get("testPassword");
//    before((done) => {
//        const testUserName = config.get("testUsername");
//        authService
//            .findByName(testUserName)
//            .then((user) => {
//                if (!user) {
//                    authService.create(testUserName, userpassword)
//                        .then((createdUser) => {});
//                }
//                done();
//            });
//    });

//    it("should singin user", (done) => {
//        const user = {
//            username: testUserName,
//            password: userpassword
//        }
//        chai.request(app)
//            .post('/api/auth/singin')
//            .send(user)
//            .end((err, res) => {
//                res.should.have.status(200);
//                res.body.should.be.a('object');
//                done();
//            });
//    });
//});

//describe('AUTH/REGISTER', () => {
//    it("should register user", (done) => {
//        const user = {
//            username: Math.random().toString(36).substr(2, 5),
//            password: config.get("testPassword")
//        }
//        chai.request(app)
//            .post('/api/auth/register')
//            .send(user)
//            .end((err, res) => {
//                res.should.have.status(201);
//                res.body.should.be.a('object');
//                createdUser = res.user;
//                done();
//            });
//    });
//});