const Group = require('../models/Group');

const groupController = {
    createGroup: async (req, res) => {
        try {
            const newGroup = await Group.create({
                ...req.body,
                createdBy: req.user.id
            });
            res.status(201).json(newGroup);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAllGroups: async (req, res) => {
        try {
            const groups = await Group.find({ createdBy: req.user.id });
            res.json(groups);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getGroupById: async (req, res) => {
        try {
            const group = await Group.findById(req.params.id);
            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }
            res.json(group);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateGroup: async (req, res) => {
        try {
            const updatedGroup = await Group.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.json(updatedGroup);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteGroup: async (req, res) => {
        try {
            await Group.findByIdAndDelete(req.params.id);
            res.json({ message: 'Group deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = groupController;
