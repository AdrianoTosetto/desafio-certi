/**
 * server only used for testing endpoints
 * it is placed here because each test file will listen to one port, which can't be shared
 * among mulitple files
 */

const express = require('express')

const routes = require('../routes/routes')

const appTest = express()

appTest.use(express.json())
appTest.use(routes)

module.exports = appTest