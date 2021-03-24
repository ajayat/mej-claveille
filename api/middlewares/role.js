

// Verified role
module.exports = (role) => {
    return (req, res, next) => {
        if(req.user.role.indexOf(role) !== -1
            || req.user.role.indexOf('FULL_ADMIN') !== -1
            || (req.user.role.indexOf('ADMIN') !== -1 && role !== 'FULL_ADMIN')){
            next()
        }
        else{
            return res.status(401).json({ error: "You are not allow !" })
        }
    }
}