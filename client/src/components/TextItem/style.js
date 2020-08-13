import styled from "styled-components"

const Text = styled.span`
  background-color: ${({ highlight }) => (highlight ? "#fdbcd4" : null)};
`

Text.displayName = "Text"

export default Text
