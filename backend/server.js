const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv').config()
const colors = require('colors')
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false }))

app.get('/api', (req, res) => {
    res.status(200).json({message: 'hello world'})
})

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/stories', require('./routes/storyRoutes'));
app.use('/api/peopleStories', require('./routes/peopleStoryRoutes'));

// Error-handling middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.green));


