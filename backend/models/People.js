const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
    title: {
        en: String,
        vi: String
    },
    // author: {
    //     type: String,
    //     required: [true, 'Author is required'],
    // },
    // genre: {
    //     type: String,
    // },
    // publishedDate: {
    //     type: Date,
    // },
    // introduction: [
    //     {
    //         en: String,
    //         vi: String
    //     }
    // ],
    // paragraphs: [
    //     {
    //         en: String,
    //         vi: String
    //     }
    // ],
    // thumbnailUrl: {
    //     type: String
    // }
}, {
    timestamps: true
});

module.exports = mongoose.model('People', peopleSchema);