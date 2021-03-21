// Import dependencies
const typeorm = require('typeorm')

// Import functions
const functions = require('../../js/functions')

// Import error
const response = require('../../js/response')

module.exports = async (req, res) => {
    try {
        const articleRepository = typeorm.getRepository('Article')
        const articleId = req.params['articleId']

        const article = await articleRepository.findOne({ where: { id: articleId } })

        if (article) {
            if (article.user.id === req.user.id || req.user.role.indexOf('FULL_ADMIN') !== -1 || req.user.role.indexOf('ADMIN') !== -1) {
                await articleRepository.createQueryBuilder('article')
                    .delete()
                    .where({ id: articleId })
                    .execute()
                return res.status(200).json({ message: 'Article deleted successfully !' })
            }
            else {
                return response.badRequest(res, 'Your are not allow !')
            }
        }
        else {
            return response.badRequest(res, 'Article not found !')
        }

    }
    catch (err) {
        if ( functions.env_dev ) console.log(err)
        return response.internalServerError(res)
    }
}