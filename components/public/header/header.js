

import React from 'react'
import Link from 'next/link'


import styles from './header.module.sass'

const NavLink = ({children, href, dark}) => {
    return <div className={styles.headerLink}>
        <span className={styles.headerLinkAnimation} mode={dark ? 'dark' : 'light'}>
            <Link href={href}>
                <span>
                    {children}
                </span>
            </Link>
        </span>
    </div>
}


const Header = ({dark}) => {
    return <header className={styles.publicHeader}>
        <div className={styles.publicHeaderContainer}>
            <div className={styles.logoFrame}>
                <Link href='/'>
                    <img src='/logo/mej_200px.png' alt='Web site logo'/>
                </Link>
            </div>
            <NavLink href='/article' dark={dark}>Articles</NavLink>
        </div>
    </header>
}


export default  Header