var express = require("express");
var router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/swagger", swaggerUi.serve);
router.get("/swagger", swaggerUi.setup(swaggerDocument));

module.exports = router;