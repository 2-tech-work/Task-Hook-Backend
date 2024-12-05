import Task from "../models/task.js";
import { v4 as uuidv4 } from "uuid";

export const getTask = async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
};

export const createTask = async (req, res) => {
  const { taskName, description, priority, startDate, endDate, status } =
    req.body;
  try {
    const taskId = `TK-${uuidv4().slice(0, 8)}`;

    const newTask = await Task.create({
      taskId,
      taskName,
      description,
      priority,
      status,
      startDate,
      endDate,
    });
    res
      .status(200)
      .json({ message: "Task Created Successfully", task: newTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eachTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ taskId: id });
    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { taskName, description, priority, startDate, endDate, status } =
    req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { taskId: id },
      {
        taskName,
        description,
        priority,
        startDate,
        endDate,
        status,
      },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task Updated Successfully", task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ taskId: id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
