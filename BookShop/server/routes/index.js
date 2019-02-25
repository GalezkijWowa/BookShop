var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const authorController = require('../controllers').author;
const bookController = require('../controllers').book;
const pageController = require('../controllers').page;
const authController = require('../controllers').auth;

router.get('/api/author', authorController.list);
router.get('/api/author/:id', authorController.getById);
router.post('/api/author', authorController.add);
router.put('/api/author/:id', authorController.update);
router.delete('/api/author/:id', authorController.delete);

router.get('/api/book', auth.verifyToken, auth.isAuth, bookController.list);
router.get('/api/book/:id', bookController.getById);
router.post('/api/book', bookController.add);
router.put('/api/book/:id', bookController.update);
router.delete('/api/book/:id', bookController.delete);
router.post('/api/book/author', bookController.addBookAuthor);

router.get('/api/page', pageController.list);
router.get('/api/page/:id', pageController.getById);
router.post('/api/page', pageController.add);
router.put('/api/page/:id', pageController.update);
router.delete('/api/page/:id', pageController.delete);

router.post('/api/auth/singin', authController.singIn);
router.post('/api/auth/register', authController.register);

module.exports = router;