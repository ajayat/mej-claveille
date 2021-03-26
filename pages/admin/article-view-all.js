
import React, { Component } from 'react'

import AdminTemplate from '../../templates/admin/admin'

import { getArticleWithToken } from '../../js/api/GET'
import { deleteArticle } from '../../js/api/DELETE'
import getToken from "../../js/get-token";
import Router  from "next/router";
import appRoutes from "../../config/app-routes.json"
import ArticlesTable from '../../components/admin/articlesTable/articlesTable'

import Button from '../../components/admin/button/button'

import Loading from '../../components/admin/loading/loading'


class ArticleView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            totalPages: undefined,
            articles: undefined,
            loading: true,
            error: undefined
        }
    }
    async getArticles () {
        const token = await getToken()
        if(!token) {
            await Router.push(appRoutes.login)
        }
        else {
            const [status, data] = await getArticleWithToken(token, this.state.currentPage)
            console.log(data)
            switch(status){
                case 200:
                    this.setState({
                        articles: data['articles'],
                        totalPages: data['totalPages'],
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
    /**
     *  Get the article from the API
     */
    async componentDidMount() {
        await this.getArticles()
    }
    async deleteArticle(id) {
        const [status, data] = await deleteArticle(this.token, id)
        switch(status) {
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
                        <Button onClick={async() => await this.getArticles()} variants="primary">
                            Refresh
                        </Button>
                        <Button onClick={async() => await Router.push(appRoutes.article_add)} variants="primary">
                            Ajouter
                        </Button>
                    </AdminTemplate.Options>
                </AdminTemplate.Header>
                <AdminTemplate.Body>
                    <ArticlesTable articles={articles} delete={this.deleteArticle.bind(this)}/>
                    {
                        !this.state.loading ?
                            <div>
                                <h3>Current page : {this.state.currentPage}</h3>
                                <h3>Total page : {this.state.totalPages}</h3>
                                <button onClick={async() => {
                                    this.setState({
                                        currentPage: 1
                                    })
                                    await this.getArticles()
                                }}>Fist page</button>
                                <button onClick={async() => {
                                    if (this.state.currentPage > 1) {
                                        this.setState({
                                            currentPage: (this.state.currentPage - 1)
                                        })
                                        await this.getArticles()
                                    }
                                }}>Previous page</button>
                                <button onClick={async() => {
                                    if (this.state.currentPage < this.state.totalPages) {
                                        this.setState({
                                            currentPage: (this.state.currentPage + 1)
                                        })
                                        await this.getArticles()
                                    }
                                }}>Next page</button>
                                <button onClick={async() => {
                                    this.setState({
                                        currentPage: this.state.totalPages
                                    })
                                    await this.getArticles()
                                }}>Last page</button>
                            </div>
                            : null
                    }

                </AdminTemplate.Body>
            </AdminTemplate>
        }
        }

}

export default ArticleView