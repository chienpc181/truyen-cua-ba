const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        default: ['user'], // Default role is 'user'
    },
    permissions: {
        type: [String],
        default: [], // Default is no specific permissions
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
