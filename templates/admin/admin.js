
import React, { Component } from 'react'
import Header from './header'
import NavBar from './nav-bar'

import navBarContent from './nav-bar-context'

import { ThemeProvider } from 'styled-components'
import { darkMode, lightMode } from './theme'

import ThemeButtonContext from './theme-context'

import {
    TemplateHeader,
    TemplateBody,
    TemplateTitle,
    TemplateOptions,
    TemplateFooter,
    TemplateSubTitle,
    TemplateBox
} from './components'




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
            displayNavBar: false,
            dark: undefined
        }
    }

    componentDidMount() {
        this.setState({
            dark: JSON.parse(localStorage.getItem('dark_mode'))
        })
    }
    updateTheme() {
        localStorage.setItem('dark_mode', JSON.stringify(!this.state.dark))
        this.setState({ dark: !this.state.dark })
    }
    render() {
        if (this.state.dark === undefined) {
            return <></>
        }
        const displayNavBarValue = {
            display: this.state.displayNavBar,
            toggleState: () => this.setState({ displayNavBar: (!this.state.displayNavBar) })
        }
        const themeValue = {
            dark : this.state.dark,
            theme: this.state.dark ? darkMode : lightMode,
            toggleTheme: () => this.updateTheme()
        }
        return <ThemeProvider theme={ this.state.dark ? darkMode : lightMode}>
            <ThemeButtonContext.Provider value={themeValue}>
                <navBarContent.Provider value={displayNavBarValue}>
                    <Header/>
                    <div className="admin-container">
                        <NavBar/>
                        <div className="admin-page-content">
                            <div className="component-box">
                                { this.props.children }
                            </div>
                        </div>
                    </div>
                    <style jsx>{`
                      .admin-container {
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                      }
                      .admin-page-content {
                        width: 100%;
                        margin-top: 71px;
                        min-height: calc(100vh - 71px);
                      }
                      .component-box {
                        background-color: ${this.state.dark ? darkMode.secondaryBackgroundColor : lightMode.secondaryBackgroundColor};
                        margin: 15px 10px;
                        border-radius: 5px;
                      }
                      @media screen and (max-width: 600px){
                        .component-box {
                          margin: 10px 7px;
                        }
                      }
                    `}</style>
                            <style jsx global>{`
                        body{
                          background-color: ${this.state.dark ? darkMode.primaryBackgroundColor : lightMode.primaryBackgroundColor};
                        }
                    `}</style>
                </navBarContent.Provider>
            </ThemeButtonContext.Provider>
        </ThemeProvider>
    }
}



export default AdminTemplate