const asyncHandler = require('express-async-handler');
const FairyStory = require('../models/FairyStory');

const createFairyStory = asyncHandler(async (req, res) => {
    const {
        nameCode,
        versionName,
        author,
        thumbnailUrl,
        illustrationUrl,
        category,
        title,           // should be an object with 'en' and 'vi'
        introduction,    // should be an array of objects
        mainStory,       // should be an array of objects
        isActive = true,
        isPublished = false,
        publishedDate,
        status = 'Inprogress'
    } = req.body;

    if (!nameCode) {
        res.status(400);
        throw new Error('Name code is required');
    }

    // Check if title (both English and Vietnamese) is provided
    if (!title || !title.en || !title.vi) {
        res.status(400);
        throw new Error('Both English and Vietnamese titles are required');
    }

    const fairyStory = new FairyStory({
        nameCode,
        versionName,
        author,
        thumbnailUrl,
        illustrationUrl,
        category,
        title,
        introduction,
        mainStory,
        isActive,
        isPublished,
        publishedDate,
        status
    });

    // Save the new document to the database
    const createdFairyStory = await fairyStory.save();
    res.status(201).json(createdFairyStory);
});

const updateFairyStory = asyncHandler(async (req, res) => {
    const story = await FairyStory.findById(req.params.id);

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

const getFairyStories = asyncHandler(async (req, res) => {
    // Extract options from req.query
    const { paginationOptions = {}, sortingOptions = {}, queryOptions = {} } = req.query;

    // Destructure with defaults
    const { page = 1, limit = 10 } = paginationOptions;
    const { sortField = 'createdAt', sort = 'asc' } = sortingOptions;

    // Create the query object dynamically from queryOptions
    const allowedFields = ['isActive', 'isPublished', 'status']; // Fields you allow for querying
    const query = Object.keys(queryOptions)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = queryOptions[key];
            return obj;
        }, {});

    // Determine sort order and field
    const sortOption = { [sortField]: sort === 'asc' ? 1 : -1 };

    // Execute the query with pagination and sorting
    const stories = await FairyStory.find(query)
        .select('nameCode title versionName introduction thumbnailUrl illustrationUrl isActive isPublished publishedDate status createdAt updatedAt')
        .sort(sortOption)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

    // Get total number of documents that match the query
    const totalStories = await FairyStory.countDocuments(query);
    const totalPages = Math.ceil(totalStories / Number(limit));

    // Send the response
    res.json({
        stories,
        totalPages,
        currentPage: Number(page),
        totalStories
    });
});


const getFairyStory = asyncHandler(async (req, res) => {
    const story = await FairyStory.findById(req.params.id);

    if (story) {
        res.status(200).json(story);
    } else {
        res.status(404);
        throw new Error('Story not found');
    }
});

const getFairyStoryByNameCode = asyncHandler(async (req, res) => {
    try {
      const story = await FairyStory.findOne({ nameCode: req.params.nameCode });
  
      if (story) {
        return res.status(200).json(story); // Return the story if found
      } else {
        res.status(404); // Set status to 404
        throw new Error('Story not found'); // Throw an error to handle in your error middleware
      }
    } catch (error) {
      res.status(500); // In case of server errors
      throw new Error('Server Error');
    }
  });

module.exports = {
    createFairyStory,
    updateFairyStory,
    getFairyStories,
    getFairyStory,
    getFairyStoryByNameCode
};
