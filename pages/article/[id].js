


import React, { Component } from 'react'

import Head from 'next/head'

import Template from '../../templates/public/public'

import { getOneArticleWithoutToken } from '../../js/api/GET'

import styles from './article-by-id.module.sass'

import { format as formatDate } from '../../js/format'

export default class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        }
    }
    render() {
        if (this.state.error) {
            return <Template>
                {this.state.error}
            </Template>
        }
        else {
            return <Template>
                <Head>
                    <title>{this.state.article['title']}</title>
                </Head>
                <div className={styles.articleContainer}>
                    <div className={styles.articleHeader}>
                        <div className={styles.articleTitle}>
                            <h1>
                                <span>{this.state.article['title']}</span>
                            </h1>
                        </div>
                        <div className={styles.powerBy}>
                            <div className={styles.articleUsername}>
                                <strong>{this.state.article['user']['username']}</strong>
                            </div>
                            <div className={styles.articleDate}>
                                <i>{formatDate(this.state.article['createdAt'])}</i>
                            </div>
                        </div>
                    </div>
                    <div className={styles.articleContent}>
                        <div dangerouslySetInnerHTML={{__html: this.state.article['content']}}/>
                    </div>
                </div>
            </Template>
        }
    }
}

export async function getServerSideProps(context) {
    const [status, data] = await getOneArticleWithoutToken(context.params.id, process.env.SITE_URL)
    let props
    switch (status) {
        case 200:
            props = {
                article: data.article
            }
            break
        default:
            props = {
                error: status
            }
            break
    }
    return {
        props,
    }
}