const asyncHandler = require('express-async-handler');
const Story = require('../models/story');

const createStory = asyncHandler(async (req, res) => {
    const { title, author, paragraphs, genre, thumbnailUrl, ages } = req.body;

    if (!title) {
        res.status(400);
        throw new Error('Title and Author are required');
    }

    const story = new Story({
        title,
        author,
        genre,
        paragraphs,
        thumbnailUrl,
        ages
    });

    const createdStory = await story.save();
    res.status(201).json(createdStory);
});

const updateStory = asyncHandler(async (req, res) => {
    const story = await Story.findById(req.params.id);

    if (!story) {
        res.status(404);
        throw new Error('Story not found');
    }

    // Loop through the request body and update only the provided fields
    Object.keys(req.body).forEach(key => {
        story[key] = req.body[key];
    });

    const updatedStory = await story.save();

    res.json(updatedStory);
});

const getStories = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, genre, author, sort = 'desc' } = req.query;

    const query = {};

    // Add genre and author filters if provided in the query parameters
    if (genre) {
        query.genre = genre;
    }

    if (author) {
        query.author = author;
    }

    // Determine sort order based on the query parameter (asc or desc)
    const sortOrder = sort === 'asc' ? 1 : -1;

    // If no query parameters are provided, retrieve the newest stories by creation date
    const sortOption = Object.keys(query).length === 0 ? { createdAt: -1 } : { title: sortOrder };

    const stories = await Story.find(query)
        .select('title genre author ages thumbnailUrl description')
        .sort(sortOption)
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const totalStories = await Story.countDocuments(query);
    const totalPages = Math.ceil(totalStories / limit);

    res.json({
        stories,
        totalPages,
        currentPage: page,
    });
});

const getStory = asyncHandler(async (req, res) => {
    const story = await Story.findById(req.params.id);

    if (story) {
        res.status(200).json(story);
    } else {
        res.status(404);
        throw new Error('Story not found');
    }
});

module.exports = {
    createStory,
    getStories,
    getStory,
    updateStory
};
