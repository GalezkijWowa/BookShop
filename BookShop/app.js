"use strict";

var express = require("express"),
    app = express();

require("./server/middleware")(app, express);
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"));


