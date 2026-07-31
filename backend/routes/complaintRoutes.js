const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const upload = require('../middleware/uploadMiddleware');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

router.post('/', upload.single('photo'), complaintController.createComplaint);
router.get('/', complaintController.getComplaints);
router.patch('/:id', complaintController.updateComplaintStatus);
router.delete('/:id', authenticateToken, requireAdmin, complaintController.deleteComplaint);

module.exports = router;
