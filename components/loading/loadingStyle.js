


import { createGlobalStyle} from "styled-components"

const Style = createGlobalStyle`
  #public-loading-container{
    min-height: 80vh;
    .loading-frame{
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      backdrop-filter: blur(2px);
      z-index: 1;
      .loading {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
        div {
          display: inline-block;
          position: absolute;
          left: 16px;
          width: 32px;
          background: ${({theme}) => theme.primaryTextColor};
          animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
          &:nth-child(1) {
            left: 16px;
            animation-delay: -0.24s;
          }
          &:nth-child(2) {
            left: 64px;
            animation-delay: -0.12s;
          }
          &:nth-child(3) {
            left: 112px;
            animation-delay: 0;
          }
        }
      }
    }
  }
  @keyframes lds-facebook {
    0% {
      top: 16px;
      height: 128px;
    }
    50%, 100% {
      top: 48px;
      height: 64px;
    }
  }
`

export default Style