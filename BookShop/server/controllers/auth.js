﻿const User = require('../models').User;
var bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = {
    singIn(req, res) {
        User
            .find({
                where: {
                    username: req.body.username
                }
            })
            .then((user) => {
                if (!user) {
                    return res.status(401).send({
                        message: 'Authentication failed. User not found.',
                    });
                }
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        var token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_SERCRET_KEY, { expiresIn: 86400 * 30 });
                        jwt.verify(token, process.env.JWT_SERCRET_KEY, function (err, data) {
                            console.log(err, data);
                        })
                        res.json({ success: true, token: 'JWT ' + token });
                    } else {
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                })
            })
            .catch((error) => res.status(400).send(error));
    },

    register(req, res) {
        User.find({
            where: { username: req.body.username }
        })
            .then(function (user) {
                if (!user) {
                    User
                        .create({
                            username: req.body.username,
                            password: req.body.password
                        })
                        .then((user) => res.status(201).send(user))
                        .catch((error) => res.status(400).send(error));
                } else {
                    res.status(401).send({ msg: 'User already exists.' })
                }
            })
            .catch(function (err) {
                throw err;
            });
    }
};