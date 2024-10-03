const express = require('express');
const router = express.Router();
const { createPeopleStory, getPeopleStories, getPeopleStory, updatePeopleStory, getPeopleStoryByNameCode } = require('../controllers/peopleStoryControllers');
const { protect, authorize } = require('../middleware/authMiddleware');

// router.post('/', protect, authorize('admin', 'super admin'), createPeople);
router.post('/', createPeopleStory);
// router.post('/:id', protect, authorize('admin', 'super admin'), updatePeopleStory);
router.post('/:id', updatePeopleStory);
router.get('/', getPeopleStories);
// router.get('/:id', getPeopleStory);
router.get('/:nameCode', getPeopleStoryByNameCode);

module.exports = router;
