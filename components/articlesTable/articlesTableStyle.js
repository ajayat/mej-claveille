
import { createGlobalStyle } from 'styled-components'

const Style = createGlobalStyle `
  #articles-table {
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;
      font-family: 'Baloo 2', cursive;
      thead tr {
        height: 30px;
        color: ${({theme}) => theme.primaryTextColor};
        font-size: 20px;
        letter-spacing: 1px;
        border-bottom: 1.5px solid ${({theme}) => theme.primarySiteColor};
        th.date {
          @media screen and (max-width: 600px){
            display: none;
          }
        }
      }
      tbody tr{
        height: 35px;
        cursor: pointer;
        &:nth-child(odd){
          background-color: rgba(0, 0, 0, 0.05);
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
        td {
          color: ${({theme}) => theme.primaryTextColor};
          font-size: 18px;
          &.date {
            @media screen and (max-width: 600px){
              display: none;
            }
          }
        }
      }
    }
  }
`

export default Style