

import React, { Component } from 'react'

import Template from '../templates/public/public'
import Head from 'next/head'
import { getArticleWithoutToken } from '../js/api/GET'
import Router from 'next/router'
import 'react-vertical-timeline-component/style.min.css'

import style from '../styles/article/article.module.scss'

const ArticleFrame = ({article}) => {

    const handleClick = async (id) => {
        await Router.push(`/article/${id}`)
    }

    return <li onClick={() => handleClick(article['id'])}>
        <div className={style.articleContainer}>
            <h3>
                <span>
                    {article['title']}
                </span>
            </h3>
            <div>
                <i>
                    Écrit par {article['user']['username']}
                </i>
            </div>
        </div>
    </li>
}


export default class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: undefined,
            error: undefined,
            currentPage: 1,
            totalPages: undefined
        }
    }
    async componentDidMount() {
        const [status, data] = await getArticleWithoutToken()
        switch (status) {
            case 200:
                this.setState({
                    articles: data['articles'],
                    totalPages: data['totalPages']
                })
                break
            default:
                this.setState({ error: status })
                break
        }
    }
    render() {
        if (this.state.articles === undefined) {
            return <Template>
                Loading please wait ....
            </Template>
        }
        else if (this.state.error) {
            return <Template>
                Error {this.state.error}
            </Template>
        }
        return <Template>
            <Head>
                <title>Claveille MEJ- Articles</title>
            </Head>
            <div className={style.titleContainer}>
                <h1>
                    Suivre l'évolution de l'atelier
                </h1>
                <i>
                    De nouveaux articles sont rajoutés au fur et à mesure, pensez à revenir !
                </i>
            </div>
            <div className={style.articleContent}>
                <ul>
                    {this.state.articles.map(article => <ul key={article['id']}><ArticleFrame article={article}/></ul>)}
                </ul>
            </div>
        </Template>
    }
}


