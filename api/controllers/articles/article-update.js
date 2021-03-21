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

        let article = await articleRepository.findOne({ where: { id: articleId }})

        if(article) {
            if (article.user.id === req.user.id || req.user.role.indexOf('FULL_ADMIN') !== -1 || req.user.role.indexOf('ADMIN') !== -1) {
                const date = new Date()
                await articleRepository.createQueryBuilder('article')
                    .update()
                    .set({ ...req.body, updatedAt: date })
                    .where({ id: articleId })
                    .execute()
                return res.status(200).json({ message: 'Article updated successfully' })
            }
            else {
                return response.badRequest(res, 'You have not the privilege required to update this article !')
            }
        }
        else {
            return response.badRequest(res, 'Cannot find the article !')
        }
    }
    catch (err) {
        if ( functions.env_dev ) console.log(err)
        return response.internalServerError(res)
    }
}