// Import dependencies
const typeorm = require('typeorm')

// Import Mail
const send = require('../../mail/mail')

// Import functions
const functions = require('../../js/functions')

// Import error
const response = require('../../js/response')

module.exports = async (req, res) => {
    const role = functions.filterArray(req.body.role, ['READER', 'UPDATER', 'WRITER', 'DELETER', 'ADMIN'], true)
    try {
        const userRepository = typeorm.getRepository('User')
        const date = new Date()
        await userRepository.insert({
            email: req.body.email,
            verified: false,
            role: JSON.stringify(role),
            createdAt: date,
            lastLogin: date
        })
        await send(req.body.email, process.env.SITE_NAME, 'register', {
            register_url: `${process.env.SITE_URL}/admin/register?email=${req.body.email}`,
            site_url: process.env.SITE_URL
        })
        return res.status(201).json({ message: 'User added !' })
    }
    catch (err) {
        switch (err.code) {
            case 'ER_DUP_ENTRY':
                return response.badRequest(res, 'Email already taken !')
        }
        if (functions.env_dev) console.log(err)
        return response.internalServerError(res)
    }
}