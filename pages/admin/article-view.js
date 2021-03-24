
import React, { Component } from 'react'

import AdminTemplate from '../../templates/admin/admin'

import { getOneArticle } from '../../js/api/GET'
import getToken from "../../js/get-token";
import Router  from "next/router";
import appRoutes from "../../config/app-routes.json";

import { format } from '../../js/format'

import Style from '../../styles/admin/article-view'

import ThemeButtonContext from '../../templates/admin/theme-context'

import Loading from '../../components/loading/loading'

class ArticleView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: undefined,
            loading: true,
            error: undefined
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
    render() {
        let article = this.state.article
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
                    <AdminTemplate.Title value={`Article - ${article.id}`}/>
                </AdminTemplate.Header>
                <AdminTemplate.Body>
                    <AdminTemplate.Box>
                        <div className="container">
                            <div>
                                <span>Titre : <i>{article.title}</i></span>
                            </div>
                            <div>
                                <span>Créé le : <i>{format(article.createdAt)}</i> </span>
                            </div>
                        </div>
                    </AdminTemplate.Box>
                    <div className="content" dangerouslySetInnerHTML={{__html: article.content}} />
                    <style jsx>{`
                        .container {
                              font-family: 'Baloo 2', cursive;
                              font-size: 18px;
                              color: ${this.context.theme.primaryTextColor}
                            }
                        .content {
                          color: ${this.context.theme.primaryTextColor}
                        }
                  `}</style>
                </AdminTemplate.Body>
                <Style/>
            </AdminTemplate>
        }
    }
}

ArticleView.contextType  = ThemeButtonContext

export default ArticleView