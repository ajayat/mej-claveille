
// Import dependencies
const express = require('express')

// Import controller
const addArticleCtrl = require('../controllers/articles/article-add')
const getArticleCtrl = require('../controllers/articles/article-get')
const updateArticleCtrl = require('../controllers/articles/article-update')
const deleteArticleCtrl = require('../controllers/articles/article-delete')
const getOneArticleCtrl = require('../controllers/articles/article-get-one')

// Import middlewares
const checkToken = require('../middlewares/token')
const bodyFilter = require('../middlewares/body-filter')
const checkRole = require('../middlewares/role')

// Init router
const router = express.Router()

// DEFINE ROUTES-

// GET
router.get('/without-token', getArticleCtrl)
router.get('/without-token/:articleId', getOneArticleCtrl)
router.get('/:articleId', checkToken, checkRole('READER'), getOneArticleCtrl)
router.get('/', checkToken, checkRole('READER'), getArticleCtrl)

// POST
router.post('/', checkToken, checkRole('WRITER'), bodyFilter(['title', 'content'], 'AND'), addArticleCtrl)
// DELETE
router.delete('/:articleId', checkToken, checkRole('DELETER'), deleteArticleCtrl)
// PUT
router.put('/:articleId', checkToken, checkRole('UPDATER'), bodyFilter(['title', 'content'], 'OR'), updateArticleCtrl)

// Export router
module.exports = router