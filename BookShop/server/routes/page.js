const pageController = require("../controllers").page;
let express = require("express");
let router = express.Router();
let auth = require("../middleware/auth");

router.get("/api/page", auth.verifyToken, auth.isAuth, pageController.list);
router.get("/api/page/:id", auth.verifyToken, auth.isAuth, pageController.getById);
router.post("/api/page", auth.verifyToken, auth.isAuth, pageController.add);
router.put("/api/page/:id", auth.verifyToken, auth.isAuth, pageController.update);
router.delete("/api/page/:id", auth.verifyToken, auth.isAuth,pageController.del);

module.exports = router;