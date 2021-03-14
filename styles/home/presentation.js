import css from 'styled-jsx/css'


export default css `
  section .text-content {
    font-family: 'Nunito', sans-serif;
    padding: 0 20px;
    max-width: 1500px;
    margin: 50px auto 100px auto;
    font-size: 22px;
  }

  section .text-content h2 {
    font-size: 60px;
    font-weight: 700;
    margin-bottom: 50px;
  }

  section .text-content p {
    text-indent: 10px;
  }

  section .text-content ul {
    margin-left: 45px;
    list-style-image: url('/img/chevron-right-solid.svg');
    list-style-size: 20px;
  }

  section .text-content a {
    color: #003a89;
  }
`