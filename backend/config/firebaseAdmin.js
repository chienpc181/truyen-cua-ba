const admin = require('firebase-admin');
// const serviceAccount = require('./fbServiceAccountKey.json');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
