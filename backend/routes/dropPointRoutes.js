const express = require('express');
const router = express.Router();
const dropPointController = require('../controllers/dropPointController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', dropPointController.getDropPoints);
router.get('/:id', dropPointController.getDropPointById);
router.post('/', authenticateToken, requireAdmin, dropPointController.createDropPoint);
router.post('/scan', dropPointController.scanQRCode);

module.exports = router;
