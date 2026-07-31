const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', authController.registerCitizen);
router.post('/login', authController.loginUser);
router.post('/admin-login', authController.adminLogin);
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;
