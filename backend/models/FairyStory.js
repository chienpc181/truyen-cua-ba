const mongoose = require('mongoose');

const textLang = {
    en: {
        type: String
    },
    vi: {
        type: String
    }
}
const textLangRequired = {
    en: {
        type: String,
        required: [true, 'Title in English is required'],
    },
    vi: {
        type: String,
        required: [true, 'Title in Vietnamese is required'],
    }
}
const fairyStorySchema = mongoose.Schema({
    title: {
        en: {
            type: String,
            required: [true, 'Title in English is required'],
        },
        vi: {
            type: String,
            required: [true, 'Title in Vietnamese is required'],
        }
    },
    nameCode: {
        en: {
            type: String,
            required: [true, 'Name Code in English is required'],
        },
        vi: {
            type: String,
            required: [true, 'Name Code in Vietnamese is required'],
        }
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    category: {
        type: String,
    },
    introduction: [textLang],
    paragraphs: [textLang],
    thumbnailUrl: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    isPublished: {
        type: Boolean
    },
    publishedDate: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('FairyStory', fairyStorySchema);
