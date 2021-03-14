// Import dependencies
const typeorm = require('typeorm')

// Import functions
const functions = require('../../js/functions')

// Import error
const response = require('../../js/response')


module.exports = async (req, res) => {
    try {
        const userRepository = typeorm.getRepository('User')
        const user = await userRepository.findOne({
            where: { id: req.user.id }
        })
        if (user) {
            return res.status(200).json({ user: {
                username: user.username,
                email: user.email,
                id: user.id,
                role: JSON.parse(user.role),
                lastLogin: user.lastLogin,
                createdAt: user.createdAt
            }})
        }
        else {
            return response.badRequest(res, 'User not found !')
        }
    }
    catch (err) {
        if(functions.env_dev) console.log(err)
        return response.internalServerError(res)
    }
}