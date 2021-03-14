
// Body filter
module.exports = (allowInput, comp) => {
    return  (req, res, next) => {
        let data = {}
        let dataLength = 0
        for(const property in req.body){
            if(allowInput.indexOf(property) !== -1){
                data[property] = req.body[property]
                dataLength ++
            }
        }
        if ( ( comp === 'OR' && dataLength === 0 ) || ( comp === 'AND' && dataLength !== allowInput.length ) ) {
            return res.status(400).json({ error: 'Element not found !', allowInput })
        }
        req.body = data
        next()
    }
}