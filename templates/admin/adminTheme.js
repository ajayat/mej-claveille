
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import themeContext from './theme-context'
import { darkMode, lightMode } from './theme'

import ThemeButtonContext from './theme-context'

class AdminTheme extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        const value = {
            dark : this.state.dark,
            theme: this.state.dark ? darkMode : lightMode,
            toggleTheme: () => this.updateTheme()
        }
        return <ThemeProvider theme={ this.state.dark ? darkMode : lightMode}>
            <ThemeButtonContext.Provider value={value}>
            {this.props.children}
            </ThemeButtonContext.Provider>
        </ThemeProvider>
    }
}


AdminTheme.contextType = themeContext



export default AdminTheme