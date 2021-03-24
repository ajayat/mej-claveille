
import React, { Component } from 'react'
import { postUserValid } from '../../js/api/POST'
import Router from 'next/router'

import appRoutes from '../../config/app-routes.json'

class ValidUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            error: undefined
        }
    }
    async componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search)
        if(urlParams.get('email') !== undefined && urlParams.get('code') !== undefined) {
            const [status, data] = await postUserValid(urlParams.get('email'), urlParams.get('code'))
            switch(status) {
                case 200:
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('user_id', data.userId)
                    localStorage.setItem('role', JSON.stringify(data.role))
                    await Router.push(appRoutes.userInfo)
                    break
                default:
                    this.setState({
                        error: `Error ${status} : ${data.error}`,
                        loading: false
                    })
            }
        }
        else {
            this.setState({
                loading: false,
                error: "Url broken !"
            })
        }
    }
    render() {
        return <div>
            {
                this.state.loading ?
                <div>
                    <h1>Vérification....</h1>
                </div> :
                <div>
                    <h1>{this.state.error}</h1>
                </div>
            }
        </div>
    }
}


export default ValidUser