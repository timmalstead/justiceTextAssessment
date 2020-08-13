import styled from "styled-components"

const Article = styled.p`
  width: 65%;
  margin: 0.75em auto 0 auto;
  overflow-wrap: break-word;
  height: 350px;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 15px;
  font-weight: 300;
  visibility: ${({ visible }) => (visible ? "auto" : "hidden")};
`

export default Article
