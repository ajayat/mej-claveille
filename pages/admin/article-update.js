
import React, { Component } from 'react'
import AdminTemplate from '../../templates/admin/admin'
import getToken from "../../js/get-token";
import Router from "next/router";
import appRoutes from "../../config/app-routes.json";
import {getOneArticle} from "../../js/api/GET";
import Loading from "../../components/admin/loading/loading";

import ArticleEditor from "../../components/admin/articleEditor/articleEditor"
import { putArticle } from "../../js/api/PUT";
import Button from "../../components/admin/button/button";

export default class ArticleUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: undefined,
            error: undefined,
            loading: true
        }
    }
    /**
     *  Get the article from the API
     */
    async componentDidMount(){
        const urlParams = new URLSearchParams(window.location.search)
        const token = await getToken()
        if(!token) {
            await Router.push(appRoutes.login)
        }
        else {
            this.token = token
            const [status, data] = await getOneArticle(token, urlParams.get('id'))
            switch(status){
                case 200:
                    this.setState({
                        article: (data.article),
                        loading: false
                    })
                    break
                default:
                    this.setState({
                        loading: false,
                        error: status
                    })
                    break
            }
        }
    }
    /**
     *  Valid before send article to the API
     */
    async checkArticle() {
        if(this.state.article.title.length > 0 && this.state.article.content.length > 0) {
            if(window.confirm("Voulez-vous vraiment modifier l'article ?")) {
                const [status, data] = await putArticle(this.state.article.title, this.state.article.content, this.state.article.id, this.token)
                switch(status) {
                    case 200:
                        await Router.push(  `${appRoutes.article_view}?id=${this.state.article.id}`)
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
        const article = this.state.article
        if(this.state.loading) {
            return <AdminTemplate>
                <Loading />
            </AdminTemplate>
        }
        else if(article === undefined) {
            return <AdminTemplate>
                <AdminTemplate.Header>
                    <AdminTemplate.Title value={`Error - ${this.state.error}`}/>
                </AdminTemplate.Header>
                <AdminTemplate.Footer>
                </AdminTemplate.Footer>
            </AdminTemplate>
        }
        else {
            return <AdminTemplate>
                <AdminTemplate.Header>
                    <AdminTemplate.Title value={`Modifier l'article - ${article.id}`}/>
                </AdminTemplate.Header>
                <ArticleEditor
                    title={article.title}
                    content={article.content}
                    updateTitle={value => this.setState({ article: {...this.state.article, title: value}})}
                    updateContent={value => this.setState({ article: {...this.state.article, content: value}})}/>
                />
                <AdminTemplate.Footer>
                    <AdminTemplate.Options>
                        <Button variants="primary m" onClick={this.checkArticle.bind(this)}>Modifier</Button>
                    </AdminTemplate.Options>
                </AdminTemplate.Footer>
            </AdminTemplate>
        }
    }
}