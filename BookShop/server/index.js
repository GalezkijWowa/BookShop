let logger = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    routes = require("./routes");
    
module.exports = function (app, express) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(logger('dev'));
    app.use(routes);

    app.use((req, res, next) => {
        let err = new Error("Not Found");
        err.status = 404;
        next(err);
    });

    if (app.get("env") === "development") {
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.status(404).send();
        });
    }

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.status(404).send();
    });
};