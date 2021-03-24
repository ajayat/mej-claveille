
import { createGlobalStyle} from "styled-components"

const Style = createGlobalStyle`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: ${({theme}) => theme.primaryBackgroundColor};
      font-family: 'Rubik', sans-serif;
    }
    .login-frame {
      background-color: ${({theme}) => theme.secondaryBackgroundColor};
      padding: 20px;
      border-radius: 3px;
    }
  .header {
    padding: 10px 5px;
    text-align: center;
  }
  .header h1 {
    font-size: 28px;
    letter-spacing:0.9px;
    color: ${({theme}) => theme.primaryTextColor};
  }
  .content {
    padding: 10px 0;
  }
  
  .error-frame {
    text-align: center;
  }
  .error-frame p {
    color: ${({theme}) => theme.errorColor};
    font-size: 18px;
    font-weight: 500;
   }
  .footer {
    margin: 20px 0;
  }
  .footer button {
    width: 100%;
    height: 40px;
    border: solid 1px ${({theme}) => theme.primarySiteColor};
    background-color: transparent;
    border-radius: 3px;
    cursor: pointer;
    transition: background .3s ease-in-out;
  }
  .footer button span {
    color: ${({theme}) => theme.primarySiteColor};
    font-size: 25px;
    letter-spacing: 1px;
    transition: color .3s ease-in-out;
  }
  .footer button:hover {
    background-color: ${({theme}) => theme.primarySiteColor};
  }
  .footer button:hover span {
    color: #ffffff;
  }
`

export default Style