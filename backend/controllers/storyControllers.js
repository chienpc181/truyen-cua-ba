const asyncHandler = require('express-async-handler');
const Story = require('../models/Story');

const createStory = asyncHandler(async (req, res) => {
    const { title, author, paragraphs, genre, thumbnailUrl, introduction } = req.body;

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
        introduction
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
    // Extract options from req.query
    const { paginationOptions = {}, sortingOptions = {}, queryOptions = {} } = req.query;

    // Destructure with defaults
    const { page = 1, limit = 10 } = paginationOptions;
    const { sort = 'asc' } = sortingOptions;

    // Create the query object dynamically from queryOptions
    const query = { ...queryOptions };

    // Determine sort order and field
    const sortOrder = sort === 'asc' ? 1 : -1;
    const sortOption = Object.keys(query).length === 0 ? { createdAt: -1 } : { title: sortOrder };

    // Execute the query with pagination and sorting
    const stories = await Story.find(query)
        .select('title genre author thumbnailUrl introduction')
        .sort(sortOption)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

    // Get total number of documents that match the query
    const totalStories = await Story.countDocuments(query);
    const totalPages = Math.ceil(totalStories / Number(limit));

    // Send the response
    res.json({
        stories,
        totalPages,
        currentPage: Number(page),
    });
});

const searchStories = asyncHandler(async (req, res) => {
    const { search, paginationOptions = {}, sortingOptions = {} } = req.query;
    const { page = 1, limit = 10 } = paginationOptions;
    const { sort = 'asc' } = sortingOptions;

    // Create the query object
    const query = {};

    if (search) {
        // Split the search sentence into individual words
        const words = search.split(' ').map(word => word.trim()).filter(Boolean);

        // Create an array of regex conditions for each word
        const searchConditions = words.map(word => ({
            $or: [
                { 'title.en': { $regex: word, $options: 'i' } },
                { 'title.vi': { $regex: word, $options: 'i' } },
                { author: { $regex: word, $options: 'i' } },
                { 'paragraphs.en': { $regex: word, $options: 'i' } },
                { 'paragraphs.vi': { $regex: word, $options: 'i' } }
            ]
        }));

        // Use $and to combine all regex conditions so that any word match will be considered
        if (searchConditions.length > 0) {
            query.$and = searchConditions;
        }
    }

    // Determine sort order and field
    const sortOrder = sort === 'asc' ? 1 : -1;
    const sortOption = Object.keys(query).length === 0 ? { createdAt: -1 } : { title: sortOrder };

    // Execute the query with pagination, sorting, and searching
    const stories = await Story.find(query)
        .select('title genre author thumbnailUrl introduction')
        .sort(sortOption)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

    // Get total number of documents that match the query
    const totalStories = await Story.countDocuments(query);
    const totalPages = Math.ceil(totalStories / Number(limit));

    // Send the response
    res.json({
        stories,
        totalPages,
        currentPage: Number(page),
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
    updateStory,
    searchStories
};
