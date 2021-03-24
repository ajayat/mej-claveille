

import React, { useContext } from "react";
import themeContext from './theme-context'



const TemplateHeader = ({children}) => {
    const theme = useContext(themeContext)
    return <div id="t-header">
        {children}
        <style jsx>{`
            #t-header{
              background-color:${theme.theme.boxBackgroundColor};
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                padding:  20px;
                display: flex;
                align-items: center;
            }
        `}</style>
    </div>
}

const TemplateBody = ({ children }) => {
    return <div id="t-body">
        { children }
        <style jsx>{`
          #t-body {
            padding: 20px;
          }
        `}</style>
    </div>
}

const TemplateTitle = ({ value }) => {
    const theme = useContext(themeContext)
    return <div id="t-title">
        <h2>{ value }</h2>
        <style jsx>{`
          #t-title {
            font-family: 'Baloo 2', cursive;
            color: ${theme.theme.primarySiteColor};
            font-size: 20px;
          }
        `}</style>
    </div>
}

const TemplateOptions = ({ children }) => {
    return <div id="t-options">
        { children }
        <style jsx>{`
          #t-options {
            margin-left: auto;
          }
        `}</style>
    </div>
}

const TemplateBox = ({ children }) => {
    const theme = useContext(themeContext)
    return <div id="t-box">
        {children}
        <style jsx>{`
          #t-box {
            background-color:${theme.theme.boxBackgroundColor};
            border-radius: 5px;
            padding: 10px 10px;
            margin: 10px 5px;
          }
        `}</style>
    </div>
}

const TemplateFooter = ({children}) => {
    const theme = useContext(themeContext)
    return <div id="t-footer">
        {children}
        <style jsx>{`
          #t-footer {
            background-color:${theme.theme.boxBackgroundColor};
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            padding: 20px;
            display: flex;
            align-items: center;
          }
        `}</style>
    </div>
}

const TemplateSubTitle = ({ value }) => {
    const theme = useContext(themeContext)
    return <div id="t-sub-title">
        <h3>{ value }</h3>
        <style jsx>{`
          #t-sub-title {
            font-family: 'Baloo 2', cursive;
            color: ${theme.theme.primaryTextColor};
            font-size: 20px;
          }
        `}</style>
    </div>
}


export {
    TemplateHeader,
    TemplateBody,
    TemplateTitle,
    TemplateOptions,
    TemplateBox,
    TemplateFooter,
    TemplateSubTitle
}
