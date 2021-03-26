
import React, { Component } from 'react'
import appRoutes from '../../config/app-routes.json'
import { postRegister } from '../../js/api/POST'
import Router from 'next/router'
import Input from '../../components/admin/input/input'

import {Theme} from '../../templates/admin/admin'
import styles from './form.module.sass'
export class Register extends Component{
    constructor(props) {
        super(props)


        this.state = {
            email: '',
            username: '',
            password: '',
            cPassword: '',
            loading: false,
            errorEmail: false,
            errorUsername: false,
            errorPassword: false,
            errorCPassword: false,
            errorMessage: ''
        }
    }
    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('email')) {
            this.setState({ email: urlParams.get('email') })
        }
    }

    /**
     *  Send a post login request to the API
     */
    async submit() {
        if(this.state.email === 0 || this.state.username.length === 0 || this.state.cPassword.length === 0 || this.state.password.length === 0) {
            this.setState({
                errorEmail: true,
                errorUsername: true,
                errorPassword: true,
                errorCPassword: true,
                errorMessage: 'Tous les champs doivent être remplis !'
            })
        }
        else if(this.state.password !== this.state.cPassword) {
            this.setState({
                errorEmail: false,
                errorUsername: false,
                errorPassword: true,
                errorCPassword: true,
                errorMessage: 'Les mots de passe ne correpondent pas !'
            })
        }
        else {
            this.setState({loading: true})
            const [status, data] = await postRegister(this.state.email, this.state.username, this.state.password)
                switch(status) {
                    case 201:
                        alert(`Un email a été envoyé à ${this.state.email} afin de verifier votre inscription.`)
                        await Router.push(appRoutes.login)
                        break
                    case 400:
                        switch (data['error']) {
                            case 'ALREADY_REGISTERED':
                                alert('Vous êtes déjà inscrit !')
                                await Router.push(appRoutes.login)
                                break
                        }
                        break
                    case 401:
                        this.setState({
                            errorMessage: 'Vous n\'êtes pas autorisé à vous inscrire !',
                            errorEmail: false,
                            errorUsername: false,
                            errorPassword: false,
                            errorCPassword: false,
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
        }
    }
    render() {
        return <Theme>
            <div className={styles.loginContainer}>
                <div className={styles.loginFrame}>
                    <div className={styles.loginHeader}>
                        <h1>Inscription</h1>
                    </div>
                    <div className={styles.loginContent}>
                        <Input
                            type='text'
                            disable={this.state.loading ? true : null}
                            sendValue={value => this.setState({ email: value })}
                            defaultValue={this.state.email}
                            error={this.state.errorEmail}>Email</Input>
                        <Input
                            type='text'
                            disable={this.state.loading ? true : null}
                            sendValue={value => this.setState({ username: value })}
                            defaultValue={this.state.username}
                            error={this.state.errorUsername}>Username</Input>
                        <Input
                            type='password'
                            disable={this.state.loading ? true : null}
                            sendValue={value => this.setState({ password: value })}
                            defaultValue={this.state.password}
                            error={this.state.errorPassword}>Mot de passe</Input>
                        <Input
                            type='password'
                            disable={this.state.loading ? true : null}
                            sendValue={value => this.setState({ cPassword: value })}
                            defaultValue={this.state.cPassword}
                            error={this.state.errorCPassword}>Confirmer le mot de passe</Input>
                        <div className="error-frame">
                            <p>{this.state.errorMessage}</p>
                        </div>
                    </div>
                    <div className={styles.loginFooter}>
                        <button onClick={this.submit.bind(this)}>
                            <span>Inscription</span>
                        </button>
                    </div>
                </div>
                </div>
        </Theme>
    }
}


export default Register