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
        return res.status(201).json({
            message: 'Article added successfully !',
            article: {
                id: result.identifiers[0].id
            }
        })
    }
    catch (err) {
        if ( functions.env_dev ) console.log(err)
        return response.internalServerError(res)
    }
}