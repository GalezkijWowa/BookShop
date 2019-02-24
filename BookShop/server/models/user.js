'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        }
    },
    {
        classMethods: {
            comparePassword: function (password, hash, callback) {
                bcrypt.compare(password, hash, function (err, isMatch) {
                    if (err) {
                        return callback(err, null);
                    } else {
                        callback(null, isMatch);
                    }
                });
            }
        }
    });
    User.associate = function(models) {
        // associations can be defined here
    };

    //User.addHook('beforeCreate', function (user, callback) {
    //    var SALT_WORK_FACTOR = 10;
    //    var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    //        return salt;
    //    });

    //    bcrypt.hash(user.password, salt, null, function (err, hash) {
    //        if (err) return next(err);
    //        user.password = hash;
    //        return callback(user);
    //    });
    //});

    return User;
};