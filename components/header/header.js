

import React, { useContext } from 'react'
import Link from 'next/link'

import PublicMenuContext from '../../templates/public/public-menu-context'

import Theme from '../../templates/public/public-theme'
import Style from './header-style'
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Header = () => {
    const menuContext = useContext(PublicMenuContext)
    const style = Style(Theme)
    return <header>
        <div className="header-container">
            <div className="logo-frame">
                <Link href='/'>
                    <img src='/img/logo.png' alt='Web site logo'/>
                </Link>
            </div>
            <div className="show-menu-btn-frame">
                <button className="btn-show-menu" onClick={() => menuContext.toggleDisplay(true)}>
                    <FontAwesomeIcon icon={faBars}/>
                </button>
            </div>
        </div>
        <style jsx>{style}</style>
    </header>
}


export default  Header