import styled from "styled-components"
import { main } from "../../colors"

const Article = styled.p`
  box-sizing: border-box;
  border: 1px solid ${main};
  width: 72%;
  margin: 5px auto 5px auto;
  overflow-wrap: break-word;
  padding: 24px 12px;
  height: 390px;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.2;
  visibility: ${({ visible }) => (visible ? "initial" : "hidden")};
`

export default Article
