const jwt = require("jsonwebtoken");
const config = require("../config");
const authService = require("../services/authService");
const path = require('path');

function singIn(req, res) {
    authService
        .findByName(req.body.username)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "Authentication failed. User not found."
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    let token = authService.getToken(user);
                    res.json({ success: true, token: "JWT " + token });
                } else {
                    res.status(401).send({ success: false, msg: "Authentication failed. Wrong password." });
                }
            });
        })
        .catch((error) => res.status(400).send(error));
}

function register(req, res) {
    authService
        .findByName(req.body.username)
        .then(function (user) {
            if (!user) {
                authService
                    .create(req.body.username, req.body.password)
                    .then((user) => res.status(201).send(user))
                    .catch((error) => res.status(400).send(error));
            } else {
                res.status(401).send({ msg: "User already exists." });
            }
        })
        .catch(function (err) {
            throw err;
        });
}


module.exports.singIn = singIn;
module.exports.register = register;