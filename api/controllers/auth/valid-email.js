
// Import dependencies
const jwt = require('jsonwebtoken')
const typeorm = require('typeorm')

// Import functions
const functions = require('../../js/functions')

// Import error
const response = require('../../js/response')

module.exports = async (req, res) => {
    try {
        const userRepository = typeorm.getRepository('User')
        let user = await userRepository.findOne({
            where: {
                email: req.body.email
            }
        })
        if(user) {
            if (!user.verified) {
                const tempCodeRepository = typeorm.getRepository('TempCode')
                let tempCode = await tempCodeRepository.findOne({
                    where: { user }
                })
                if(tempCode) {
                    if (tempCode.key === req.body.code) {
                        const date = new Date()
                        if(date - tempCode.createdAt < 24 * 3600 * 100) {
                            await userRepository.update({ id: user.id }, {
                                verified: true
                            })
                            await tempCodeRepository.remove({ id: tempCode.id })
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
                            return response.badRequest(res, 'Code expired !')
                        }
                    }
                    else {
                        return response.badRequest(res, 'Invalid code !')
                    }
                }
                else {
                    return response.badRequest(res, 'User is not already register !')
                }
            }
            else {
                return response.badRequest(res, 'User already verified !')
            }
        }
        else {
            return response.badRequest(res, 'User not found !')
        }
    }
    catch (err) {
        if (functions.env_dev) console.log(err)
        return response.internalServerError(res)
    }
}