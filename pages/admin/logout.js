

import { useEffect } from 'react'
import Router from 'next/router'

import appRoutes from '../../config/app-routes.json'

const Logout = () => {
    useEffect( () => {
        localStorage.removeItem('token')
        Router.push(appRoutes.login)
    })
    return <></>
}


export default Logout