const asyncHandler = require('express-async-handler');
const People = require('../models/People');

const createPeople = asyncHandler(async (req, res) => {
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
        isActive,
        isPublished,
        publishedDate
    } = req.body;

    // Check if title (both English and Vietnamese) is provided
    if (!title || !title.en || !title.vi) {
        res.status(400);
        throw new Error('Both English and Vietnamese titles are required');
    }

    // Create a new People document
    const people = new People({
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
        publishedDate
    });

    // Save the new document to the database
    const createdPeople = await people.save();
    res.status(201).json(createdPeople);
});

module.exports = {
    createPeople
};
