const authController = require("../controllers/apiAuthFrontControlers"),
  express = require("express"),
  router = express.Router(),
  jwt = require("../middlewares/JWTauthMiddle");

router.get("/dashboard", jwt, authController.apiLogin);

router.post("/login", authController.apiLogin);
router.post("/register", authController.apiRegister);

module.exports = router;
