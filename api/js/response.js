

// 500
const internalServerError = (res, error='An error has occurred on the server !') => {
    return res.status(500).json({ error })
}


// 400
const badRequest = (res, error='Bad request !') => {
    return res.status(400).json({ error })
}
const tokenExpiredInvalid = (res, error='Expired or invalid user token !') => {
    return res.status(498).json({ error })
}
const unauthorized = (res, error='Unauthorized !') => {
    return res.status(401).json({ error })
}

module.exports = {
    internalServerError,

    badRequest,
    tokenExpiredInvalid,
    unauthorized
}