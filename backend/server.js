const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv').config()
const colors = require('colors')
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000
const axios = require('axios')

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false }))

app.get('/api', (req, res) => {
    res.status(200).json({message: 'hello world'})
})

app.post('/api/getForgeToken', async (req, res) => {
    const authURL = 'https://developer.api.autodesk.com/authentication/v2/token';
    // const clientId = process.env.CLIENT_ID;
    // const clientSecret = process.env.CLIENT_SECRET;
    
    const clientId = 'jTdE1eAGz8Y6TuOjnYp26ATZ3CY3X0vmRZi9dlg3xfhIBMuM';
    const clientSecret = 'RI3BoM2yOXeWC912ZDsblGyp1c4ssqqqAwDwveONAuRrSNlqm846M7Z6sW3A43yj';

    try {
        const response = await axios.post(
            authURL,
            new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials',
                scope: 'data:read data:write bucket:read bucket:create',
            }).toString(),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );

        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error fetching Forge token:', err.response?.data || err.message);
        res.status(500).json({ error: err.message });
    }
});


app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/stories', require('./routes/storyRoutes'));
app.use('/api/peopleStories', require('./routes/peopleStoryRoutes'));
app.use('/api/fairyStories', require('./routes/fairyStoryRoutes'));

// Error-handling middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.green));


