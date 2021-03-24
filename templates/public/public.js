

import React, { Component } from 'react'

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Menu from '../../components/menu/menu'

import PublicMenuContext from './public-menu-context'


class PublicTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            darkTheme: false,
            displayMenu: false
        }
    }
    render() {
        const menuValue = {
            display: this.state.displayMenu,
            toggleDisplay: (state=!this.state.displayMenu) => this.setState({ displayMenu: state })
        }
        return <PublicMenuContext.Provider value={menuValue}>
            <Header dark={this.props['dark']}/>
            <Menu display={this.state.displayMenu} />
            {this.props.children}
            <Footer/>
        </PublicMenuContext.Provider>
    }
}

export default PublicTemplate