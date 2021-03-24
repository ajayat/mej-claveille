// Import dependencies
const typeorm = require('typeorm')
const bcrypt = require('bcrypt')

// Import functions
const functions = require('../../js/functions')

// Import error
const response = require('../../js/response')


module.exports = async (req, res) => {
    try {
        const userRepository = typeorm.getRepository('User')
        let user = await userRepository.findOne({
            where: { id: req.user.id }
        })
        if (user) {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            }
            await userRepository.update({ id: user.id }, {
                ...req.body
            })
            return res.status(200).json({ message: 'User updated !' })
        }
        else {
            return response.badRequest(res, 'USER_NOT_FOUND')
        }
    }
    catch (err) {
        switch (err.code) {
            case 'ER_DUP_ENTRY':
                return response.badRequest(res, 'EMAIL_ALREADY_USE')
        }
        if(functions.env_dev) console.log(err)
        return response.internalServerError(res)
    }
}