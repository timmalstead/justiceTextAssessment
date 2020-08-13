import styled from "styled-components"

const Text = styled.span`
  background-color: ${({ highlight }) => (highlight ? "#fdbcd4" : null)};
  color: ${({ highlight }) => (highlight ? "black" : "#777")};
`

Text.displayName = "Text"

export default Text
