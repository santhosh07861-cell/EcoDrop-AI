const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const upload = require('../middleware/uploadMiddleware');

router.post('/classify', upload.single('photo'), aiController.analyzeWasteImage);

module.exports = router;
