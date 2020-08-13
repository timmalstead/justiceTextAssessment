import styled, { createGlobalStyle } from "styled-components"

// GlobalStyle Styled Component to enforce CSS rules app wide
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

// When viewport intersects with below component, a new call to the backend is made. This allows the user uninterrupted scrolling, without the need to call all the data in the api upon first loading the app.

export const Loader = styled.div`
  height: 1000px;
  visibility: hidden;
`
Loader.displayName = "Loader"
