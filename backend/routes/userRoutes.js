const express = require('express')
const router = express.Router()
const {upsertUser, getUserProfile} = require('../controllers/userControllers')
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/upsert', protect, authorize('admin', 'super admin'), upsertUser);
router.get('/profile/:uid', protect, getUserProfile);

module.exports = router