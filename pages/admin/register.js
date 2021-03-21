
import React, { Component, useContext } from 'react'
import getToken from '../../js/get-token'
import appRoutes from '../../config/app-routes.json'
import { postRegister } from '../../js/api/POST'
import Router from 'next/router'
import Input from '../../components/input/input'
import Style from '../../styles/admin/register'

export class Register extends Component{
    constructor(props) {
        super(props)
        const urlParams = new URLSearchParams(window.location.search)

        this.state = {
            email: urlParams.get('email') ? urlParams.get('email') : '',
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
            postRegister(this.state.email, this.state.username, this.state.password)
                .then((result) => {
                    const status = result[0]
                    switch(status) {
                        case 201:
                            alert(`Un email a été envoyé à ${this.state.email} afin de verifier votre inscription.`)
                            Router.push(appRoutes.login)
                            break
                        case 400:
                            this.setState({
                                errorMessage: 'Username déjà utilisé !',
                                errorEmail: false,
                                errorUsername: true,
                                errorPassword: false,
                                errorCPassword: false,
                                loading: false
                            })
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
                        case 450:
                            alert('Vous êtes déjà inscrit !')
                            Router.push(appRoutes.login)
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
        return <div className="container">
            <div className="login-frame">
                <div className={`frame-content ${(this.state.loading ? 'blur' : null)}`}>
                    <div className="header">
                        <h1>Inscription</h1>
                    </div>
                    <div className="content">
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
                    <div className="footer">
                        <button onClick={this.submit.bind(this)}>
                            <span>Inscription</span>
                        </button>
                    </div>
                </div>
                <div className={`loading-container ${(this.state.loading ? null : 'hide')}`}>
                </div>
            </div>
            <Style />
        </div>
    }
}


export default Register