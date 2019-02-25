const authController = require('../controllers').auth;
var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

router.post('/api/auth/singin', authController.singIn);
router.post('/api/auth/register', authController.register);

module.exports = router;