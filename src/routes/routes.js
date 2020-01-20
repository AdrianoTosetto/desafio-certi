const { Router } = require('express')
const routes = Router()

const { extenso } = require('../controllers/NumberController')

routes.get('/:number/', extenso)

module.exports = routes