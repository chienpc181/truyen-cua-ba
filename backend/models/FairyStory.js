const mongoose = require('mongoose');

const textLang = {
    en: {
        type: String
    },
    vi: {
        type: String
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
    versionName: textLang,
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    category: {
        type: String,
    },
    introduction: [textLang],
    mainStory: [textLang],
    thumbnailUrl: {
        type: String
    },
    illustrationUrl: {
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
    },
    status: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('FairyStory', fairyStorySchema);
