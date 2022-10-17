const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/me", authController.protect, userController.getUser);

router
  .route("/me/bookmarks")
  .get(authController.protect, userController.getAllBookmarks)
  .delete(authController.protect, userController.deleteBookmark)
  .post(authController.protect, userController.addBookmark);

module.exports = router;
