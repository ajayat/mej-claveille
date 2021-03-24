
// Import dependencies
const bcrypt = require('bcrypt')
const typeorm = require('typeorm')

// Import Mail
const send = require('../../mail/mail')

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
                const hash = await bcrypt.hash(req.body.password, 10)
                await userRepository.update({ id: user.id }, {
                    username: req.body.username,
                    password: hash
                })
                const tempCodeRepository = typeorm.getRepository('TempCode')

                let tempCode = await tempCodeRepository.findOne({
                    where: { user }
                })

                const key = functions.randomText(50)
                const date = new Date()

                if(tempCode) {
                    await tempCodeRepository.update({ id: tempCode.id }, {
                        key,
                        createdAt: date
                    })
                }
                else {
                    await tempCodeRepository.insert({
                        key,
                        user,
                        createdAt: date
                    })
                }
                await send(user.email, 'Vérification d\'email', 'email_validation', {
                    valid_url: `${process.env.SITE_URL}/admin/validate?email=${user.email}&code=${key}`,
                    site_url: process.env.SITE_URL
                })
                return res.status(200).json({ message: 'MAIL_SEND', to: user.email })
            }
            else {
                return response.badRequest(res, 'ALREADY_REGISTERED')
            }
        }
        else {
            return response.unauthorized(res, 'NOT_ALLOW')
        }
    }
    catch (err) {
        if (functions.env_dev) console.log(err)
        return response.internalServerError(res)
    }
}