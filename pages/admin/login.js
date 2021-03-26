
// Import dependencies
import React, { Component } from 'react'
import getToken from '../../js/get-token'
import appRoutes from '../../config/app-routes.json'
import { login } from '../../js/api/POST'
import Router from 'next/router'
import Input from '../../components/admin/input/input'
import { Theme } from '../../templates/admin/admin'
import styles from './form.module.sass'

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
            const [status, data] = await login(this.state.login, this.state.password)
            switch(status) {
                case 200:
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('id', data.userId)
                    localStorage.setItem('user_login', this.state.login)
                    localStorage.setItem('role', JSON.stringify(data.userRole))
                    await Router.push(appRoutes.article_view_all)
                    break
                case 400:
                    switch (data['error']) {
                        case 'BAD_CREDENTIALS':
                            this.setState({
                                errorMessage: 'Email ou mot de passe invalides !',
                                errorLogin: true,
                                errorPassword: true,
                                loading: false
                            })
                            break
                        case 'NOT_REGISTERED':
                            alert('Vous n\'êtes pas inscrit !')
                            await Router.push(appRoutes.register)
                            break
                    }
                    break
                default:
                    this.setState({
                        errorMessage: 'Une erreur inattendue est survenue sur le serveur !',
                        loading: false
                    })
                    break
            }
        }
    }
    render() {
        return <Theme>
            <div className={styles.loginContainer}>
                <div className={styles.loginFrame}>
                    <div className={styles.loginHeader}>
                        <h1>Connexion</h1>
                    </div>
                    <div className={styles.loginContent}>
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
                        <div className={styles.errorFrame}>
                            <p>{this.state.errorMessage}</p>
                        </div>
                    </div>
                    <div className={styles.loginFooter}>
                        <button onClick={this.submit.bind(this)}>
                            <span>Connexion</span>
                        </button>
                    </div>
                </div>
            </div>
        </Theme>
    }
}


export default Login