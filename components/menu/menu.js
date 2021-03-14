

import React, { useContext } from 'react'

import MenuContext from '../../templates/public/public-menu-context'

import NavBarSchema from '../../config/public-nav-bar-shema.json'
import Router from 'next/router'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { styleSingleMenu, styleNavBar } from './menu-style'
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const SingleMenu = ({name, onClick}) => {
    return <>
        <div className={'single-menu-container'}>
            <a onClick={onClick}>
                <div className="single-menu">
                    {name}
                </div>
            </a>
        </div>
        <style jsx>{styleSingleMenu}</style>
    </>
}


const Menu = ({display}) => {
    const menuContext = useContext(MenuContext)
    const handleClickMenu = async (target) => {
        await Router.push(target)
    }
    return <>
            <nav className={display ? 'show' : 'hide'}>
                <div className='nav-bar-container'>
                    <div className='nav-bar-header'>
                        <div className='nav-bar-btn-hide-frame'>
                            <button className='btn-hide-nav-bar' onClick={() => menuContext.toggleDisplay(false)}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </button>
                        </div>
                    </div>
                    <div className='nav-bar-content'>
                        {NavBarSchema.map(item => <SingleMenu key={item.name} name={item.name} onClick={async () => handleClickMenu(item.target)} />)}
                    </div>
                </div>
            </nav>
        <style jsx>{styleNavBar}</style>
    </>
}


export default  Menu