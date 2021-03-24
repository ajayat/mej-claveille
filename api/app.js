
// Require dependencies
const express = require('express')
const bodyParser = require('body-parser')
const typeorm = require('typeorm')
const addDefaultFullAdmin = require('./add-default-full-admin')

// Import config
const databaseConfig = require('./config/database-connection')

// Import routes
const userRoutes = require('./router/user')
const authRoutes = require('./router/auth')
const articleRoutes = require('./router/article')

// Get NODE
const DEV_ENV = process.env.NODE_ENV !== 'production'

// Init database
typeorm.createConnection(databaseConfig)
    .then(async (con) => {
        console.log('Database initialized successfully')
        await addDefaultFullAdmin()
    })
    .catch((err) => { if(DEV_ENV) console.log(err) })

// Init api APP
const app = express()

// Set the header for the CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

// Convert in JSON the body of the request
app.use(bodyParser.json({ limit: '10mb' }));

// Add route to the API
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/article', articleRoutes)

// Export api APP
module.exports = app