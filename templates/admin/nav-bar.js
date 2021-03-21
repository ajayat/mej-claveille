/*
 *
 * -------------------------------- JSX Admin Template NavBar --------------------------------
 * 
 * Name export : NavBar
 * 
 *  @Alexis Baylet CC-BY-SA https://github.com/Alexis-ba6
 *
*/

// Node modules
import React, {useContext, useState } from 'react'
import { faHandshake, faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faSignOutAlt, faUserAlt, faUserCog, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

// Context
import DisplayNavBar from './nav-bar-context'
 
// Config
import navSchema from '../../config/nav-schema.json'
import routerPath from '../../config/app-routes.json'


import isAllow from '../../js/user-role'

import Style from './styles/nav-bar'


const SimpleMenu = ({icon, name, target}) =>{
    const displayNavBar = useContext(DisplayNavBar)
    return <div className="simple menu-frame">
        <Link href={target} onClick={displayNavBar.toggleState}>    
            <div className="menu-content">
                <div className="icon-frame">
                    {
                        icon !== null ? <FontAwesomeIcon icon={icon} /> : null
                    }
                </div>
                <div className="name-frame">
                    <span>
                        {name}
                    </span>
                </div>
            </div>
        </Link>
    </div>
}

const AdvancedMenu = ({icon, name, children}) =>{
    const [display, setDisplay] = useState(false)

    const handleClick = () =>{
        setDisplay(!display)
    }

    return <div className="advanced menu-frame">
        <div className="menu-content" onClick={handleClick}>
            <div className="icon-frame">
                {
                    icon !== null ? <FontAwesomeIcon icon={icon} /> : null
                }
            </div>
            <div className="name-frame">
                <span>
                    {name}
                </span>
            </div>
            <div className={"chevron-frame " + (display ? "down" : null) }>
                <FontAwesomeIcon className="nav-icon" icon={faChevronLeft} />
            </div>
        </div>
        <div className={"sub-menu-frame " + (display ? "show" : "hide")}>
            {children}
        </div>
    </div>
}

const SectionTitle = ({children}) => {
    return <div className="section-title">
        <span>
            {children}
        </span>
    </div>
}


const NavBar = () => {

    const displayNavBar = useContext(DisplayNavBar)

    const searchIcon = (name) =>{
        return name === 'sign_out' ? faSignOutAlt
                : name === 'user' ? faUserAlt
                : name === 'user_cog' ? faUserCog
                : name === 'news_paper' ? faNewspaper
                : name === 'handshake' ? faHandshake
                : name === 'plus' ? faPlus
                : null
    }

    const read = (schema) => {
        let data = []
        for(const i in schema){
            if(schema[i].min_role){
                let allow = ['true']
                for(const j in schema[i].min_role){
                    allow.push(isAllow(schema[i].min_role[j]))
                }
                if(allow.indexOf(true) === -1){
                    continue
                }        
            }
            switch(schema[i].type){
                case 'title':
                    data.push(<SectionTitle>{schema[i].name}</SectionTitle>)
                    if(schema[i].content){
                        data.push(read(schema[i].content))
                    }                
                    break
                case 'nav':
                    data.push(<AdvancedMenu icon={searchIcon(schema[i].logo)} name={schema[i].name}>
                        {read(schema[i].content)}
                    </AdvancedMenu>)
                    break
                case 'link':
                    data.push(<SimpleMenu
                        icon={searchIcon(schema[i].logo)}
                        name={schema[i].name}
                        target={routerPath[schema[i].route_name]}/>)
                    break
                default:
                    break
            }
        }
        return data
    }

    const navBarContent = read(navSchema)

    return <React.Fragment>
        <div className={"nav-bar-container " + (displayNavBar.display ? null : "hide")}>
            <div className="nav-bar-frame">
                <div className="menu-container">
                    {navBarContent}
                </div>
            </div>
        </div>
        <Style />
    </React.Fragment>
}

export default NavBar