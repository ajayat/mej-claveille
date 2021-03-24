

const randomText = (size) => {
    let text = ""
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i <= size; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

const filterArray = (toValidate, allowInput, up) => {
    let data = []
    for(let element of toValidate){
        if(up) {
            element = element.toUpperCase()
        }
        if(allowInput.indexOf(element) !== -1){
            data.push(element)
        }
    }
    return data
}

const env_dev = process.env.NODE_ENV !== 'production'

module.exports = {
    randomText,
    filterArray,
    env_dev
}