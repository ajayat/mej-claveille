

const { createGlobalStyle } = require('styled-components')

const Style = createGlobalStyle `
  #admin-button {
    background: transparent;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
    font-family: sans-serif;
    &.m {
      font-size: 16px;
    }
    &.danger {
      color: #ff0000;
      border: solid 1px #ff0000;

      &:hover {
        background-color: #ff0000;
        color: #ffffff;
      }
    }

    &.success {
      color: #11ff00;
      border: solid 1px #11ff00;

      &:hover {
        background-color: #11ff00;
        color: #ffffff;
      }
    }

    &.primary {
      color: ${({theme}) => theme.primarySiteColor};
      border: solid 1px ${({theme}) => theme.primarySiteColor};

      &:hover {
        background-color: ${({theme}) => theme.primarySiteColor};
        color: #ffffff;
      }
    }
  }
`

export default Style
