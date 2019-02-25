﻿const authorController = require('../controllers').author;
var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

router.get('/api/author', auth.verifyToken, auth.isAuth, authorController.list);
router.get('/api/author/:id', auth.verifyToken, auth.isAuth, authorController.getById);
router.post('/api/author', auth.verifyToken, auth.isAuth, authorController.add);
router.put('/api/author/:id', auth.verifyToken, auth.isAuth, authorController.update);
router.delete('/api/author/:id', auth.verifyToken, auth.isAuth, authorController.delete);

module.exports = router;