const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const upsertUser = asyncHandler(async (req, res) => {
    const { uid, email, name, roles, permissions } = req.body;

    const user = await User.findOneAndUpdate(
        { uid },
        { email, name, roles, permissions },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(user);
});

const getUserProfile = asyncHandler(async (req, res) => {
    const { uid } = req.params;

    const user = await User.findOne({ uid });

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    upsertUser,
    getUserProfile,
};
