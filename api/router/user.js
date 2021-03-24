
// Import dependencies
const express = require('express')

// Import controller
const addUserCtrl = require('../controllers/user/user-add')
const getUserCtrl = require('../controllers/user/user-get')
const updateUserCtrl = require('../controllers/user/user-update')
const deleteUserCtrl = require('../controllers/user/user-delete')

// Import middlewares
const checkToken = require('../middlewares/token')
const bodyFilter = require('../middlewares/body-filter')
const checkRole = require('../middlewares/role')

// Init router
const router = express.Router()

// DEFINE ROUTES

// POST
router.post('/', checkToken, checkRole('FULL_ADMIN'), bodyFilter(['email', 'role'], 'AND'), addUserCtrl)
// GET
router.get('/', checkToken, getUserCtrl)
// PUT
router.put('/', checkToken, bodyFilter(['username', 'email', 'password'], 'OR'), updateUserCtrl)
// DELETE
router.delete('/:id', checkToken, checkRole('FULL_ADMIN'), deleteUserCtrl)

// Export router
module.exports = router