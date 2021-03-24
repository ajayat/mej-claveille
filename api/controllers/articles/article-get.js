// Import dependencies
const typeorm = require('typeorm')

// Import functions
const functions = require('../../js/functions')

// Import error
const response = require('../../js/response')


module.exports = async (req, res) => {
    const MAX_QUERY_LIMIT = process.env.MAX_QUERY_LIMIT ? process.env.MAX_QUERY_LIMIT : 30
    try {
        let order, direction, select

        if (req.user) {
            const allowOrder = ['title', 'id', 'createdAt', 'updatedAt']
            order = allowOrder.indexOf(req.query.order) !== -1 ? req.query.order : 'createdAt'
            direction = (req.query.direction === 'DESC' || req.query.direction === 'ASC') ? req.query.direction : 'DESC'
            select = [
                'article.id',
                'article.title',
                'user.id',
                'user.username',
                'article.createdAt',
                'article.updatedAt'
            ]
        }
        else {
            order = 'createdAt'
            direction = 'DESC'
            select = [
                'article.id',
                'article.title',
                'user.username',
                'article.createdAt'
            ]
        }

        if(req.query.content !== undefined) {
            select.push('article.content')
        }

        const articleRepository = typeorm.getRepository('Article')
        const totalItems = await articleRepository.count()

        const limit = parseInt(( 1 <= req.query.limit && req.query.limit <= MAX_QUERY_LIMIT ) ? req.query.limit : MAX_QUERY_LIMIT)
        const totalPages = Math.ceil(totalItems / limit)
        const currentPage = parseInt((req.query.page >= 1 && req.query.page <= totalPages) ? req.query.page : 1)

        const articles = await articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.user', 'user')
            .select(select)
            .orderBy({
                [`article.${order}`]: direction
            })
            .take(limit)
            .skip((currentPage - 1) * limit)
            .getMany()

        const data = {
            requestLimit: limit,
            totalItems,
            currentPage,
            totalPages,
            articles
        }
        res.status(200).json({ ...data })
    }
    catch (err) {
        if ( functions.env_dev ) console.log(err)
        return response.internalServerError(res)
    }
}