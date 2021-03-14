
// Require dependencies
const express = require('express')
const next = require('next')
require('dotenv').config()

// Get api
const apiApp = require('./api/app')

// Get environment variables
const PORT = process.env.PORT || 8000
const DEV_ENV = process.env.NODE_ENV !== 'production'

// Init Next app
const nextApp = next({ dev: DEV_ENV })
const handle = nextApp.getRequestHandler()

// Create app
nextApp
    .prepare()
    .then(() => {
        const app = express()

        app.use(apiApp)

        app.get('*', (req, res) => {
            return handle(req, res)
        })

        app.listen(PORT, err => {
            if (err) {
                throw err
            }
            console.log(`> App launch in ${DEV_ENV ? 'development' : 'production'}`)
            console.log(`> App port : ${PORT}`)
        })
    })
