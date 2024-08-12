const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    title: {
        en: String,
        vi: String
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    genre: {
        type: String,
    },
    publishedDate: {
        type: Date,
    },
    description: [
        {
            en: String,
            vi: String
        }
    ],
    paragraphs: [
        {
            en: String,
            vi: String
        }
    ],
    ages: {
        type: String
    },
    thumbnailUrl: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Story', storySchema);
