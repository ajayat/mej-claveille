/*
 *
 * -------------------------------- JSX Admin Component Header --------------------------------
 * 
 * Name export : Header
 * 
 *  @Alexis Baylet CC-BY-SA https://github.com/Alexis-ba6
 *
*/

// Node modules
import React, { useContext } from "react"
import Link from "next/link"
import { faBars, faTimes, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ThemeButtonContext from './theme-context'

// Context
import DisplayNavBar from './nav-bar-context'


import Style from './styles/header'



const Header = () => {
    const displayNavBar = useContext(DisplayNavBar)
    const themeButton = useContext(ThemeButtonContext)
    return <header id="admin">
        <div className="header-container">
            <div className="btn-menu-frame">
                <button onClick={displayNavBar.toggleState}>
                    <FontAwesomeIcon className="nav-icon" icon={displayNavBar.display ? faTimes : faBars}/>
                </button>
            </div>
            <div className="app-homo-logo">
                <Link href="/" rel="home">
                    <span>
                        ODAM
                    </span>
                </Link>
            </div>
            <div className="change-theme-container">
                <div className={`theme-frame ${themeButton.dark}`} onClick={themeButton.toggleTheme}>
                    <FontAwesomeIcon icon={themeButton.dark ? faMoon : faSun}/>
                </div>
            </div>
        </div>
        <Style />
    </header>
}

export default Header