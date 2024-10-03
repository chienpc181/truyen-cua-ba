const express = require('express');
const router = express.Router();
const { createPeopleStory, getPeopleStories, getPeopleStory } = require('../controllers/peopleStoryControllers');
const { protect, authorize } = require('../middleware/authMiddleware');

// router.post('/', protect, authorize('admin', 'super admin'), createPeople);
router.post('/', createPeopleStory);
router.get('/', getPeopleStories);
router.get('/:id', getPeopleStory);

module.exports = router;
