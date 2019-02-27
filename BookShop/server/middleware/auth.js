const jwt = require("jsonwebtoken");

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
    //jwt.verify(req.token, process.env.JWT_SERCRET_KEY, (err) => {
    jwt.verify(req.token, "test", (err) => {
        if (err) {
            res.sendStatus(403);
        } else {
            next();
        }
    });
}


module.exports.verifyToken = verifyToken;
module.exports.isAuth = isAuth;
