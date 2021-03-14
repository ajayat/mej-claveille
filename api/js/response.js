

// 500
const internalServerError = (res, error='An error has occurred on the server !') => {
    return res.status(500).json({ error })
}


// 400
const badRequest = (res, error='Bad request !') => {
    return res.status(405).json({ error})
}
const tokenExpiredInvalid = (res, error='Expired or invalid user token !') => {
    return res.status(498).json({ error })
}

module.exports = {
    internalServerError,

    badRequest,
    tokenExpiredInvalid
}