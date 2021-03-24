// Import dependencies
const typeorm = require('typeorm')

// Import functions
const functions = require('../../js/functions')

// Import error
const response = require('../../js/response')


module.exports = async (req, res) => {
    try {
        let select

        if (req.user) {
            select = [
                'article.id',
                'article.title',
                'user.id',
                'user.username',
                'article.createdAt',
                'article.updatedAt',
                'article.content'
            ]
        }
        else {
            select = [
                'article.id',
                'article.title',
                'user.username',
                'article.createdAt',
                'article.content'
            ]
        }
        const articleRepository = typeorm.getRepository('Article')

        const article = await articleRepository.createQueryBuilder('article')
            .leftJoinAndSelect('article.user', 'user')
            .select(select)
            .where({ id: req.params['articleId'] })
            .getOne()

        if (article) {
            return res.status(200).json({
                article
            })
        }
        else {
            return response.badRequest(res, 'ARTICLE_NOT_FOUND')
        }
    }
    catch (err) {
        if ( functions.env_dev ) console.log(err)
        return response.internalServerError(res)
    }
}