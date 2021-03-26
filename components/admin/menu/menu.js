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
import React, {useContext } from 'react'
import { faHandshake, faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { faSignOutAlt, faUserAlt, faUserCog, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

// Context
import MenuContext from '../../../context/admin-menu-context'

// Config
import navSchema from '../../../config/nav-schema.json'
import routerPath from '../../../config/app-routes.json'


import isAllow from '../../../js/user-role'

import styles from './menu.module.sass'

const SimpleMenu = ({icon, name, target}) =>{
    const menu = useContext(MenuContext)
    return <div className={styles.menuLink} type='simple'>
        <Link href={target} onClick={menu.toggleState}>
            <div className={styles.menuLinkContent}>
                <div className={styles.menuLinkIcon}>
                    {
                        icon !== null ? <FontAwesomeIcon icon={icon} /> : null
                    }
                </div>
                <div className={styles.menuLinkName}>
                    <span>
                        {name}
                    </span>
                </div>
            </div>
        </Link>
    </div>
}

const SectionTitle = ({children}) => {
    return <div className={styles.sectionTitle}>
        <span>
            {children}
        </span>
    </div>
}


const NavBar = () => {

    const menu = useContext(MenuContext)

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
        let key = 0
        for(const schemaItem of schema){
            if(schemaItem['min_role']){
                let allow = []
                for(const minRoleRequired of schemaItem['min_role']){
                    allow.push(isAllow(minRoleRequired))
                }
                if(allow.indexOf(true) === -1){
                    continue
                }
            }
            switch(schemaItem.type){
                case 'title':
                    data.push(<SectionTitle key={key}>{schemaItem.name}</SectionTitle>)
                    if(schemaItem.content){
                        data.push(read(schemaItem.content))
                    }
                    break
                case 'link':
                    data.push(<SimpleMenu
                        key={key}
                        icon={searchIcon(schemaItem['logo'])}
                        name={schemaItem.name}
                        target={routerPath[schemaItem['route_name']]}/>)
                    break
            }
            key+=1
        }
        return data
    }

    const navBarContent = read(navSchema)

    return <React.Fragment>
        <div className={styles.adminMenuContainer} hide={menu.display ? 'show' : 'hide'}>
            <div className={styles.menuFrame}>
                {navBarContent}
            </div>
        </div>
    </React.Fragment>
}

export default NavBar