const taskController = require("../controllers/taskController");

const router = require("express").Router();

router.post("/addTask", taskController.addTask);

router.get("/allTasks", taskController.getTasks);

router.get("/:id", taskController.getTask);

router.delete("/:id", taskController.deleteTask);

router.put("/switchReminder/:id", taskController.switchReminder);

module.exports = router;
