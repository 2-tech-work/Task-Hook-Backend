const Task = require('../models/task');

const taskController = {
    // Get all tasks for the logged-in user
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find({ userId: req.user._id });  // Use req.user._id to ensure user is authenticated
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new task
    createTask: async (req, res) => {
        try {
            const task = new Task({
                ...req.body,
                userId: req.user._id  // Ensure that the task is linked to the logged-in user
            });
            
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Get task by ID
    getTaskById: async (req, res) => {
        try {
            const task = await Task.findOne({
                _id: req.params.id,
                userId: req.user._id  // Ensure that task belongs to the logged-in user
            });

            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a task
    updateTask: async (req, res) => {
        try {
            const taskId = req.params.id;
            const updates = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            };

            const task = await Task.findByIdAndUpdate(
                taskId,
                updates,
                { new: true, runValidators: true }
            );

            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete a task
    deleteTask: async (req, res) => {
        try {
            const task = await Task.findOneAndDelete({
                _id: req.params.id,
                userId: req.user._id  // Ensure that task belongs to the logged-in user
            });

            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = taskController;
