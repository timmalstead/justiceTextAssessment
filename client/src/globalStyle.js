import styled, { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    body {
        width: 1400px;
        height:100%;
        margin: auto;
        font-family: Arial,Helvetica,sans-serif;
    }
`
export default GlobalStyle

export const AppContainer = styled.div`
  text-align: center;
`
