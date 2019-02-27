const User = require("../database/models").User;

function findByName(username) {
    return User.find({
        where: { username: username }
    })
}

function create(username, password) {
    return User
        .create({ username, password })
}


module.exports.findByName = findByName;
module.exports.create = create;