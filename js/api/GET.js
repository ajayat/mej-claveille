
import routes from '../../config/api-routes.json'

const method = 'GET'


const getArticleWithoutToken = async () => {
    let request = await fetch(routes.GET.articleWithOutToken, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    })
    return [request.status, await request.json()]
}

const getOneArticleWithoutToken = async (id, domain=undefined) => {
    let request = await fetch(`${domain}${routes.GET.articleWithOutToken}${id}`, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    })
    return [request.status, await request.json()]
}


const getCurrentUser = async (token) => {
    let request = await fetch(routes.GET.currentUser, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        mode: 'cors',
        cache: 'default'
    })
    return [request.status, await request.json()]
}

const getOneArticle = async (token, id) => {
    let request = await fetch(routes.GET.article+ '/' + id, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        mode: 'cors',
        cache: 'default'
    })
    return [request.status, await request.json()]
}


export {
    getArticleWithoutToken,
    getOneArticleWithoutToken,
    getCurrentUser,
    getOneArticle
}