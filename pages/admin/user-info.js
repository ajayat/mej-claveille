


import React, { Component } from 'react'
import getToken from '../../js/get-token'
import appRoutes from "../../config/app-routes.json";
import Router from 'next/router'
import { getCurrentUser } from '../../js/api/GET'
import Input from '../../components/admin/input/input'
import AdminTemplate from '../../templates/admin/admin'
import { putCurrentUser } from '../../js/api/PUT'
import Button from '../../components/admin/button/button'

export default class UserInfo  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: "",
            cPassword: "",            
            userId: undefined,
            oldInput: undefined,
            errorEmail: undefined,
            errorUsername: undefined,
            errorPassword: undefined,
            loading: false
        }
    }
    /**
     *  Check if a valid token already exist
     */
    async componentDidMount() {
        const token = await getToken()
        if(!token) {
           await Router.push(appRoutes.login)
        }
        else {
            this.token = token
            const [status, data] = await getCurrentUser(token)
            switch(status) {
                case 200:
                    this.setState({
                        email: (data.user.email),
                        username: (data.user.username),
                        userId: (data.user.id),
                        oldInput: {
                            email: (data.user.email),
                            username: (data.user.username)
                        }
                    })
                    break
                default:
                    alert(`Une erreur de type ${status} est survenue :(`)
                    break
            }
        }
    }
    async saveUser() {
        this.setState({
            errorEmail: false,
            errorUsername: false,
            errorPassword: false,
        })
        if (this.state.email !== this.state.oldInput.email || this.state.username !== this.state.oldInput.username || this.state.password.length > 0 || this.state.cPassword.length > 0) {
            let data = {}
            let send = true
            if (this.state.email !== this.state.oldInput.email) {
                data.email = this.state.email
            }
            if (this.state.username !== this.state.oldInput.username) {
                data.username = this.state.username
            }
            if(this.state.password !== this.state.cPassword && this.state.password.length > 0) {
                send = false
                this.setState({
                    errorPassword: true
                })
            }
            else if(this.state.password.length > 0){
                data.password = this.state.password
            }
            if(send) {
                const [status, result_data] = await putCurrentUser(data, this.token)
                switch (status) {
                    case 200:
                        this.setState({
                            password: "",
                            cPassword: "",
                            oldInput: {
                                email: this.state.email,
                                username: this.state.username
                            }
                        })
                        alert('Compte modifié !')
                        break
                    default:
                        alert(`Une erreur de type ${status} est survenue :(`)
                        break
                }
            }
        }
        else {
            alert('Aucun champs modifié')
        }
    }
    render() {
        return <AdminTemplate>
            <AdminTemplate.Header>
                <AdminTemplate.Title value="Mon compte"/>
            </AdminTemplate.Header>
            <AdminTemplate.Body>
                <div id="user-info-container">
                    <div className="content">
                        <AdminTemplate.SubTitle value="Information" />
                        <div className="input-frame">
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
                            <AdminTemplate.SubTitle value="Changement de mot de passe" />
                            <Input
                                type='password'
                                disable={this.state.loading ? true : null}
                                sendValue={value => this.setState({ password: value })}
                                defaultValue={this.state.password}
                                error={this.state.errorPassword}>Nouveau mot de passe</Input>
                            <Input
                                type='password'
                                disable={this.state.loading ? true : null}
                                sendValue={value => this.setState({ cPassword: value })}
                                defaultValue={this.state.cPassword}
                                error={this.state.errorPassword}>Confirmer le nouveau mot de passe</Input>
                        </div>
                    </div>
                </div>
            </AdminTemplate.Body>
            <AdminTemplate.Footer>
                <AdminTemplate.Options>
                    <div className="footer">
                        <Button variants="primary" onClick={this.saveUser.bind(this)}>Modifier</Button>
                    </div>
                </AdminTemplate.Options>
            </AdminTemplate.Footer>
        </AdminTemplate>
    }
}