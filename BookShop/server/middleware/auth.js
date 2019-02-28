const jwt = require("jsonwebtoken");
const config = require("../config");

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
    jwt.verify(req.token, config.get("jwtSecretKey"), (err) => {  //jwtExpires must migrate to env variables(problem with test)
        if (err) {
            res.sendStatus(403);
        } else {
            next();
        }
    });
}


module.exports.verifyToken = verifyToken;
module.exports.isAuth = isAuth;
