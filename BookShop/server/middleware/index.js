var debug = require('debug'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('../routes'),
    session = require('express-session');


module.exports = function (app, express) {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
        secret: 'mysecret',
        resave: false,
        saveUninitialized: true
    }));

    app.use(routes);

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.status(404).send();
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.status(404).send();
    });
};