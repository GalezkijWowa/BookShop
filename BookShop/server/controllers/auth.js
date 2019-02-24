const User = require('../models').User;
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

module.exports = {
    singIn(req, res) {
        passport.authenticate('local')
            .then((user) => res.status(200).send(user))
            //.catch((error) => res.status(400).send(error));
    },

    register(req, res) {
        User.find({
            where: { username: req.body.username }
        })
            .then(function (user) {
                var SALT_WORK_FACTOR = 10;
                bcrypt.genSalt(SALT_WORK_FACTOR).then(function (salt) {
                    bcrypt.hash(req.body.password, salt).then(function (hash) {
                        if (!user) {
                            User
                                .create({
                                    username: req.body.username,
                                    password: hash
                                })
                                .then((user) => res.status(201).send(user))
                                .catch((error) => res.status(400).send(error));
                        } else {
                            res.status(201).send(user);
                        }
                    });
                });
            })
            .catch(function (err) {
                throw err;
            });
    }
};