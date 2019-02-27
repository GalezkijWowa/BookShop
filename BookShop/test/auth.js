const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp)
let path = require('path');
let dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath });


describe('/POST singin user', () => {
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
                //res.body.should.be.a('object');
                //res.body.should.have.property('message');
                //res.body.should.have.property('statusType').eq('error');
                done();
            });
    });
});