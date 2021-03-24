
// Import dependencies
const typeorm = require('typeorm')



module.exports = addDefaultFullAdmin = async () => {
    const userRepository = typeorm.getRepository('User')
    const usersEmail = JSON.parse(process.env.FULLADMIN)
    const date = new Date()

    for(const email of usersEmail) {
        const user = await userRepository.findOne({
            where: {
                email: email
            }
        })
        if(!user) {
            await userRepository.save({
                email: email,
                role: JSON.stringify([
                    'FULL_ADMIN'
                ]),
                createdAt: date,
                lastLogin: date
            })
            console.log(`> Add user ${email} with full admin`)
        }
    }
}