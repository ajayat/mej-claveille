
import React, { Component } from 'react'

import AdminTemplate from '../../templates/admin/admin'

import { getArticleWithoutToken } from '../../js/api/GET'
import { deleteArticle } from '../../js/api/DELETE'
import getToken from "../../js/get-token";
import Router  from "next/router";
import appRoutes from "../../config/app-routes.json";
import ArticlesTable from '../../components/articlesTable/articlesTable'

import Button from '../../components/button/button'

import Loading from '../../components/loading/loading'


class ArticleView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: undefined,
            loading: true,
            error: undefined
        }
    }
    /**
     *  Get the article from the API
     */
    async componentDidMount() {
        const token = await getToken()
        if(!token) {
            await Router.push(appRoutes.login)
        }
        else {
            const [status, data] = await getArticleWithoutToken(token)
            switch(status){
                case 200:
                    this.setState({
                        articles: (data.articles),
                        loading: false
                    })
                    break
                default:
                    this.setState({
                        error: status,
                        loading: false
                    })
                    break
            }
            this.token = token
        }
    }
    async deleteArticle(id) {
        const status = await deleteArticle(this.token, id)
        switch(status[0]) {
            case 204:
                let newArticles = []
                for(const key in this.state.articles) {
                    if(this.state.articles[key].id !== id) {
                        newArticles.push(this.state.articles[key])
                    }
                }
                this.setState({
                    articles: newArticles
                })
                alert(`Article ${id} supprimé !`)
                break
            default :
                alert(status)
                break

        }
    }
    render() {
        let articles = this.state.articles
        if(this.state.loading) {
            return <AdminTemplate>
                <Loading />
            </AdminTemplate>
        }
        else if(articles === undefined) {
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
                    <AdminTemplate.Title value="Articles"/>
                    <AdminTemplate.Options>
                        <Button onClick={async() => await Router.push(appRoutes.article_add)} variants="primary">
                            Ajouter
                        </Button>
                    </AdminTemplate.Options>
                </AdminTemplate.Header>
                <AdminTemplate.Body>
                    <ArticlesTable articles={articles} delete={this.deleteArticle.bind(this)}/>
                </AdminTemplate.Body>
            </AdminTemplate>
        }
        }

}

export default ArticleView