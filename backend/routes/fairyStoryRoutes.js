const express = require('express');
const router = express.Router();
const { createFairyStory, updateFairyStory, getFairyStories, getFairyStory, getFairyStoryById } = require('../controllers/fairyStoryControllers');
const { protect, authorize } = require('../middleware/authMiddleware');

// router.post('/', protect, authorize('admin', 'super admin'), createPeople);
router.post('/', createFairyStory);
// router.post('/:id', protect, authorize('admin', 'super admin'), updatePeopleStory);
router.post('/:id', updateFairyStory);
router.get('/', getFairyStories);
router.get('/:id', getFairyStory);
router.get('/storyId/:storyId', getFairyStoryById);

module.exports = router;
