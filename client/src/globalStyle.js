import styled, { createGlobalStyle } from "styled-components"

// GlobalStyle Styled Component to enforce CSS rules app wid
// I chose to make this a fixed width app to keep it very clean and basic, with the focus on the content and a UI that would get out of the user's way and allow them to do the editing they need to do.
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

// When viewport intersects with below component, a new call to the backend is made. Because we have made this 1000px high, this will occur well before the user reaches the end of the page. This allows the user uninterrupted scrolling, without the need to call all the data in the api upon first loading the app.

export const Loader = styled.div`
  height: 1000px;
  visibility: hidden;
`
Loader.displayName = "Loader"
