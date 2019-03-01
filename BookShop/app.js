"use strict";
const express = require("express"),
    app = express(),
    server = require("./server")(app, express),
    log = require('simple-node-logger').createSimpleFileLogger('project.log');

app.set("port", process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    log.info('Express server listening on port ' + app.get('port'))
});

module.exports = app;
