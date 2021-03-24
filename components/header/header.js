

import React from 'react'
import Link from 'next/link'

import headerStyles from './header.module.scss'
import navLinkStyle from './link.module.scss'

const NavLink = ({children, href, dark}) => {
    return <div className={navLinkStyle.link}>
        <span className={navLinkStyle.linkAnimation}>
            <Link href={href}>
                <span className={dark ? navLinkStyle.dark : navLinkStyle.light}>
                    {children}
                </span>
            </Link>
        </span>
    </div>
}


const Header = ({dark}) => {
    return <header className={headerStyles.publicHeader}>
        <div className={headerStyles.headerContainer}>
            <div className={headerStyles.logoFrame}>
                <Link href='/'>
                    <img src='/logo/mej_200px.png' alt='Web site logo'/>
                </Link>
            </div>
            <NavLink href='/article' dark={dark}>Articles</NavLink>
        </div>
    </header>
}


export default  Header