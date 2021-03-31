

// Import dependencies
import React, { Component } from 'react'

import Template from '../templates/public/public'

import style from './index.module.sass'
import Head from "next/head"

// First app
export default class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Template dark={true}>
            <Head>
                <title>Claveille Math En Jean</title>
            </Head>
            <section className={style.titleSection}>
                <div className={style.areaTitleAnimation}>
                    <ul className={style.circleAnimation}>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className={style.textContent}>
                    <h1>Claveille Math <br/> En Jean</h1>
                </div>
                <div className={style.wave}>
                    <img src='/svg/wave.svg'/>
                </div>
            </section>
            <section className={style.presentationSection}>
                <div className={style.presentationTextContent}>
                    <h2>
                        <span>
                            Présentation
                        </span>
                    </h2>
                    <p>
                        L’atelier Maths en Jeans (MEJ) à Claveille se déroule le Jeudi de 12h à 13h (période normalement banalisée pour les clubs).
                        Cela consiste à travailler avec un chercheur référent, M Couallier dans notre cas, sur un sujet de recherche mathématique.
                        Cet atelier est dispensé par M Lefebvre, professeur de mathématiques.
                    </p>
                    <p>
                        Au cours de l’année, dans un groupe raisonnable de 5 à 15 personnes on travaille sur un sujet de mathématique appliquée en lien souvent avec un autre domaine comme la finance, la physique ou la biologie.<br/>
                        Vers le mois de mai, On assiste à un Congrès pendant 3-4 jours pour présenter le projet à d’autres lycées, <br/>
                        Aucunes compétences ou connaissances particulières n’est requise, hormis le programme de votre année scolaire, on attend seulement à ce que vous soyez motivés :
                        <ul>
                            <li>
                                Il y a pas mal de programmation, sous Python de préférence
                            </li>
                            <li>
                                Des maths bien sûr !
                            </li>
                            <li>
                                Une présentation et un rapport à préparer
                            </li>
                        </ul>
                    </p>
                    <p>
                        Il n’y a aucunes notes, c’est un supplément qui peut tout de même être souligné dans votre futur dossier Parcoursup.
                        Aucun devoir ne sera imposé, les élèves avancent en général de leur coté le projet. L’ambiance est super, les sujets sont intéressants, et bien sûr un professeur génial.
                    </p>
                    <p>
                        Au cours de l’année 2019-2020, le sujet portait sur les processus stochastiques (processus aléatoires) notre sujet d’étude a donc était le mouvement Brownien comme phénomène naturel, puis nous avons vu des applications à la finance et notamment sur l’évolution du cours de la bourse.
                        Malheureusement, les circonstances dues au COVID 19 ont fait que le projet n’a pas pu être achevé et nous n’avons pas pu aller au congrès prévu en mars à Bordeaux.
                        Vous pouvez consulter le compte rendu du projet de l’année précédente <a href="https://blogpeda.ac-bordeaux.fr/labomaths-claveille-perigueux/files/2019/12/M%C3%A9thode-de-Monte-Carlo-pour-la-simulation-du-mouvement-brownien_finalis%C3%A9.pdf" rel="Rapport Mouvement brownien 2019-2020" target="_blank">Rapport Mouvement brownien 2019-2020</a>.
                    </p>
                    <p>
                        Cette année le projet se concentre cette fois ci sur les équations différentielles, c’est-à-dire de équations qui impliquent tout simplement une fonction et sa dérivée.
                        On trouve une application dans le modèle de propagation d’un épidémie comme SIR (Sains - Infectés - Rétablis).
                    </p>
                    <p>
                        Source :
                        <ul>
                            <li>
                                <a href="https://www.mathenjeans.fr/accueil" ref="mathenjeans" target="_blank">Site officiel</a>
                            </li>
                            <li>
                                <a href="https://blogpeda.ac-bordeaux.fr/labomaths-claveille-perigueux/" ref="mathenjeans" target="_blank">Labo Maths Claveille</a>
                            </li>
                        </ul>
                    </p>
                </div>
            </section>
        </Template>
    }
}