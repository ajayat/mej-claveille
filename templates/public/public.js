

import React, { Component } from 'react'

import Header from '../../components/public/header/header'
import Footer from '../../components/public/footer/footer'

import PublicMenuContext from '../../context/public-menu'


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
            {this.props.children}
            <Footer/>
        </PublicMenuContext.Provider>
    }
}

export default PublicTemplate