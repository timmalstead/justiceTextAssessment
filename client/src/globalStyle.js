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
        font-family: "Lato", Arial, Helvetica, sans-serif;
        background-color: #EEEEEE66;
    }
`
export default GlobalStyle

export const AppContainer = styled.div`
  text-align: center;
`

AppContainer.displayName = "AppContainer"

export const Loader = styled.div`
  height: 1000px;
  visibility: hidden;
`
Loader.displayName = "Loader"
