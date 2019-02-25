var express = require('express');
var router = express.Router();

const authorRouter = require('./author');
const bookRouter = require('./book');
const pageRouter = require('./page');
const authRouter = require('./auth');

router.use(authRouter);
router.use(authorRouter);
router.use(pageRouter);
router.use(bookRouter);

module.exports = router;