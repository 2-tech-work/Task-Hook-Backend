import express from "express";
import {
  getTask,
  createTask,
  eachTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTask);
router.post("/", createTask);
router.get("/:id", eachTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
