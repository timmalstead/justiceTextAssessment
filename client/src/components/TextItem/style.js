import styled from "styled-components"
import { contrast } from "../../colors"

const Text = styled.span`
  display: ${({ visible }) => (visible ? "initial" : "none")};
  background-color: ${({ highlight }) => (highlight ? contrast : null)};
`

export default Text
