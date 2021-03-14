
import css from 'styled-jsx/css'



const styleNavBar = css `
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    skewX(-50deg);
    user-select: none;
  }

  .nav-bar-container {
    background-color: #0e0e0e;
    height: 100%;
  }

  .nav-bar-header {
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    user-select: none;
  }

  .nav-bar-btn-hide-frame {
    padding: 0 10px;
  }

  .nav-bar-btn-hide-frame button {
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 40px;
    color: #ffffff;
  }

  .nav-bar-content {
    height: calc(100% - 100px);
    overflow-y: scroll;
    margin: 0 auto;
    padding: 0 60px;
  }


  nav.show {
    animation: show .4s;
    transform: translateX(0%);
  }

  nav.hide {
    animation: hide .3s;
    transform: translateX(-100%);
  }

  @keyframes show {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0%);
    }
  }
  @keyframes hide {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`

const styleSingleMenu = css `
  .single-menu-container {
    font-family: 'Nunito', sans-serif;
    border-bottom: 1.5px #ffffff solid;
    width: 100%;
    padding: 20px 10px;
    margin: 5px 0;
    font-size: 30px;
    color: #ffffff;
    transition: .3s ease-in-out;
    cursor: pointer;
  }

  .single-menu-container:hover {
    background-color: #ffffff;
    color: #000000;
    transform: translateX(10px);
    font-weight: 800;
  }
`

export { styleNavBar, styleSingleMenu }