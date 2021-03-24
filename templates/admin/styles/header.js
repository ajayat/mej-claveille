import { createGlobalStyle} from "styled-components"

const Style = createGlobalStyle `
        header {
          width: 100%;
          height: 70px;
          z-index: 1;
          background-color: ${({theme}) => theme.secondaryBackgroundColor};
          font-family: 'Montserrat', sans-serif;
          border-bottom: .5px solid ${({theme}) => theme.primarySiteColor};
          user-select: none;
          position: fixed;
        }
      .header-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 20px;
      }
      .btn-menu-frame button{
        width: 50px;
        cursor: pointer;
        border: none;
        background: none;
      }
      .btn-menu-frame button:first-child {
        font-size: 30px;
        color: ${({theme}) => theme.primaryTextColor};
      }
      .app-homo-logo span{
        cursor: pointer;
        margin: 0 20px;
        text-decoration: none;
        font-size: 24px;
        color: ${({theme}) => theme.primarySiteColor};
      }
    .header-container .change-theme-container {
      margin-left: auto;
    }
    .header-container .change-theme-container .theme-frame{
      position: relative;
      height: 20px;
      width: 50px;
      border: solid 2px ${({theme}) => theme.primarySiteColor};
      border-radius: 12px;
    }
    .header-container .change-theme-container .theme-frame svg{
      position: absolute;
      top: 50%;
      font-size: 22px;
      z-index: 1;
      padding: 7px;
      border: solid 2px ${({theme}) => theme.primarySiteColor};
      background-color: ${({theme}) => theme.secondaryBackgroundColor};
      border-radius: 100%;
      color: ${({theme}) => theme.primarySiteColor};
      transition: .2s transform ease-in-out;
      cursor: pointer;
    }
    .header-container .change-theme-container .theme-frame.true svg{
      transform: translate(27px, -50%);
    }
    .header-container .change-theme-container .theme-frame.false svg{
      transform: translate(-2px, -50%);
    }
`

export default Style