// Import dependencies
const typeorm = require('typeorm')

// Import functions
const functions = require('../../js/functions')

// Import error
const response = require('../../js/response')


module.exports = async (req, res) => {
    try {
        const date = new Date()
        const articleRepository = typeorm.getRepository('Article')
        const result = await articleRepository.insert({
            title: req.body.title,
            content: req.body.content,
            user: { id: req.user.id },
            createdAt: date,
            updatedAt: date
        })
        const article = await articleRepository.createQueryBuilder('article')
            .leftJoinAndSelect('article.user', 'user')
            .select([
                'article.id',
                'article.title',
                'user.id',
                'user.username',
                'article.createdAt',
                'article.updatedAt',
                'article.content'
            ])
            .where({ id: result.raw.insertId })
            .getOne()

        if (article) {
            return res.status(201).json({
                message: 'Article added successfully !',
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