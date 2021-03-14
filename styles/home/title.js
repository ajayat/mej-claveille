

import css from 'styled-jsx/css'


export default css `
  section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  section .text-content {
    text-align: left;
  }

  section h1 {
    font-family: 'Bungee Shade', cursive;
    font-weight: normal;
    width: 100%;
    font-size: 100px;
    background: linear-gradient(-45deg,
    #6831E9 25%,
    #00a6ff 25%,
    #00a6ff 50%,
    #6831E9 50%,
    #6831E9 75%,
    #00a6ff 75%,
    #00a6ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: stripes 1s linear infinite;
    background-position: 0 0;
    background-size: 20px 20px;
  }
  section .chevron {
    position: absolute;
    bottom: 20px;
    right: 50%;
    font-size: 30px;
    transform: translateX(50%);
  }
  @keyframes stripes {
    100% {
      background-position: 20px 0, 20px 0, 20px 0;
    }
  }
`