exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return next(new Error(401));
    }
}

exports.destroySession = function (req, res, next) {
    req.logout();
    req.session.destroy();
}