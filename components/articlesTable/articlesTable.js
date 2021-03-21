

import React, { Component } from 'react'
import Router from "next/router";
import appRoutes from "../../config/app-routes.json"
import Style from './articlesTableStyle'
import router from 'next/router'

import Button from '../button/button'

import { format } from '../../js/format'

class ArticlesTable extends Component {
    constructor(props) {
        super(props)
    }
    async view(id) {
        await Router.push(`${appRoutes.article_view}?id=${id}`)
    }
    render() {
        const articles = this.props.articles
        return <div id="articles-table">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titre</th>
                        <th className="date">Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        articles.map(article => <tr key={article.id}>
                                <td onClick={() => this.view(article.id)}>
                                    {article.id}
                                </td>
                                <td onClick={() => this.view(article.id)}>
                                    {article.title}
                                </td>
                                <td onClick={() => this.view(article.id)} className="date">
                                    {format(article.createdAt)}
                                </td>
                                <td>
                                    <Button onClick={async() => {
                                        if(confirm(`Voulez-vous vraimer supprimer l'article ${article.id} ?`)) {
                                            await this.props.delete(article.id)
                                        }
                                    }} variants="danger">Supprimer</Button>
                                    <Button onClick={async() => {
                                        await router.push(`${appRoutes.article_update}?id=${article.id}`)
                                    }} variants="primary">
                                        Modifier
                                    </Button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
            <Style />
        </div>
    }
}

export default ArticlesTable