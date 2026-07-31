const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const upload = require('../middleware/uploadMiddleware');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

router.post('/', upload.single('photo'), collectionController.createCollection);
router.get('/', collectionController.getCollections);
router.delete('/:id', authenticateToken, requireAdmin, collectionController.deleteCollection);

module.exports = router;
