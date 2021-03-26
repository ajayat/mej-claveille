
// Node modules
import React, { useContext } from "react"
import Link from "next/link"
import { faBars, faTimes, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ThemeContext from '../../../context/admin-theme-context'

// Context
import MenuContext from '../../../context/admin-menu-context'

import styles from './header.module.sass'

const Header = () => {
    const menu = useContext(MenuContext)
    const theme = useContext(ThemeContext)
    return <header className={styles.adminHeader}>
        <div className={styles.headerContainer}>
            <div className={styles.btnMenuFrame}>
                <button onClick={menu.toggleState}>
                    <FontAwesomeIcon className="nav-icon" icon={menu.display ? faTimes : faBars}/>
                </button>
            </div>
            <div className={styles.appLogoFrame}>
                <Link href="/" rel="home">
                    <span>
                        MEJ
                    </span>
                </Link>
            </div>
            <div className={styles.changeThemeContainer}>
                <div
                    dark={theme.dark ? 'dark' : 'light'}
                    className={styles.changeThemeFrame} onClick={theme.toggleTheme}>
                    <FontAwesomeIcon icon={theme.dark ? faMoon : faSun}/>
                </div>
            </div>
        </div>
    </header>
}

export default Header