const authController = require("../controllers").auth;
let express = require("express");
let router = express.Router();

router.post("/api/auth/singin", authController.singIn);
router.post("/api/auth/register", authController.register);

module.exports = router;