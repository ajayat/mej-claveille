import { createGlobalStyle} from "styled-components"

const Style = createGlobalStyle`
       .nav-bar-container {
         position: fixed;
         background-color: ${({theme}) => theme.secondaryBackgroundColor};
         transition: transform .3s ease-in-out;
         top: 70px;
         z-index: 10;
         border-top: solid 0.5px ${({theme}) => theme.primarySiteColor};
       }
      .nav-bar-frame {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        width: 230px;
        height: 100vh;
        transition: width .1s ease-in-out;
        user-select: none;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .nav-bar-container.hide {
        transform: translateX(-230px);
      }
      .menu-container .section-title {
        font-family: 'Baloo 2', cursive;
        margin-top: 20px;
        padding: 0 15px;
        height: 30px;
      }
      .menu-container .section-title span {
        font-size: 20px;
        text-transform: uppercase;
        color: ${({theme}) => theme.primarySiteColor};
        position: relative;
      }
      .menu-container .section-title span::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2.5px;
        background-color: ${({theme}) => theme.primarySiteColor};
        bottom: 2px;
        left: 0;
      }
      .menu-container .menu-frame {
        font-family: 'Baloo Chettan 2', cursive;
      }
      .menu-container .menu-frame.selected > .menu-content{
        border-left: solid 5px ${({theme}) => theme.primarySiteColor};
        padding: 0 15px 0 10px;
        background-color: rgba(0, 0, 0, .05);
      }
      .menu-container .menu-frame .menu-content{
        margin: 5px 0px;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0 15px;
        height: 50px;
        font-size: 16px;
        transition: background .3s ease-in-out;
      }
      .menu-container .menu-frame .menu-content:hover {
        background-color: rgba(0, 0, 0, .07);
      }
      .menu-container .menu-frame .menu-content .icon-frame{
        width: 25px;
        color: ${({theme}) => theme.primaryTextColor};
      }
      .menu-container .menu-frame .menu-content .name-frame{
        color: ${({theme}) => theme.primaryTextColor};
        font-weight: 550;
      }
      .menu-container .menu-frame .menu-content .chevron-frame {
        margin-left: auto;
        transition: transform .3s ease-in-out;
        color: ${({theme}) => theme.primaryTextColor};
      }
      .menu-container .menu-frame .menu-content .chevron-frame.down {
        transform: rotate(-90deg);
      }
      .menu-container .menu-frame .sub-menu-frame.hide {
        height: 0px;
        overflow: hidden;
      }
      .menu-container .menu-frame .sub-menu-frame .menu-content{
        padding-left: 35px;
      }
    `

export default Style