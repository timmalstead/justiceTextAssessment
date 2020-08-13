import styled from "styled-components"

const Text = styled.span`
  background-color: ${({ highlight }) => (highlight ? "#fdbcd4" : null)};
`

export default Text
