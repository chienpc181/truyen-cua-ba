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
const peopleSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    nameCode: {
        type: String,
        required: [true, 'NameCode is required'],
    },
    lifeTime: {
        type: String
    },
    thumbnailUrl: {
        type: String
    },
    category: {
        type: String
    },
    title: textLangRequired,
    introduction: [textLang],
    mainStory: [textLang],
    quotes: [textLang],
    facts: [textLang],
    conclusion: [textLang],
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

module.exports = mongoose.model('People', peopleSchema);