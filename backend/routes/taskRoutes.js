const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");
const authenticateUser = require("../middleware/authMiddleware");

router
  .route("/")
  .get(
    authenticateUser.protect,
    authenticateUser.admin,
    taskController.getTasks
  )
  .post(authenticateUser.protect, taskController.createTask);

router
  .route("/mytasks")
  .get(authenticateUser.protect, taskController.getMyTasks);

router
  .route("/:id")
  .get(authenticateUser.protect, taskController.getTaskById)
  .put(authenticateUser.protect, taskController.updateTask)
  .delete(authenticateUser.protect, taskController.deleteTask);

router
  .route("/usertasks/:id")
  .get(
    authenticateUser.protect,
    authenticateUser.admin,
    taskController.getUsersTasks
  );
module.exports = router;
