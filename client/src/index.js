import React from "react"
import ReactDOM from "react-dom"
import GlobalStyle from "./globalStyle"
import App from "./App"

// ReactDOM implementation of React on "#root" node of DOM. I chose to include the Styled Components <GlobalStyle /> component here as it targets CSS selectors "above" the React app and this level makes the most sense to me semantically

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* GlobalStyle Styled Component to enforce CSS rules app wide */}
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById("root")
)
