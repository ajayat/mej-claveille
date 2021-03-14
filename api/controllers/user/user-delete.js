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
            where: { id: req.params.id }
        })
        if (user) {
            await userRepository.delete({
                id: user.id
            })
            return res.status(204).json({ message: 'User deleted !'})
        }
        else {
            return response.badRequest(res, 'User does not exist !')
        }
    }
    catch (err) {
        if(functions.env_dev) console.log(err)
        return response.internalServerError(res)
    }
}