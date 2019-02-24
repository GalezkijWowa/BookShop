var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models').User;

passport.use(new LocalStrategy(function (username, password, done) {
    User
        .find({ where: { username: username } })
        .then(function (user) {
            if (!user) {
                return done(null, false, { message: 'Unknown user ' + username });
            }
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        })
        .catch(function (err) {
            done(err);
        });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
    User
        .find({ where: { id: userId } })
        .then(function (user) {
            done(null, user);
        }).catch(function (err) {
            done(err, null);
        });
});