const authService = require("../services/authService");

function verifyToken(req, res, next) {
    const jwtHeader = req.headers["authorization"];
    if (typeof jwtHeader !== "undefined") {
        const jwtData = jwtHeader.split(" ");
        const jwtToken = jwtData[1];
        req.token = jwtToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

function isAuth(req, res, next) {
    let result = authService.verifyToken(req.token);

    if (result.message) {
        res.sendStatus(403);
    } else {
        next();
    }
}

module.exports.verifyToken = verifyToken;
module.exports.isAuth = isAuth;
