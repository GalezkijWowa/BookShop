const bookController = require("../controllers").book;
let express = require("express");
let router = express.Router();
let auth = require("../middleware/auth");

router.get("/api/book", auth.verifyToken, auth.isAuth, bookController.list);
router.get("/api/book/:id", auth.verifyToken, auth.isAuth, bookController.getById);
router.post("/api/book", auth.verifyToken, auth.isAuth, bookController.add);
router.put("/api/book/:id", auth.verifyToken, auth.isAuth, bookController.update);
router.delete("/api/book/:id", auth.verifyToken, auth.isAuth, bookController.del);
router.post("/api/book/author", auth.verifyToken, auth.isAuth, bookController.addBookAuthor);

module.exports = router;