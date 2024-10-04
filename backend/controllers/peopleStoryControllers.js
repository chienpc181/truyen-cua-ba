const asyncHandler = require('express-async-handler');
const PeopleStory = require('../models/PeopleStory');

const createPeopleStory = asyncHandler(async (req, res) => {
    const {
        name,
        nameCode,
        lifeTime,
        thumbnailUrl,
        category,
        title,           // should be an object with 'en' and 'vi'
        introduction,    // should be an array of objects
        mainStory,       // should be an array of objects
        quotes,          // should be an array of objects
        facts,           // should be an array of objects
        conclusion,      // should be an array of objects
        isActive = true,
        isPublished = false,
        publishedDate,
        status = 'Inprogress'
    } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('Name is required');
    }

    if (!nameCode) {
        res.status(400);
        throw new Error('Name is required');
    }

    // Check if title (both English and Vietnamese) is provided
    if (!title || !title.en || !title.vi) {
        res.status(400);
        throw new Error('Both English and Vietnamese titles are required');
    }

    // Create a new PeopleStory document
    const people = new PeopleStory({
        name,
        nameCode,
        lifeTime,
        thumbnailUrl,
        category,
        title,
        introduction,
        mainStory,
        quotes,
        facts,
        conclusion,
        isActive,
        isPublished,
        publishedDate,
        status
    });

    // Save the new document to the database
    const createdPeople = await people.save();
    res.status(201).json(createdPeople);
});

const updatePeopleStory = asyncHandler(async (req, res) => {
    const story = await PeopleStory.findById(req.params.id);

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

const getPeopleStories = asyncHandler(async (req, res) => {
    // Extract options from req.query
    const { paginationOptions = {}, sortingOptions = {}, queryOptions = {} } = req.query;

    // Destructure with defaults
    const { page = 1, limit = 10 } = paginationOptions;
    const { sortField = 'createdAt', sort = 'asc' } = sortingOptions;

    // Create the query object dynamically from queryOptions
    const allowedFields = ['name', 'isActive', 'isPublished', 'status']; // Fields you allow for querying
    const query = Object.keys(queryOptions)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = queryOptions[key];
            return obj;
        }, {});

    // Determine sort order and field
    const sortOption = { [sortField]: sort === 'asc' ? 1 : -1 };

    // Execute the query with pagination and sorting
    const stories = await PeopleStory.find(query)
        .select('name nameCode title introduction isActive isPublished publishedDate status')
        .sort(sortOption)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

    // Get total number of documents that match the query
    const totalStories = await PeopleStory.countDocuments(query);
    const totalPages = Math.ceil(totalStories / Number(limit));

    // Send the response
    res.json({
        stories,
        totalPages,
        currentPage: Number(page),
        totalStories
    });
});


const getPeopleStory = asyncHandler(async (req, res) => {
    const story = await PeopleStory.findById(req.params.id);

    if (story) {
        res.status(200).json(story);
    } else {
        res.status(404);
        throw new Error('Story not found');
    }
});

const getPeopleStoryByNameCode = asyncHandler(async (req, res) => {
    try {
      const story = await PeopleStory.findOne({ nameCode: req.params.nameCode });
  
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
    createPeopleStory,
    getPeopleStories,
    getPeopleStory,
    updatePeopleStory,
    getPeopleStoryByNameCode
};
