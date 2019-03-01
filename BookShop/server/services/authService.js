const User = require("../database/models").User;
const config = require("../config");
const jwt = require("jsonwebtoken");

function findByName(username) {
    return User.find({
        where: { username: username }
    })
}

function create(username, password) {
    return User
        .create({ username, password })
}

function getToken(user) {
    return jwt.sign(JSON.parse(JSON.stringify(user)), config.get("jwtSecretKey"), { expiresIn: config.get("jwtExpires") });  // jwtSecretKey must migrate to env variables(problem with test)
}

function verifyToken(token) {
    return jwt.verify(token, config.get("jwtSecretKey"), (err, data) => { // jwtSecretKey must migrate to env variables(problem with test)
        if (err) {
            return err;
        }
        else {
            return data;
        }
    });
}

module.exports.findByName = findByName;
module.exports.create = create;
module.exports.verifyToken = verifyToken;
module.exports.getToken = getToken;