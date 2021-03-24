/* Node modules importation */
import {createContext} from 'react'


export default createContext({
    dark : Boolean,
    theme: {
        primaryBackgroundColor: String,
        secondaryBackgroundColor: String,
        boxBackgroundColor: String,
        primaryTextColor: String,
        primarySiteColor: String,
        errorColor: String,
    },
    toggleTheme: state => {}
})