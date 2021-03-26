


import React, { Component, useState, useEffect } from 'react'
import ThemeContext from '../../context/admin-theme-context'
import MenuContext from '../../context/admin-menu-context'

import {
    TemplateHeader,
    TemplateBody,
    TemplateTitle,
    TemplateOptions,
    TemplateFooter,
    TemplateSubTitle,
    TemplateBox
} from './components'

import NavBar from '../../components/admin/menu/menu'
import Header from '../../components/admin/header/header'

import styles from './admin.module.sass'

const Theme = ({ children }) => {
    const [isDark, setMode] = useState(false)
    const updateHtml = () => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }
    const changeTheme = (state) => {
        localStorage.setItem('dark_mode', JSON.stringify(state))
        setMode(state)
        updateHtml()
    }
    useEffect(() => {
        const dark = JSON.parse(localStorage.getItem('dark_mode'))
        if(dark) {
            setMode(true)
        }
        updateHtml()
    })
    return <ThemeContext.Provider value={{
            dark: isDark,
            toggleTheme: (state = !isDark) => changeTheme(!isDark)
        }}>
        {children}
    </ThemeContext.Provider>
}

class AdminTemplate extends Component {
    static Header = TemplateHeader
    static Body = TemplateBody
    static Title = TemplateTitle
    static Options = TemplateOptions
    static Footer = TemplateFooter
    static SubTitle = TemplateSubTitle
    static Box = TemplateBox
    constructor(props) {
        super(props)
        this.state = {
            displayMenu: false
        }
    }
    render() {
        return <Theme>
            <MenuContext.Provider value={{
                    display: this.state.displayMenu,
                    toggleState: () => this.setState({ displayMenu: !this.state.displayMenu })
                }}>
                <Header/>
                <div className={styles.adminContainer}>
                    <NavBar/>
                    <div className={styles.adminPageContent}>
                        <div className={styles.adminComponentBox}>
                            { this.props.children }
                        </div>
                    </div>
                </div>
                <style jsx global>{`
                    body {
                        background-color: var(--primaryBackgroundColor)
                    }
                `}</style>
            </MenuContext.Provider>
        </Theme>
    }
}

export default AdminTemplate
export { Theme }