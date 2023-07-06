const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const authenticateUser = require("../middleware/authMiddleware");

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.authUser);
router.route("/").get(authenticateUser.protect, userController.getUsers);
router
  .route("/:id")
  .get(authenticateUser.protect, userController.getUserById)
  .put(authenticateUser.protect, userController.updateUserProfile)
  .delete(authenticateUser.protect, userController.deleteUser);

module.exports = router;
