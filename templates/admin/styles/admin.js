import { createGlobalStyle} from "styled-components"

const Style = createGlobalStyle`
      #admin-root-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
      }
      body{
        background-color: ${({theme}) => theme.primaryBackgroundColor};
      }
      #admin-page-content {
        width: 100%;
        margin-top: 71px;
        min-height: calc(100vh - 71px);
      }
      #component-box {
        background-color: ${({theme}) => theme.secondaryBackgroundColor};
        margin: 15px 10px;
        border-radius: 5px;
        @media screen and (max-width: 600px){
          margin: 10px 7px;
        }
      }
    `

export default Style