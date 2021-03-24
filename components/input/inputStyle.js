
import { createGlobalStyle} from "styled-components"

const Style = createGlobalStyle`
      .input-frame {
        margin: 50px 0;
        position: relative;
        font-family: 'Rubik', sans-serif;
      }
      .input-frame label {
        position: absolute;
        top: -20px;
        transform: translate(25px, 25px);
        transition: .3s ease-in-out;
        color: ${({theme}) => theme.primaryTextColor};
        font-size: 16px;
        user-select: none;
        z-index: 0;
      }
      .input-frame label.top {
        transform: translate(0, 0);
        font-size: 15px;
      }

      .input-frame label.focus {
        color: ${({theme}) => theme.primarySiteColor};
      }

      .input-frame label.error {
        color: ${({theme}) => theme.errorColor};
      }
      .input-frame input {
        z-index: 1;
        height: 30px;
        width: 400px;
        padding: 0 20px;
        margin: 0 5px;
        border: none;
        font-size: 18px;
        border-bottom: 1px solid ${({theme}) => theme.primaryTextColor};
        color: ${({theme}) => theme.primaryTextColor};
        background-color: transparent;
        @media screen and (max-width: 600px){
          width: 300px;
        }
        @media screen and (max-width: 400px){
          width: 250px;
        }
      }
      .input-frame input.focus {
        border-bottom: 1px solid ${({theme}) => theme.primarySiteColor};
      }

      .input-frame input.error {
        border-bottom: 1px solid ${({theme}) => theme.errorColor};
      }
    `

export default Style