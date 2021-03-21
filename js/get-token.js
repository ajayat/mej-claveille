
const routes = require('../config/api-routes.json')

const getToken = async () => {
    const token = localStorage.getItem('token')
    if(token) {
        let request = await fetch(routes.GET.checkToken, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            mode: 'cors',
            cache: 'default'
        })
        if(request.status === 200) {
            const data = await request.json()
            localStorage.setItem('role', JSON.stringify(data.user.role))
            return token
        }
    }
    return false
}


export default getToken