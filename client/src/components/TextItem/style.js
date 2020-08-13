import styled from "styled-components"

//styled span component with text and background color set to change depending of highlight prop
const Text = styled.span`
  background-color: ${({ highlight }) => (highlight ? "#fdbcd4" : null)};
  color: ${({ highlight }) => (highlight ? "black" : "#777")};
`

Text.displayName = "Text"

export default Text
