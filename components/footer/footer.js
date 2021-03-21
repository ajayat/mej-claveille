
import React from 'react'

import Link from 'next/link'

import styles from './footer.module.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram} from "@fortawesome/free-brands-svg-icons/faInstagram";
import {faFacebook} from "@fortawesome/free-brands-svg-icons/faFacebook";

const Primary = ({children}) => {
    return <li>
            <div className={styles.primary}>
            <span>
                {children}
            </span>
        </div>
    </li>
}

const Secondary = ({children, href, out}) => {
    return  <li>
        <div className={styles.secondary}>
            {
                out ?
                <a href={href} target="_blank">
                    <span>
                        {children}
                    </span>
                </a>
                :
                <a>
                    <Link href={href}>
                        <span>
                            {children}
                        </span>
                    </Link>
                </a>
            }
        </div>
    </li>
}

const Footer = () => {
    return <footer className={styles.footer}>
        <div className={styles.footerContainer}>
            <div className={styles.primaryContent}>
                <ul className={styles.primaryColumn}>
                    <Primary>Qui sommes nous</Primary>
                    <Secondary href='http://claveille.org/' out={true}>Lycée Albert Caveille</Secondary>
                </ul>
                <ul className={styles.primaryColumn}>
                    <Primary>Développeur</Primary>
                    <Secondary href='https://github.com/Alexis-ba6' out={true}>Develop by Alexis Baylet</Secondary>
                </ul>
                <ul className={styles.secondaryColumn}>
                    <li className={styles.social}>
                        <span>
                            Social
                        </span>
                    </li>
                    <li className={styles.socialMedia}>
                        <ul>
                            <li>
                                <a href='https://www.instagram.com/albert_claveille/' target='_blank' rel='Instagram Albert Claveille'>
                                <span>
                                    <div className={styles.socialMask}>
                                        <FontAwesomeIcon icon={faInstagram}/>
                                    </div>
                                </span>
                                </a>
                            </li>
                            <li>
                                <a href='https://www.facebook.com/LYCEE-Albert-Claveille-589288837911319/' target='_blank' rel='Facebook Albert Claveille'>
                                <span>
                                    <div className={styles.socialMask}>
                                        <FontAwesomeIcon icon={faFacebook}/>
                                    </div>
                                </span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className={styles.secondaryContent}>
                <ul>
                    <li className={styles.smallLink}>
                        <a>
                            <Link href='/'>
                            <span>
                                Terms of Use
                            </span>
                            </Link>
                        </a>
                    </li>
                    <li className={styles.smallLink}>
                        <a>
                            <Link href='/'>
                                <span>
                                    Privacy {'&'} Cookie Policy
                                </span>
                            </Link>
                        </a>
                    </li>
                    <li className={styles.smallLink}>
                        <a>
                            <Link href='/admin/login'>
                                <span>
                                    Admin
                                </span>
                            </Link>
                        </a>
                    </li>
                    <li className={styles.licence}>
                        <a>
                            <Link href='/'>
                                <span>
                                    © 2021 Un Jour Un Mathématicien, CC-BY-SA
                                </span>
                            </Link>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
}

export default Footer