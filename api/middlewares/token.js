

// Import dependencies
const jwt = require('jsonwebtoken')
const typeorm = require('typeorm')

// Import error
const response = require('../js/response')

// Verified token
module.exports = async (req, res, next) =>  {
    try {
        const token = req.headers.authorization
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        const userId = decodedToken.userId

        const userRepository = typeorm.getRepository('User')
        const user = await userRepository.findOne({ where: { id: userId }})

        if (user) {
            if (user.verified) {
                req.user = {
                    ...user,
                    role: JSON.parse(user.role)
                }
                delete req.user.password
                next()
            }
            else {
                return response.badRequest(res, 'User is not already register !')
            }
        }
        else {
            return response.tokenExpiredInvalid(res)
        }
    }
    catch(error) {
        return response.tokenExpiredInvalid(res)
    }
}