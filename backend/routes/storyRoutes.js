const express = require('express');
const router = express.Router();
const { createStory, getStories, getStory, updateStory, searchStories } = require('../controllers/storyControllers');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin', 'super admin'), createStory);
router.get('/', getStories);
router.get('/search', searchStories);
router.get('/:id', getStory);
router.post('/:id', protect, authorize('admin', 'super admin'), updateStory);

module.exports = router;
