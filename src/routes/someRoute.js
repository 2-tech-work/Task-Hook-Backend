
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Apply middleware to specific routes
router.use(authMiddleware);

// Or apply to individual routes
router.get('/protected-route', authMiddleware, (req, res) => {
  // Route handler code
});

module.exports = router;
