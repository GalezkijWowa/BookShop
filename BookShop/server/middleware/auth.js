//exports.ensureAuthenticated = function (req, res, next) {
//    var token = getToken(req.headers);
//    if (token) {
//        next();
//    } else {
//        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
//    }
//}

//exports.destroySession = function (req, res, next) {
//    req.logout();
//    req.session.destroy();
//}

//getToken = function (headers) {
//    if (headers && headers.authorization) {
//        var parted = headers.authorization.split(' ');
//        if (parted.length === 2) {
//            return parted[1];
//        } else {
//            return null;
//        }
//    } else {
//        return null;
//    }
//};
const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken(req, res, next) {
        const jwtHeader = req.headers['authorization'];
        if (typeof jwtHeader !== 'undefined') {
            const jwtData = jwtHeader.split(' ');
            const jwtToken = jwtData[1];
            req.token = jwtToken;
            next();
        } else {
            res.sendStatus(403);
        }
    },

    isAuth(req, res, next) {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                next();
            }
        });
    }
}
