



import React, { Component } from 'react'

import AdminTemplate from '../../templates/admin/admin'
import { postArticle } from '../../js/api/POST'

import getToken from "../../js/get-token";
import Router from "next/router";
import appRoutes from "../../config/app-routes.json";

import Button from '../../components/admin/button/button'

import ArticleEditor from '../../components/admin/articleEditor/articleEditor'

class ArticleAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            content: "",
            loading: false,
            errorTitle: false
        }

    }
    /**
     *  Check User token
     */
    async componentDidMount() {
        const token = await getToken()
        if(!token) {
            await Router.push(appRoutes.login)
        }
        else {
            this.token = token
        }
    }
    /**
     *  Valid before send article to the API
     */
    async checkArticle() {
        if(this.state.title.length > 0 && this.state.content.length > 0) {
            if(window.confirm("Voulez-vous vraiment ajouter l'article ?")) {
                const [status, data] = await postArticle(this.state.title, this.state.content, this.token)
                switch(status) {
                    case 201:
                        await Router.push(  `${appRoutes.article_view}?id=${data.article.id}`)
                        break
                    default :
                        alert(`Une erreur de type ${status} est survenue :(`)
                        break
                }
            }
        }
        else {
            alert('Vous devez remplir tous les champs !')
        }
    }
    render() {
        return <AdminTemplate>
            <AdminTemplate.Header>
                <AdminTemplate.Title value="Ajouter un article"/>
            </AdminTemplate.Header>
            <ArticleEditor
                title={this.state.title}
                content={this.state.content}
                updateTitle={value => this.setState({ title: value })}
                updateContent={value => this.setState({ content: value})}/>
            <AdminTemplate.Footer>
                <AdminTemplate.Options>
                    <Button variants="primary" onClick={this.checkArticle.bind(this)}>Ajouter</Button>
                </AdminTemplate.Options>
            </AdminTemplate.Footer>
        </AdminTemplate>
    }
}

export default ArticleAdd