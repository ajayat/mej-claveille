
// Import dependencies
const express = require('express')

// Import controller
const addArticleCtrl = require('../controllers/articles/article-add')

// Import middlewares
const checkToken = require('../middlewares/token')
const bodyFilter = require('../middlewares/body-filter')
const checkRole = require('../middlewares/role')

// Init router
const router = express.Router()

// DEFINE ROUTES

// GET
// router.get('/random', articleCtrl.getRandomArticle)
// router.get('/:id', checkToken, checkRole('READER'), articleCtrl.getOneArticle)
// router.get('/', checkToken, checkRole('READER'), articleCtrl.getAllArticle)
// POST
router.post('/', checkToken, checkRole('WRITER'), bodyFilter(['title', 'content'], 'AND'), addArticleCtrl)
// DELETE
// router.delete('/:id', checkToken, checkRole('DELETER'), articleCtrl.deleteArticle)
// PUT
// router.put('/:id', checkToken, checkRole('UPDATER'), bodyFilter(['title', 'content'], 'OR'), articleCtrl.updateArticle)

// Export router
module.exports = router