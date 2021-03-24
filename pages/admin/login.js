
import React, { Component, useContext } from 'react'
import getToken from '../../js/get-token'
import appRoutes from '../../config/app-routes.json'
import { login } from '../../js/api/POST'
import Router from 'next/router'
import Input from '../../components/input/input'
import Style from '../../styles/admin/login'

import AdminTheme from '../../templates/admin/adminTheme'

export class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            loading: false,
            errorLogin: false,
            errorPassword: false,
            errorMessage: ''
        }
    }
    /**
     *  Check if a valid token already exist
     */
    async componentDidMount() {
        const login = localStorage.getItem('user_login')
        if(login) {
            this.setState({ login })
        }
        const token = await getToken()
        if(token) {
            await Router.push(appRoutes.userInfo)
        }
    }
    /**
     *  Send a post login request to the API
     */
    async submit() {
        if(this.state.login.length === 0 || this.state.password.length === 0) {
            this.setState({
                errorLogin: true,
                errorPassword: true,
                errorMessage: 'Tous les champs doivent être remplis !'
            })
        }
        else {
            this.setState({loading: true})
            login(this.state.login, this.state.password)
                .then((result) => {
                    const status = result[0]
                    const data = result[1]
                    switch(status) {
                        case 200:
                            localStorage.setItem('token', data.token)
                            localStorage.setItem('id', data.userId)
                            localStorage.setItem('user_login', this.state.login)
                            localStorage.setItem('role', JSON.stringify(data.userRole))
                            Router.push(appRoutes.article_view_all)
                            break
                        case 401:
                            this.setState({
                                errorMessage: 'Email ou mot de passe invalides !',
                                errorLogin: true,
                                errorPassword: true,
                                loading: false
                            })
                            break
                        default:
                            this.setState({
                                errorMessage: 'Une erreur inattendue est survenue sur le serveur !',
                                loading: false
                            })
                            break
                    }
                })
        }
    }
    render() {
        return <AdminTheme>
            <div className="container">
                <div className="login-frame">
                    <div className={`frame-content ${(this.state.loading ? 'blur' : null)}`}>
                        <div className="header">
                            <h1>Connexion</h1>
                        </div>
                        <div className="content">
                            <Input
                                type='text'
                                disable={this.state.loading ? true : null}
                                sendValue={value => this.setState({ login: value })}
                                defaultValue={this.state.login}
                                error={this.state.errorLogin}>Email</Input>
                            <Input
                                type='password'
                                disable={this.state.loading ? true : null}
                                sendValue={value => this.setState({ password: value })}
                                defaultValue={this.state.password}
                                error={this.state.errorPassword}>Mot de passe</Input>
                            <div className="error-frame">
                                <p>{this.state.errorMessage}</p>
                            </div>
                        </div>
                        <div className="footer">
                            <button onClick={this.submit.bind(this)}>
                                <span>Connexion</span>
                            </button>
                        </div>
                    </div>
                    <div className={`loading-container ${(this.state.loading ? null : 'hide')}`}>
                    </div>
                </div>
                <Style />
            </div>
        </AdminTheme>
    }
}


export default Login