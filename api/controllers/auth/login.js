
// Import dependencies
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const typeorm = require('typeorm')

// Import error
const response = require('../../js/response')

// Import functions
const functions = require('../../js/functions')

module.exports = async (req, res) => {
    try {
        const userRepository = typeorm.getRepository('User')
        let user = await userRepository.findOne({
            where: {
                email: req.body.email
            }
        })
        if(user) {
            if (user.verified) {
                const pass = await bcrypt.compare(req.body.password, user.password)
                if (pass) {
                    await userRepository.update({ id: user.id }, {
                        lastLogin: new Date()
                    })
                    return res.status(200).json({
                        userId: user.id,
                        userRole: (JSON.parse(user.role)),
                        token: jwt.sign(
                            {userId: user.id },
                            process.env.JWT_KEY,
                            { expiresIn: process.env.JWT_TIME }
                        )
                    })
                }
                else {
                    return response.badRequest(res, 'BAD_CREDENTIALS')
                }
            }
            else {
                return response.badRequest(res, 'NOT_REGISTERED')
            }
        }
        else {
            return response.badRequest(res, 'BAD_CREDENTIALS')
        }
    }
    catch (err) {
        if (functions.env_dev) console.log(err)
        return response.internalServerError(res)
    }
}