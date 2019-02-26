"use strict";

var bcrypt = require("bcrypt-nodejs");
const config = require("../config");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });

    User.beforeSave((user, options) => {
        if (user.changed("password")) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(config.get("saltWordFactor")), null);
        }
    });
    User.prototype.comparePassword = function (passw, cb) {
        bcrypt.compare(passw, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};