const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const groupController = require('../controllers/groupController');

// Group routes with proper callback functions
router.post('/create', authMiddleware, groupController.createGroup);
router.get('/', authMiddleware, groupController.getAllGroups);
router.get('/:id', authMiddleware, groupController.getGroupById);
router.put('/:id', authMiddleware, groupController.updateGroup);
router.delete('/:id', authMiddleware, groupController.deleteGroup);

module.exports = router;
