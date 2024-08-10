const express = require('express');
const router = express.Router();
const { createStory, getStories, getStory, updateStory } = require('../controllers/storyControllers');

router.post('/', createStory);
router.get('/', getStories);
router.get('/:id', getStory);
router.post('/:id', updateStory);

module.exports = router;
