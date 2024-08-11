const admin = require('../config/firebaseAdmin');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = await User.findOne({ uid: decodedToken.uid });

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const protectWhenRegistering = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = await User.findOne({ uid: decodedToken.uid });

            if (req.user) {
                res.status(400);
                throw new Error('User has been registed');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

const authorize = (...allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                res.status(401);
                throw new Error('Not authorized, no token');
            }

            const decodedToken = await admin.auth().verifyIdToken(token);

            req.user = await User.findOne({ uid: decodedToken.uid });

            if (!req.user || !allowedRoles.includes(req.user.role)) {
                res.status(403);
                throw new Error('Forbidden');
            }

            next();
        } catch (error) {
            res.status(403);
            throw new Error('Forbidden');
        }
    });
};

const checkPermission = (permission) => {
    return asyncHandler(async (req, res, next) => {
       try { const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token');
        }

        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = await User.findOne({ uid: decodedToken.uid });

        if (!req.user || !req.user.permissions.includes(permission)) {
            res.status(403);
            throw new Error('Forbidden');
        }
        next();
        } catch (error) {
            res.status(403);
            throw new Error('Forbidden');
        }
    });
};

module.exports = {
    protect,
    authorize,
    checkPermission,
    protectWhenRegistering
};
