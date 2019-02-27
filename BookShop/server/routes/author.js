const authorController = require("../controllers").author;
let express = require("express");
let router = express.Router();
let auth = require("../middleware/auth");

router.get("/api/author", auth.verifyToken, auth.isAuth, authorController.list);
router.get("/api/author/:id", auth.verifyToken, auth.isAuth, authorController.getById);
router.post("/api/author", auth.verifyToken, auth.isAuth, authorController.add);
router.put("/api/author/:id", auth.verifyToken, auth.isAuth, authorController.update);
router.delete("/api/author/:id", auth.verifyToken, auth.isAuth, authorController.del);

module.exports = router;