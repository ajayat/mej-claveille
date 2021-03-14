// Import dependencies
const express = require('express')

// Import controller
const loginCtrl = require('../controllers/auth/login')
const registerCtrl = require('../controllers/auth/register')
const validEmailCtrl = require('../controllers/auth/valid-email')
const validTokenCtrl = require('../controllers/auth/valid-token')

// Import middlewares
const bodyFilter = require('../middlewares/body-filter')
const checkToken = require('../middlewares/token')
const checkRole = require('../middlewares/role')

// Init router
const router = express.Router()

// DEFINE ROUTES

// POST
router.post('/login', bodyFilter(['email', 'password'], 'AND'), loginCtrl)
router.post('/register', bodyFilter(['email', 'username', 'password'], 'AND'), registerCtrl)
router.post('/valid', bodyFilter(['email', 'code'], 'AND'), validEmailCtrl)
router.post('/', checkToken, checkRole('FULL_ADMIN'), bodyFilter(['email', 'role'], 'AND'), validTokenCtrl)
//
// // Export router
module.exports = router