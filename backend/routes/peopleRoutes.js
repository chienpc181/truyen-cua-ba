const express = require('express');
const router = express.Router();
const { createPeople } = require('../controllers/peopleControllers');
const { protect, authorize } = require('../middleware/authMiddleware');

// router.post('/', protect, authorize('admin', 'super admin'), createPeople);
router.post('/', createPeople);

module.exports = router;
