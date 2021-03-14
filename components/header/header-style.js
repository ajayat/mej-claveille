// styles/global.js
import css from 'styled-jsx/css'

const style = (theme) => {
    return css`
      header {
        top: 0;
        right: 0;
        width: 100%;
        position: absolute;
      }

      .header-container {
        height: 80px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;
        user-select: none;
      }

      .logo-frame {
        margin-right: auto;
        padding: 0 10px;
      }

      .logo-frame img {
        height: 50px;
        cursor: pointer;
      }

      .show-menu-btn-frame {
        padding: 0 10px;
      }

      .show-menu-btn-frame button {
        background: none;
        outline: none;
        border: none;
        cursor: pointer;
        font-size: 40px;
        color: #000000;
      }
    `
}


export default style