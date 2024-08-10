const express = require('express')
const router = express.Router()
const {upsertUser, getUserProfile, registerUser} = require('../controllers/userControllers')
const { protect, authorize, protectWhenRegistering } = require('../middleware/authMiddleware');

router.post('/upsert', protect, authorize('admin', 'super admin'), upsertUser);
router.post('/register', protectWhenRegistering, registerUser);
router.get('/profile/:uid', protect, getUserProfile);

module.exports = router